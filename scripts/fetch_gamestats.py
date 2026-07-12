#!/usr/bin/env python3
"""Fetch Steam and Last.fm stats into src/data/gamestats.json.

Secrets (STEAM_API_KEY, LASTFM_API_KEY) and account config (STEAM_ACCOUNTS,
EXCLUDED_APPIDS, LASTFM_USER) both come from the environment. A source
missing either its secret or its config is skipped and its previous data
kept, so the scheduled run is a harmless no-op until the repo secrets and
variables exist. An API failure with both present raises — a red run is
the signal.

The output carries no timestamp on purpose: identical stats produce an
identical file, and the workflow's commit-if-changed step stays quiet.
"""

from __future__ import annotations

import json
import os
import pathlib
import urllib.parse
import urllib.request

OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "data" / "gamestats.json"


def _split_env(name: str) -> list[str]:
    return [x.strip() for x in os.environ.get(name, "").split(",") if x.strip()]


def _split_ints(name: str) -> frozenset[int]:
    out = set()
    for x in _split_env(name):
        try:
            out.add(int(x))
        except ValueError:
            raise SystemExit(f"{name} must be comma-separated integers; got {x!r}")
    return frozenset(out)


# Multiple accounts merge into one library: same appid sums its playtime.
# Entries are either a vanity name or a raw SteamID64 (all digits).
STEAM_ACCOUNTS = _split_env("STEAM_ACCOUNTS")
# Comma-separated appids to hide from every Steam list; the next games fill in.
EXCLUDED_APPIDS = _split_ints("EXCLUDED_APPIDS")
LASTFM_USER = os.environ.get("LASTFM_USER", "").strip()
TIMEOUT = 30


def http_json(
    url: str, data: dict | None = None, headers: dict | None = None
) -> dict:
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(
        url, data=body, headers={"Accept": "application/json", **(headers or {})}
    )
    if body is not None:
        req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        return json.load(resp)


def merge_owned(libraries: list[list[dict]]) -> list[dict]:
    """Merge owned-games lists from several accounts, summing playtime by
    appid. The first-seen name wins (it's the same game everywhere)."""
    merged: dict[int, dict] = {}
    for games in libraries:
        for g in games:
            m = merged.setdefault(
                g["appid"],
                {"appid": g["appid"], "name": g["name"], "playtime_forever": 0, "playtime_2weeks": 0},
            )
            m["playtime_forever"] += g.get("playtime_forever", 0)
            m["playtime_2weeks"] += g.get("playtime_2weeks", 0)
    return list(merged.values())


def shape_steam(
    games: list[dict], cap: int = 6, exclude: frozenset[int] = frozenset()
) -> dict:
    """Two views of one library, API minutes become display hours:

    - recent: played in the last two weeks, by 2-week hours
    - top:    lifetime hours ranking

    Owner-excluded appids vanish from both views. Zero-playtime entries are
    dropped — Steam's "keep my total playtime private" setting zeroes every
    entry, and an all-zero list must hide the section rather than render a
    wall of "0 小時". appid breaks ties so the output is deterministic
    across fetches (no churn commits).
    """
    games = [g for g in games if g["appid"] not in exclude]

    def row(g: dict) -> dict:
        return {
            "name": g["name"],
            "appid": g["appid"],
            "hours2w": round(g.get("playtime_2weeks", 0) / 60, 1),
            "hoursTotal": round(g.get("playtime_forever", 0) / 60),
        }

    # Filter on the ROUNDED hours: 1-3 raw minutes would render "兩週 0 小時".
    recent = sorted(
        (g for g in games if round(g.get("playtime_2weeks", 0) / 60, 1) > 0),
        key=lambda g: (-g["playtime_2weeks"], g["appid"]),
    )
    top = sorted(
        (g for g in games if g.get("playtime_forever", 0) > 0),
        key=lambda g: (-g["playtime_forever"], g["appid"]),
    )
    return {"recent": [row(g) for g in recent[:cap]], "top": [row(g) for g in top[:cap]]}


def add_headers(shaped: dict, headers: dict[int, str | None]) -> dict:
    """Attach each game's store header-art URL where one was found."""
    for view in shaped.values():
        for row in view:
            url = headers.get(row["appid"])
            if url:
                row["header"] = url
    return shaped


def previous_headers() -> dict[int, str]:
    """Header URLs already stored in the committed json, by appid."""
    if not OUT.exists():
        return {}
    steam = json.loads(OUT.read_text(encoding="utf-8")).get("steam") or {}
    return {
        row["appid"]: row["header"]
        for view in steam.values()
        for row in view or []
        if "header" in row
    }


def fetch_header_urls(appids: list[int]) -> dict[int, str | None]:
    """Header art comes from the store's appdetails API — newer titles live
    under hashed asset paths no template can guess. The ?t= cache token is
    stripped so the stored URL only changes when the art itself does. Art is
    decoration: a per-app failure falls back to the previously stored URL
    (else a text-only row) instead of killing the stats run — and keeping
    the old URL also avoids a spurious commit from a transient flake.
    """
    fallback = previous_headers()
    urls: dict[int, str | None] = {}
    for appid in appids:
        try:
            r = http_json(
                f"https://store.steampowered.com/api/appdetails?appids={appid}&filters=basic"
            )
            entry = r[str(appid)]
            urls[appid] = (
                entry["data"]["header_image"].split("?")[0] if entry["success"] else None
            )
        except Exception as exc:  # noqa: BLE001 - degrade, don't die
            print(f"appdetails failed for {appid}: {exc}")
            urls[appid] = None
        if not urls[appid]:
            urls[appid] = fallback.get(appid)
    return urls


def fetch_steam(key: str) -> dict:
    libraries = []
    for account in STEAM_ACCOUNTS:
        if account.isdigit():
            steamid = account
        else:
            q = urllib.parse.urlencode({"key": key, "vanityurl": account})
            r = http_json(
                f"https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?{q}"
            )
            if r["response"].get("success") != 1:
                raise SystemExit(f"vanity URL {account!r} did not resolve: {r}")
            steamid = r["response"]["steamid"]
        q = urllib.parse.urlencode(
            {
                "key": key,
                "steamid": steamid,
                "include_appinfo": 1,
                "include_played_free_games": 1,
            }
        )
        r = http_json(
            f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?{q}"
        )
        libraries.append(r["response"].get("games", []))
    shaped = shape_steam(merge_owned(libraries), exclude=EXCLUDED_APPIDS)
    appids = sorted({g["appid"] for view in shaped.values() for g in view})
    return add_headers(shaped, fetch_header_urls(appids))


def lastfm_image(images: list[dict]) -> str:
    """Pick the largest cover; Last.fm's 'no image' star maps to '' so the
    page shows a placeholder instead of the generic asterisk."""
    by_size = {i.get("size"): i.get("#text", "") for i in images}
    url = by_size.get("extralarge") or by_size.get("large") or by_size.get("medium") or ""
    # The star placeholder Last.fm serves when a scrobble has no album art.
    return "" if not url or "2a96cdd0d8b85" in url else url


def shape_music(recent: dict, top: dict, cap: int = 6) -> dict:
    """Recent scrobbles (newest first, now-playing flagged) and the last
    month's top artists. YT Music scrobbles often lack album art — those
    rows carry image '' and render a placeholder."""
    tracks = recent["recenttracks"]["track"]
    tracks = tracks if isinstance(tracks, list) else [tracks]
    rows: list[dict] = []
    for t in tracks:
        row = {
            "track": t["name"],
            "artist": t["artist"]["#text"],
            "image": lastfm_image(t.get("image", [])),
            "url": t["url"],
            "nowPlaying": t.get("@attr", {}).get("nowplaying") == "true",
        }
        # The now-playing track is also the most recent scrobble, so Last.fm
        # returns it twice in a row — collapse consecutive duplicates.
        if rows and (rows[-1]["track"], rows[-1]["artist"]) == (row["track"], row["artist"]):
            continue
        rows.append(row)
    return {
        "recent": rows[:cap],
        "topArtists": [
            {"name": a["name"], "playCount": int(a["playcount"]), "url": a["url"]}
            for a in top["topartists"]["artist"][:cap]
        ],
    }


def fetch_music(api_key: str) -> dict:
    base = "https://ws.audioscrobbler.com/2.0/"
    common = {"user": LASTFM_USER, "api_key": api_key, "format": "json"}
    recent = http_json(
        f"{base}?{urllib.parse.urlencode({**common, 'method': 'user.getrecenttracks', 'limit': 6})}"
    )
    top = http_json(
        f"{base}?{urllib.parse.urlencode({**common, 'method': 'user.gettopartists', 'period': '1month', 'limit': 6})}"
    )
    return shape_music(recent, top)


def main() -> None:
    data = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}

    steam_key = os.environ.get("STEAM_API_KEY")
    if steam_key and STEAM_ACCOUNTS:
        data["steam"] = fetch_steam(steam_key)
    else:
        print("STEAM_API_KEY/STEAM_ACCOUNTS not set - keeping previous Steam data")

    lastfm_key = os.environ.get("LASTFM_API_KEY")
    if lastfm_key and LASTFM_USER:
        data["music"] = fetch_music(lastfm_key)
    else:
        print("LASTFM_API_KEY/LASTFM_USER not set - keeping previous music data")

    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
