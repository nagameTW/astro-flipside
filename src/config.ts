import type { UIStrings } from "@/locales/en";

/**
 * astro-flipside — site configuration.
 * This file + src/data/* + src/content/blog/ are the only places a user
 * must edit. Keys marked (locale) take a key defined in src/locales/*.
 */
const SITE = {
  /** Deployment origin, no trailing slash. */
  site: "https://example.github.io",
  /** Sub-path when deployed as a GitHub project page, e.g. "/astro-flipside". "" for root. */
  base: "/astro-flipside",
  title: "Flipside",
  description: "雙面（Work / Life）個人網站與部落格模板",
  author: "拍岸",
  /** UI language for every built-in string: "en" | "zh-TW". */
  locale: "zh-TW" as "en" | "zh-TW",
  /** Navigation. label is a locale key (see src/locales/). */
  nav: [
    { label: "nav.about", href: "/" },
    { label: "nav.blog", href: "/blog/" },
    { label: "nav.gallery", href: "/gallery/" },
  ] satisfies { label: keyof UIStrings; href: string }[],
  /** Life-face identity-card social buttons. `url` opens; `copy` copies text (Discord-style). */
  socials: [
    {
      name: "Instagram",
      icon: "is-instagram-icon",
      url: "https://example.com/instagram/your-name",
    },
    {
      name: "Threads",
      icon: "is-threads-icon",
      url: "https://example.com/threads/your-name",
    },
    { name: "Discord", icon: "is-discord-icon", copy: "your-discord-handle" },
  ] as { name: string; icon: string; url?: string; copy?: string }[],
  /** Work-face identity-card social buttons — same `url`/`copy` shape. */
  socialsWork: [
    {
      name: "Spotify",
      icon: "is-spotify-icon",
      url: "https://example.com/spotify/your-name",
    },
    {
      name: "YouTube",
      icon: "is-youtube-icon",
      url: "https://example.com/youtube/your-name",
    },
    {
      name: "SoundCloud",
      icon: "is-soundcloud-icon",
      url: "https://example.com/soundcloud/your-name",
    },
  ] as { name: string; icon: string; url?: string; copy?: string }[],
  features: {
    /** KaTeX math ($…$ / $$…$$) in posts. */
    math: false,
    /** ```mermaid fenced diagrams in posts. */
    mermaid: false,
    /** giscus comments under posts. false, or the data-attributes from giscus.app. */
    giscus: false as
      | false
      | { repo: string; repoId: string; category: string; categoryId: string },
  },
};

export default SITE;
