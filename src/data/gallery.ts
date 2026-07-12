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
    alt: "寧靜小徑上的黃金時刻",
    caption: "下班後的散步，十月中旬。",
  },
  {
    src: "/gallery/gallery-2.svg",
    alt: "靠窗角落桌上的咖啡",
  },
  {
    src: "/gallery/gallery-3.svg",
    alt: "日落後不久的城市天際線",
    caption: "今年第一個寒冷的夜晚。",
  },
  {
    src: "/gallery/gallery-4.svg",
    alt: "午後陽光下的書架一角",
  },
  {
    src: "/gallery/gallery-5.svg",
    alt: "從火車窗外掠過的山景",
    caption: "穿過隧道後的某處。",
  },
  {
    src: "/gallery/gallery-6.svg",
    alt: "陽台植物上的新葉",
  },
  {
    src: "/gallery/gallery-7.svg",
    alt: "筆記本與畫到一半的素描",
    caption: "這張還沒畫完。",
  },
  {
    src: "/gallery/gallery-8.svg",
    alt: "藍色時刻，雨落在窗上",
  },
];
