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
    alt: "Golden hour on a quiet trail",
    caption: "A walk after work, mid-October.",
  },
  {
    src: "/gallery/gallery-2.svg",
    alt: "Coffee at the corner table by the window",
  },
  {
    src: "/gallery/gallery-3.svg",
    alt: "City skyline just after sunset",
    caption: "First cold night of the year.",
  },
  {
    src: "/gallery/gallery-4.svg",
    alt: "Bookshelf corner in afternoon light",
  },
  {
    src: "/gallery/gallery-5.svg",
    alt: "Mountains passing by a train window",
    caption: "Somewhere past the tunnel.",
  },
  {
    src: "/gallery/gallery-6.svg",
    alt: "A new leaf on the balcony plant",
  },
  {
    src: "/gallery/gallery-7.svg",
    alt: "A notebook and a half-finished sketch",
    caption: "Still not done with this one.",
  },
  {
    src: "/gallery/gallery-8.svg",
    alt: "Rain on the window at blue hour",
  },
];
