# Flipside

Nobody is just one thing.

At work you answer email, sit in meetings, print a job title on a
business card. After hours you practice guitar, shoot hoops, log on
under a handle only your people would recognize. Both are you, yet
they rarely share a page. A personal site usually hands you one
layout, so you pick one self to show.

Flipside says: don't pick. Like a coin, one side is your profession,
the other is what you love, and flipping it is all it takes.

So the About page ships with a toggle. Press it and the avatar flips:
Work folds away, Life unfolds. Your resume and your hobbies live at
the same address, and visitors decide which you to meet.

It is a clean, Chinese-friendly Astro theme, distilled from my own
personal site. I stripped out the private parts, kept the lessons
learned, and left a starting point you can build on directly.

<table>
  <tr>
    <td><img src="screenshot-work.png" alt="The Work face: resume, skills, experience"></td>
    <td><img src="screenshot-home-light.png" alt="The Life face: interests, collections, everyday life"></td>
  </tr>
  <tr>
    <td align="center"><sub>Work face</sub></td>
    <td align="center"><sub>Life face, same URL</sub></td>
  </tr>
</table>

README in [繁體中文](../README.md) / **English**

<details>
<summary>More screenshots: dark theme, a blog post</summary>

<table>
  <tr>
    <td><img src="screenshot-home-dark.png" width="380" alt="Home, Life face, dark theme"></td>
    <td><img src="screenshot-post.png" width="380" alt="A blog post with the table of contents and a code frame"></td>
  </tr>
  <tr>
    <td align="center"><sub>Dark theme</sub></td>
    <td align="center"><sub>Blog post (TOC + code frame)</sub></td>
  </tr>
</table>

</details>

## What it wants to do for you

The details writers care about come prewired: code frames carry file
names and line numbers, the table of contents follows your scroll,
full-text search needs no server, and drafts never ship by accident.

If you shoot photos, there is a masonry gallery that keeps every
picture's own aspect ratio and opens a lightbox on click.

Chinese users will feel at home: the interface is built on Tocas UI,
a framework designed for Chinese typography. Traditional Chinese is
the default; English is one config line away.

The whole site builds to static files. No server, no secrets, no cron
jobs; push to GitHub and it lives. The full list is under
[Features](#features).

## Getting started

1. Click **Use this template** on GitHub (or run
   `gh repo create --template nagameTW/astro-flipside`), then `npm install`.
2. Edit `src/config.ts`: site URL, base path, title, nav, socials, and
   feature flags. See [Config reference](#config-reference).
3. Fill in your content.
   - `src/data/*`: About content for both faces (`about.ts`, `life.ts`),
     projects, trophies, gear, and gallery photos (`gallery.ts` plus files
     in `public/gallery/`).
   - `src/content/blog/`: write your posts, then delete the demo ones
     (`welcome.md`, `kitchen-sink.md`, `kitchen-sink-zh.md`).
4. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
   Run `npm run dev` to preview locally; push to `main` to deploy (see
   [Deploy](#deploy)).

---

Everything below is technical reference. Come back when you build.

## Features

**Dual-face about**

- [x] Work/Life toggle with a 3D avatar flip
- [x] Both faces render from the same 9 generic content blocks: text, chips,
      key-value, timeline, highlights, cards, stats, links, freeform markdown
- [x] Work face data in `src/data/about.ts`, Life face data in
      `src/data/life.ts`
- [x] `src/data/projects.ts` and `ProjectCard.astro` ship as a scaffold for a
      future `/projects/` page, not wired into a route yet

**Blog**

- [x] Expressive Code fenced blocks: filenames, line numbers, diff
      highlighting
- [x] Table of contents with scroll-spy (desktop left rail, mobile
      disclosure), heading anchors, and CJK-aware reading time
- [x] Pagefind full-text search, static, no server involved
- [x] Tags with a tag index, pagination, and prev/next navigation
- [x] RSS feed
- [x] Drafts (`draft: true`) show only in `astro dev`; production builds and
      the RSS feed exclude them automatically
- [x] `heroImage` in frontmatter doubles as the post's cover image on the
      blog index

**Gallery**

- [x] Pinterest-style masonry layout: CSS multi-column, so photos keep their
      own aspect ratio instead of being cropped into a fixed grid
- [x] Data-driven: list photos in `src/data/gallery.ts`, drop the files in
      `public/gallery/`
- [x] Click a photo to open it full-size in a lightbox

**Everywhere**

- [x] Dark mode: follows OS preference, or an explicit toggle that persists
- [x] Built-in en / zh-TW UI strings, switched with one config flag
- [x] Optional, flag-gated KaTeX math, Mermaid diagrams, and giscus
      comments, each at zero bundle cost when off
- [x] Base-path support for GitHub project pages
- [x] Fully static output: zero secrets, zero server

## Commands

All commands run from the project root, in a terminal:

| Command           | Action                                                               |
| :---------------- | :------------------------------------------------------------------- |
| `npm run dev`     | Starts the local dev server at `localhost:4321`                      |
| `npm run build`   | Builds the production site to `dist/`, then indexes it with Pagefind |
| `npm run preview` | Previews the production build locally, before deploying              |
| `npm run check`   | Type-checks the project (Astro and TypeScript)                       |
| `npm test`        | Runs the plugin unit tests (`plugins/*.test.mjs`)                    |
| `npm run fmt`     | Formats the codebase with Prettier                                   |

## Project structure

```
src/
├── components/    # Astro components: Navbar, Footer, FaceToggle, blocks/, ...
├── content/blog/  # ← blog posts (.md / .mdx)
├── data/          # ← About/Life copy, gallery, projects, trophies
├── layouts/       # Layout.astro, BlogPost.astro
├── locales/       # en.ts / zh-TW.ts UI string dictionaries
├── pages/         # Routes: home, blog, tags, gallery, RSS, sitemap
├── styles/        # global.css
├── utils/         # Reading time, timeline, URL helpers
└── config.ts      # ← single source of site configuration
```

The three arrows are what you edit for a new site. Everything else is
template internals.

## Deploy

`.github/workflows/deploy.yml` builds with `npm run check && npm run build`
and publishes through GitHub Pages' native Actions deployment
(`actions/deploy-pages`) on every push to `main`. Enable it once:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

`site` and `base` in `src/config.ts` (the single source of truth;
`astro.config.mjs` reads both from there) must match how the repo is
published:

| Deployment             | Repo name          | `site`                       | `base`           | Result                                  |
| ---------------------- | ------------------ | ----------------------------- | ----------------- | ---------------------------------------- |
| Project page           | anything           | `"https://<user>.github.io"` | `"/<repo-name>"` | `https://<user>.github.io/<repo-name>/` |
| User/organization page | `<user>.github.io` | `"https://<user>.github.io"` | `""`             | `https://<user>.github.io/`             |

This repo deploys itself as a project page (`base: "/astro-flipside"`) at
<https://nagametw.github.io/astro-flipside/> as a live demo.

## Optional modules

**Trophies** (Life face, Highlights cards): edit `src/data/trophies.ts`.
Screenshots go in `public/trophies/`. An empty `src` renders a placeholder
box.

**Gear** (Life face, Gear block): edit the `GEAR` array in
`src/data/life.ts`.

## Config reference

Every key in `src/config.ts`:

| Key                | Meaning                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `site`             | Deployment origin, no trailing slash.                                                                                                      |
| `base`             | Sub-path for a GitHub project page (e.g. `"/astro-flipside"`); `""` for a user/root page.                                                  |
| `title`            | Site name: nav brand, `<title>`, RSS channel title; also shown as the Life-face identity-card name (that face has no separate name field). |
| `description`      | Site meta description; RSS channel description; a post's fallback meta description when it has none of its own.                            |
| `author`           | Your name. Rendered as a `<meta name="author">` tag on every page (its only consumer today).                                               |
| `locale`           | `"en"` or `"zh-TW"`; selects the UI string dictionary (`src/locales/`) and `<html lang>`.                                                  |
| `nav`              | Nav bar links; each `label` is a key into the locale dictionary.                                                                           |
| `socials`          | Life-face identity-card buttons; `url` opens a link, `copy` copies text (Discord-style).                                                   |
| `github`           | Work-face identity-card GitHub link.                                                                                                       |
| `features.math`    | KaTeX math (`$…$` / `$$…$$`) in posts. Off by default; zero bundle cost when off.                                                          |
| `features.mermaid` | ` ```mermaid ` fenced diagrams in posts. Off by default; zero bundle cost when off.                                                        |
| `features.giscus`  | `false`, or the four data-attributes from [giscus.app](https://giscus.app) to enable comments.                                             |

## Locale

The whole UI (not per-post) reads one locale, and it now defaults to
`"zh-TW"`. Set `locale: "en"` in `src/config.ts` to switch to the English
strings instead. Both dictionaries live in `src/locales/`; add another
language by copying `en.ts`'s keys.

繁體中文版說明：[../README.md](../README.md)

## Contributing

Issues and pull requests are welcome. Bug reports and feature ideas go
through the [issue forms](../../../issues/new/choose); small fixes can go
straight to a PR, and it's worth opening an issue first for anything
bigger so we can agree on the shape before you build it.

[CONTRIBUTING.md](../CONTRIBUTING.md) covers the dev setup, repo map, and
conventions; the PR form walks you through the rest (type of change,
testing, screenshots for visual changes). CI runs the same three checks
you can run locally: `npm run check && npm run build && npm test`.

## Acknowledgments

Built on [Tocas UI](https://tocas-ui.com/). Blog scaffolding follows the
official Astro blog starter.

## License and status

[![CI](https://github.com/nagameTW/astro-flipside/actions/workflows/ci.yml/badge.svg)](https://github.com/nagameTW/astro-flipside/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../LICENSE)
![Astro](https://img.shields.io/badge/astro-5.1.3-BC52EE?logo=astro&logoColor=white)

MIT. See [LICENSE](../LICENSE).
