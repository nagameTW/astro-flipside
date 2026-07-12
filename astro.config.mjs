// @ts-check
import { cp } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";
import { remarkMermaid } from "./plugins/remark-mermaid.mjs";
import SITE from "./src/config.ts";
// Works from config-land because src/locales uses relative imports only —
// the config loader does not resolve the `@/` alias.
import { t } from "./src/locales/index.ts";

// Vite statically discovers `import("katex/dist/katex.min.css")` no matter which
// runtime branch guards it, so a conditional dynamic import still ships the CSS
// (and Vite's asset copy still ships every font file) even with features.math
// off. Copying the vendored assets ourselves — only when the flag is on — keeps
// the off-cost at zero. Build-only hook: `astro dev` never runs build hooks, so
// math styling only appears in `build`/`preview`, not in the dev server.
/** Copies katex.min.css + fonts into dist/vendor/katex when features.math is on.
 * @type {() => import("astro").AstroIntegration} */
const katexAssets = () => ({
  name: "katex-assets",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      const out = fileURLToPath(new URL("vendor/katex/", dir));
      await cp("node_modules/katex/dist/katex.min.css", out + "katex.min.css", {
        force: true,
      });
      await cp("node_modules/katex/dist/fonts", out + "fonts", {
        recursive: true,
        force: true,
      });
    },
  },
});

// A static `{SITE.features.mermaid && <Mermaid />}` in BlogPost.astro (the
// KaTeX-era pattern) was tried first and rejected: Astro hoists and Vite
// bundles a referenced .astro file's <script> — and everything it
// dynamically imports — purely from static analysis of the compiled module
// graph, regardless of which runtime branch guards the component's usage.
// That shipped the ~600kB mermaid renderer, plus a sub-chunk per diagram
// type, on every build even with the flag off (verified: removing the
// import made every mermaid-named chunk disappear; guarding it with a
// runtime ternary did not). injectScript, called only when the flag is on,
// keeps Astro from ever discovering the reference: Mermaid.astro stays the
// single, type-checked source of the client logic (astro check still lints
// it even though nothing imports it), and this integration just reads its
// <script> body in as plain text at config time and injects it into every
// page — the script's own `if (nodes.length)` guard makes that a no-op on
// pages without a diagram.
/** @type {() => import("astro").AstroIntegration} */
const mermaidClient = () => ({
  name: "mermaid-client",
  hooks: {
    "astro:config:setup": ({ injectScript }) => {
      const source = readFileSync(
        fileURLToPath(
          new URL("./src/components/Mermaid.astro", import.meta.url),
        ),
        "utf8",
      );
      // Drop the frontmatter comment before matching so a `<script>` mentioned
      // in prose up there (it happened once) can never be mistaken for the tag.
      const body = source.slice(source.indexOf("---", 3) + 3);
      const match = body.match(/<script>([\s\S]*)<\/script>/);
      if (!match) throw new Error("Mermaid.astro: no <script> tag found");
      injectScript("page", match[1]);
    },
  },
});

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: SITE.site,
  base: SITE.base || undefined,
  markdown: {
    // GFM footnotes ship an English sr-only "Footnotes" heading — localize
    // it. The ↩ back-reference link is hidden entirely in global.css
    // (owner: redundant on posts this short).
    remarkRehype: {
      footnoteLabel: t["post.footnotesLabel"],
    },
    // remarkMermaid goes first: it must turn ```mermaid fences into a raw
    // <div> before expressive-code's own remark-time processing sees them.
    remarkPlugins: [
      ...(SITE.features.mermaid ? [remarkMermaid] : []),
      remarkReadingTime,
      ...(SITE.features.math ? [remarkMath] : []),
    ],
    rehypePlugins: [
      // rehypeSlug alone: heading ids for the TOC's deep links, without
      // the hover "#" anchor a rehype-autolink-headings setup would add
      // (owner removed it 2026-07-12).
      rehypeSlug,
      ...(SITE.features.math ? [rehypeKatex] : []),
    ],
  },
  integrations: [
    // Must precede mdx() so it can claim ```fenced blocks before MDX's own
    // markdown processing sees them.
    expressiveCode({
      themes: ["github-light", "github-dark-high-contrast"],
      // Tocas (site theme) puts `.is-dark`/`.is-light` on <html> for an
      // explicit user choice and leaves it unclassed to follow OS
      // prefers-color-scheme otherwise. Returning bare classes here (not
      // ":root:not(...)" — themeCssRoot already prepends ":root") lets
      // useDarkModeMediaQuery's default `true` (exactly 2 themes, opposite
      // types) generate the "@media (prefers-color-scheme: dark) but not
      // .is-light" rule, matching Tocas's own pattern:
      //   .is-dark            -> dark, unconditional (explicit choice wins)
      //   :not(.is-light) + OS dark -> dark (no class = follow OS)
      themeCssSelector: (theme) =>
        theme.type === "dark" ? ".is-dark" : ".is-light",
      useDarkModeMediaQuery: true,
      plugins: [pluginLineNumbers()],
      defaultProps: { showLineNumbers: false },
      // Per-theme code/terminal backgrounds are set on the THEMES, not as a
      // styleOverrides resolver: a `({ theme }) => …` on the top-level
      // codeBackground makes the emitted ec.*.css hash disagree with the URL
      // injected into <link> tags — pages then reference a css file that
      // does not exist and every block renders unstyled (reproduced
      // 2026-07-12; frame-level resolvers below are unaffected). Light
      // value sits between --ts-gray-75 (250) and gray-100 (242): gray-100
      // read too heavy against the white page (owner call). Dark mirrors
      // dark gray-100.
      customizeTheme: (theme) => {
        const bg = theme.type === "dark" ? "#333333" : "#f6f6f6";
        theme.colors["editor.background"] = bg;
        theme.colors["terminal.background"] = bg;
        return theme;
      },
      // Flat, Tocas-gray code surfaces (values mirror --ts-gray-200/300 in
      // both modes). Filename tabs flatten into a plain label strip (no tab
      // chrome, no indicators), terminals lose the macOS window dots, and
      // every frame shadow and border is gone.
      styleOverrides: {
        borderRadius: "0.4rem",
        codeFontSize: "0.9em",
        borderWidth: "0",
        frames: {
          frameBoxShadowCssValue: "none",
          editorTabBarBackground: ({ theme }) =>
            theme.type === "dark" ? "rgb(56, 56, 56)" : "rgb(238, 238, 238)",
          editorTabBarBorderBottomColor: ({ theme }) =>
            theme.type === "dark" ? "rgb(71, 71, 71)" : "rgb(225, 225, 225)",
          editorActiveTabBackground: "transparent",
          editorActiveTabBorderColor: "transparent",
          editorActiveTabIndicatorTopColor: "transparent",
          editorActiveTabIndicatorBottomColor: "transparent",
          terminalTitlebarBackground: ({ theme }) =>
            theme.type === "dark" ? "rgb(56, 56, 56)" : "rgb(238, 238, 238)",
          terminalTitlebarBorderBottomColor: ({ theme }) =>
            theme.type === "dark" ? "rgb(71, 71, 71)" : "rgb(225, 225, 225)",
          terminalTitlebarDotsOpacity: "0",
        },
      },
    }),
    mdx(),
    sitemap(),
    ...(SITE.features.math ? [katexAssets()] : []),
    ...(SITE.features.mermaid ? [mermaidClient()] : []),
  ],
});
