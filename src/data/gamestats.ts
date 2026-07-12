import raw from "./gamestats.json";

export type SteamGame = {
  name: string;
  appid: number;
  /** Hours over the last two weeks (one decimal). */
  hours2w: number;
  /** Lifetime hours (whole). */
  hoursTotal: number;
  /** Store header art (from appdetails; absent when the lookup missed). */
  header?: string;
};

export type OsuStats = {
  /** Ruleset the stats were fetched for; absent in data from older fetches. */
  mode?: string;
  /** osu! stats for the configured ruleset (OSU_MODE: osu/taiko/fruits/mania). */
  pp: number;
  /** Ranks are null while the account counts as inactive. */
  globalRank: number | null;
  countryRank: number | null;
  accuracy: number;
  playTimeHours: number;
  /** The official profile's 90-day world-rank line, oldest first. It can
   *  outlive the current rank — an inactive account keeps the history. */
  rankHistory?: number[];
};

export type MusicTrack = {
  track: string;
  artist: string;
  /** Album art; "" when the scrobble had none (render a placeholder). */
  image: string;
  url: string;
  nowPlaying: boolean;
};

export type MusicArtist = {
  name: string;
  playCount: number;
  url: string;
};

type GameStats = {
  /** recent = last two weeks by 2-week hours; top = lifetime ranking.
   *  Both are the multi-account merge (same appid sums its playtime). */
  steam?: { recent: SteamGame[]; top: SteamGame[] };
  osu?: OsuStats;
  /** Last.fm: recent scrobbles + last month's top artists. */
  music?: { recent: MusicTrack[]; topArtists: MusicArtist[] };
};

// Written by scripts/fetch_gamestats.py on a schedule (gamestats.yml);
// starts as {} until the repo secrets exist, and the Life face hides the
// sections while it is.
const data = raw as GameStats;

export const STEAM_RECENT: SteamGame[] = data.steam?.recent ?? [];
export const STEAM_TOP: SteamGame[] = data.steam?.top ?? [];
export const OSU: OsuStats | undefined = data.osu;
export const MUSIC_RECENT: MusicTrack[] = data.music?.recent ?? [];
export const MUSIC_ARTISTS: MusicArtist[] = data.music?.topArtists ?? [];
