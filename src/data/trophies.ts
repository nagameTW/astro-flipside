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
    caption: "曾經一度衝上排行榜，可惜截圖隨著硬碟故障一起消失了。",
  },
];
