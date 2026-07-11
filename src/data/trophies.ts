// The Life face's placeholder trophy wall. Drop screenshots into
// public/trophies/ and list them here. An empty src renders a placeholder
// box — swap in your own achievements.
export type Trophy = {
  /** e.g. "/trophies/apex-4k.png"; "" renders a placeholder box. */
  src: string;
  caption: string;
};

export const TROPHIES: Trophy[] = [
  {
    src: "",
    caption:
      "Reached the leaderboard once. Screenshot lost to a hard-drive crash.",
  },
];
