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
  description:
    "A dual-face personal site — work on one side, life on the other.",
  author: "Alex Lin",
  /** UI language for every built-in string: "en" | "zh-TW". */
  locale: "en" as "en" | "zh-TW",
  /** Navigation. label is a locale key (see src/locales/). */
  nav: [
    { label: "nav.about", href: "/" },
    { label: "nav.blog", href: "/blog/" },
    { label: "nav.gallery", href: "/gallery/" },
  ] satisfies { label: keyof UIStrings; href: string }[],
  /** Life-face identity-card social buttons. `url` opens; `copy` copies text (Discord-style). */
  socials: [
    {
      name: "GitHub",
      icon: "is-github-icon",
      url: "https://github.com/your-name",
    },
    { name: "Discord", icon: "is-discord-icon", copy: "your-discord-handle" },
  ] as { name: string; icon: string; url?: string; copy?: string }[],
  /** Work-face GitHub link. */
  github: "https://github.com/your-name",
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
