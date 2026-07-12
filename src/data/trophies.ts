// The Life face's trophy wall. Drop screenshots into public/trophies/ and
// list them here. An empty src renders a placeholder box — swap in your own
// achievements.
//
// Photo provenance (Unsplash/Pexels only, same rule as src/data/gallery.ts):
//   trophy-01.jpg — Georgios Kaleadis, https://unsplash.com/photos/aBTfTMsOCOI
//   trophy-02.jpg — Isabella Mendes (Pexels), https://www.pexels.com/photo/red-lights-on-a-stage-5389623/
export type Trophy = {
  /** e.g. "/trophies/apex-4k.png"; "" renders a placeholder box. */
  src: string;
  caption: string;
};

export const TROPHIES: Trophy[] = [
  {
    src: "/trophies/trophy-01.jpg",
    caption:
      "《深夜浪》拿下金浪獎最佳創作歌手——得獎旋律其實是深夜即興哼出來的，手機忘記按下錄音鍵。",
  },
  {
    src: "/trophies/trophy-02.jpg",
    caption: "金浪獎頒獎典禮候補開場，緊張到把整首歌的詞唱成另一首的調。",
  },
];
