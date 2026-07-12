"""Self-check for fetch_gamestats shaping and secret gating.

Run: python scripts/test_fetch_gamestats.py

The gating matters most: with no secrets set, the previous file must
survive byte-identical, so the workflow's commit-if-changed step sees no
diff and never publishes an accidental wipe.
"""

import json
import os
import pathlib
import subprocess
import sys
import sys
import tempfile

sys.path.insert(0, str(pathlib.Path(__file__).parent))

import fetch_gamestats  # noqa: E402


def osu_stats_fixture() -> dict:
    return {
        "pp": 4523.77,
        "global_rank": None,
        "country_rank": 321,
        "hit_accuracy": 98.7654,
        "play_time": 913_140,  # seconds -> 254h
    }


def main() -> None:
    # Two accounts merge into one library: the shared game sums both
    # playtimes, single-account games pass through.
    merged = fetch_gamestats.merge_owned(
        [
            [
                {"name": "Apex Legends", "appid": 2, "playtime_forever": 100, "playtime_2weeks": 30},
                {"name": "Solo A", "appid": 5, "playtime_forever": 50},
            ],
            [{"name": "Apex Legends", "appid": 2, "playtime_forever": 40}],
        ]
    )
    assert sorted(merged, key=lambda g: g["appid"]) == [
        {"name": "Apex Legends", "appid": 2, "playtime_forever": 140, "playtime_2weeks": 30},
        {"name": "Solo A", "appid": 5, "playtime_forever": 50, "playtime_2weeks": 0},
    ], merged

    # Two views: recent = by 2-week hours (only games actually played),
    # top = by lifetime hours; minutes -> hours; zero-playtime entries
    # dropped (the "playtime private" setting zeroes every entry — an
    # all-zero library must hide the section); appid breaks ties.
    steam = fetch_gamestats.shape_steam(
        [
            {"name": "Untouched", "appid": 3, "playtime_forever": 0},
            {"name": "Old One", "appid": 1, "playtime_forever": 90},
            # 2 raw minutes rounds to 0.0h -> excluded from recent (would
            # render "兩週 0 小時"), still counts for the lifetime view.
            {"name": "Blip", "appid": 7, "playtime_2weeks": 2, "playtime_forever": 6000},
            {
                "name": "Apex Legends",
                "appid": 1172470,
                "playtime_2weeks": 754,
                "playtime_forever": 60000,
            },
        ]
    )
    assert steam == {
        "recent": [
            {"name": "Apex Legends", "appid": 1172470, "hours2w": 12.6, "hoursTotal": 1000},
        ],
        "top": [
            {"name": "Apex Legends", "appid": 1172470, "hours2w": 12.6, "hoursTotal": 1000},
            {"name": "Blip", "appid": 7, "hours2w": 0, "hoursTotal": 100},
            {"name": "Old One", "appid": 1, "hours2w": 0, "hoursTotal": 2},
        ],
    }, steam
    nine = [{"name": f"G{i}", "appid": i, "playtime_forever": 60 * (i + 1)} for i in range(9)]
    capped = fetch_gamestats.shape_steam(nine)
    assert len(capped["top"]) == 6 and capped["top"][0]["name"] == "G8", capped
    tied = fetch_gamestats.shape_steam(
        [
            {"name": "B", "appid": 9, "playtime_forever": 60},
            {"name": "A", "appid": 4, "playtime_forever": 60},
        ]
    )
    assert [g["appid"] for g in tied["top"]] == [4, 9], tied

    # Owner exclusions vanish from BOTH views (the next games fill in).
    excluded = fetch_gamestats.shape_steam(
        [
            {"name": "Onigiri", "appid": 290470, "playtime_2weeks": 48, "playtime_forever": 240000},
            {"name": "Kept", "appid": 8, "playtime_2weeks": 30, "playtime_forever": 120},
        ],
        exclude=frozenset({290470}),
    )
    assert [g["appid"] for g in excluded["top"]] == [8], excluded
    assert [g["appid"] for g in excluded["recent"]] == [8], excluded

    # Header art attaches where a URL was found; misses leave the row
    # text-only (no "header": null noise in the json).
    arted = fetch_gamestats.add_headers(
        {
            "recent": [{"appid": 1, "name": "A"}],
            "top": [{"appid": 1, "name": "A"}, {"appid": 2, "name": "B"}],
        },
        {1: "https://example.invalid/h.jpg", 2: None},
    )
    assert arted["recent"][0]["header"] == "https://example.invalid/h.jpg", arted
    assert arted["top"][0]["header"] == "https://example.invalid/h.jpg", arted
    assert "header" not in arted["top"][1], arted

    # osu! ranks may be null (inactive account) and must pass through as
    # null rather than raising — the page drops null tiles. rank_history
    # can itself be null and play_time arrives in seconds; the page needs
    # a list / whole hours either way.
    osu = fetch_gamestats.shape_osu(
        {
            "statistics": osu_stats_fixture(),
            "rank_history": {"mode": "mania", "data": [452246, 452470, 436703]},
        }
    )
    assert osu == {
        "mode": fetch_gamestats.OSU_MODE,
        "pp": 4524,
        "globalRank": None,
        "countryRank": 321,
        "accuracy": 98.77,
        "playTimeHours": 254,
        "rankHistory": [452246, 452470, 436703],
    }, osu
    no_history = fetch_gamestats.shape_osu(
        {"statistics": osu_stats_fixture(), "rank_history": None}
    )
    assert no_history["rankHistory"] == [], no_history
    assert no_history["playTimeHours"] == 254, no_history

    # Last.fm: newest first, now-playing flagged, and the star "no image"
    # placeholder maps to '' so the page shows its own placeholder.
    star = "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cdd0d8b85fake.png"
    music = fetch_gamestats.shape_music(
        {
            "recenttracks": {
                "track": [
                    {
                        "name": "Now Song",
                        "artist": {"#text": "Artist A"},
                        "image": [{"size": "large", "#text": star}],
                        "url": "https://last.fm/now",
                        "@attr": {"nowplaying": "true"},
                    },
                    {
                        "name": "Past Song",
                        "artist": {"#text": "Artist B"},
                        "image": [
                            {"size": "large", "#text": "https://cdn/large.png"},
                            {"size": "extralarge", "#text": "https://cdn/xl.png"},
                        ],
                        "url": "https://last.fm/past",
                    },
                ]
            }
        },
        {"topartists": {"artist": [{"name": "Artist A", "playcount": "42", "url": "https://last.fm/a"}]}},
    )
    assert music["recent"][0] == {
        "track": "Now Song",
        "artist": "Artist A",
        "image": "",  # star placeholder dropped
        "url": "https://last.fm/now",
        "nowPlaying": True,
    }, music
    assert music["recent"][1]["image"] == "https://cdn/xl.png", music
    assert music["recent"][1]["nowPlaying"] is False, music
    assert music["topArtists"] == [{"name": "Artist A", "playCount": 42, "url": "https://last.fm/a"}], music

    # The now-playing track repeats as the newest scrobble — collapse it.
    dupe = fetch_gamestats.shape_music(
        {
            "recenttracks": {
                "track": [
                    {"name": "Song", "artist": {"#text": "A"}, "image": [], "url": "u", "@attr": {"nowplaying": "true"}},
                    {"name": "Song", "artist": {"#text": "A"}, "image": [], "url": "u"},
                    {"name": "Older", "artist": {"#text": "B"}, "image": [], "url": "u2"},
                ]
            }
        },
        {"topartists": {"artist": []}},
    )
    assert [r["track"] for r in dupe["recent"]] == ["Song", "Older"], dupe
    assert dupe["recent"][0]["nowPlaying"] is True, dupe

    # A single now-playing track arrives as a dict, not a list.
    solo = fetch_gamestats.shape_music(
        {
            "recenttracks": {
                "track": {
                    "name": "Solo",
                    "artist": {"#text": "X"},
                    "image": [],
                    "url": "u",
                    "@attr": {"nowplaying": "true"},
                }
            }
        },
        {"topartists": {"artist": []}},
    )
    assert len(solo["recent"]) == 1 and solo["recent"][0]["nowPlaying"] is True, solo

    # _split_env: comma-separated env var -> stripped list; unset -> [].
    os.environ["FETCH_GAMESTATS_TEST_VAR"] = "a, b"
    try:
        assert fetch_gamestats._split_env("FETCH_GAMESTATS_TEST_VAR") == ["a", "b"]
    finally:
        os.environ.pop("FETCH_GAMESTATS_TEST_VAR", None)
    assert fetch_gamestats._split_env("FETCH_GAMESTATS_TEST_UNSET") == []

    # _split_ints: comma-separated env var -> frozenset of ints; a bad
    # entry raises SystemExit naming the offending value, instead of
    # crashing at import with a bare ValueError.
    os.environ["EXCLUDED_APPIDS"] = "290470, 431960"
    try:
        assert fetch_gamestats._split_ints("EXCLUDED_APPIDS") == frozenset(
            {290470, 431960}
        )
    finally:
        os.environ.pop("EXCLUDED_APPIDS", None)

    os.environ["EXCLUDED_APPIDS"] = "290470, not-a-number"
    try:
        try:
            fetch_gamestats._split_ints("EXCLUDED_APPIDS")
            raise AssertionError("expected SystemExit for a bad int")
        except SystemExit as exc:
            assert "not-a-number" in str(exc), exc
    finally:
        os.environ.pop("EXCLUDED_APPIDS", None)

    # No env at all -> main() is a pure no-op; the existing file survives
    # byte-identical (the workflow's commit-if-changed step must stay quiet).
    # STEAM_ACCOUNTS/EXCLUDED_APPIDS/OSU_USER_ID/LASTFM_USER are frozen into
    # module globals at import time, so popping their env vars here can't
    # gate main() — set the globals directly instead. Secrets ARE read
    # fresh on every call, so those stay plain env pops.
    for var in ("STEAM_API_KEY", "OSU_CLIENT_ID", "OSU_CLIENT_SECRET", "LASTFM_API_KEY"):
        os.environ.pop(var, None)
    previous = {"osu": osu}
    saved_config = (
        fetch_gamestats.STEAM_ACCOUNTS,
        fetch_gamestats.EXCLUDED_APPIDS,
        fetch_gamestats.OSU_USER_ID,
        fetch_gamestats.LASTFM_USER,
    )
    fetch_gamestats.STEAM_ACCOUNTS = []
    fetch_gamestats.EXCLUDED_APPIDS = frozenset()
    fetch_gamestats.OSU_USER_ID = ""
    fetch_gamestats.LASTFM_USER = ""
    try:
        with tempfile.TemporaryDirectory() as tmp:
            out = pathlib.Path(tmp) / "gamestats.json"
            out.write_text(json.dumps(previous, ensure_ascii=False, indent=2) + "\n")
            fetch_gamestats.OUT = out
            fetch_gamestats.main()
            assert json.loads(out.read_text()) == previous, out.read_text()
    finally:
        (
            fetch_gamestats.STEAM_ACCOUNTS,
            fetch_gamestats.EXCLUDED_APPIDS,
            fetch_gamestats.OSU_USER_ID,
            fetch_gamestats.LASTFM_USER,
        ) = saved_config

    # Secrets present but their account config still absent -> still a
    # no-op: config gates each source exactly as much as its secret does.
    # Same reasoning as above: force the config globals empty directly so
    # this holds regardless of the ambient environment, and this fake "x"
    # secret can never reach a real API call.
    for var, val in (
        ("STEAM_API_KEY", "x"),
        ("OSU_CLIENT_ID", "x"),
        ("OSU_CLIENT_SECRET", "x"),
        ("LASTFM_API_KEY", "x"),
    ):
        os.environ[var] = val
    saved_config = (
        fetch_gamestats.STEAM_ACCOUNTS,
        fetch_gamestats.OSU_USER_ID,
        fetch_gamestats.LASTFM_USER,
    )
    fetch_gamestats.STEAM_ACCOUNTS = []
    fetch_gamestats.OSU_USER_ID = ""
    fetch_gamestats.LASTFM_USER = ""
    try:
        with tempfile.TemporaryDirectory() as tmp:
            out = pathlib.Path(tmp) / "gamestats.json"
            out.write_text(json.dumps(previous, ensure_ascii=False, indent=2) + "\n")
            fetch_gamestats.OUT = out
            fetch_gamestats.main()
            assert json.loads(out.read_text()) == previous, out.read_text()
    finally:
        for var in ("STEAM_API_KEY", "OSU_CLIENT_ID", "OSU_CLIENT_SECRET", "LASTFM_API_KEY"):
            os.environ.pop(var, None)
        (
            fetch_gamestats.STEAM_ACCOUNTS,
            fetch_gamestats.OSU_USER_ID,
            fetch_gamestats.LASTFM_USER,
        ) = saved_config

    # The committed file must be byte-identical to the script's canonical
    # formatting — otherwise every no-op run would produce a diff and the
    # workflow would commit + deploy every six hours for nothing.
    committed = pathlib.Path(__file__).resolve().parent.parent / "src" / "data" / "gamestats.json"
    raw = committed.read_text()
    canonical = json.dumps(json.loads(raw), ensure_ascii=False, indent=2) + "\n"
    assert raw == canonical, f"{committed} is not in the script's canonical format"

    # shape_osu stamps the configured ruleset into the JSON (the Osu block's
    # heading reads it), and a bogus OSU_MODE must die loudly at import.
    saved_mode = fetch_gamestats.OSU_MODE
    try:
        fetch_gamestats.OSU_MODE = "mania"
        shaped = fetch_gamestats.shape_osu(
            {"statistics": {"pp": 1.0, "hit_accuracy": 99.0, "play_time": 3600}}
        )
        assert shaped["mode"] == "mania", shaped
    finally:
        fetch_gamestats.OSU_MODE = saved_mode
    bad_env = dict(os.environ, OSU_MODE="bogus")
    proc = subprocess.run(
        [sys.executable, "-c", "import fetch_gamestats"],
        cwd=pathlib.Path(__file__).resolve().parent,
        env=bad_env,
        capture_output=True,
        text=True,
    )
    assert proc.returncode != 0 and "OSU_MODE" in proc.stderr, proc.stderr

    print("all checks passed")


if __name__ == "__main__":
    main()
