// Drop photos into public/gallery/ and list them here — array order is
// display order (the masonry layout does not resort). `src` is a public/
// path (base-prefixed automatically, same as every other asset path in
// src/data/*) or a full https:// URL, used as-is — same rule BlogPost.astro
// applies to `heroImage`. `alt` is required: unlike the decorative avatar/
// hero images elsewhere, a gallery photo IS the content. `caption` is
// optional and renders under the image (and in the lightbox) when set.
export type GalleryPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export const GALLERY: GalleryPhoto[] = [
  {
    src: "/gallery/gallery-1.svg",
    alt: "後台走廊，上台前最後一段路",
    caption: "巡迴最後一場，開場前十分鐘。",
  },
  {
    src: "/gallery/gallery-2.svg",
    alt: "錄音室裡靠窗的那杯手搖飲",
  },
  {
    src: "/gallery/gallery-3.svg",
    alt: "深夜的編曲工作畫面",
    caption: "半夜兩點，新歌的第三個版本。",
  },
  {
    src: "/gallery/gallery-4.svg",
    alt: "巡演途中車窗外掠過的風景",
  },
  {
    src: "/gallery/gallery-5.svg",
    alt: "後台休息室的吉他與筆記本",
    caption: "副歌卡住的那個下午。",
  },
  {
    src: "/gallery/gallery-6.svg",
    alt: "彩排時的舞台燈光測試",
  },
  {
    src: "/gallery/gallery-7.svg",
    alt: "簽名會排隊人潮的一角",
    caption: "沒想到會有人排這麼久。",
  },
  {
    src: "/gallery/gallery-8.svg",
    alt: "雨天的錄音室窗景",
  },
];
