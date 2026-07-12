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
      "有次深夜即興哼出的旋律，後來成了最紅的一首歌——可惜手機忘記按下錄音鍵。",
  },
  {
    src: "",
    caption: "第一次登台候補上場，緊張到把整首歌的詞唱成另一首的調。",
  },
];
