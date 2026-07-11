# astro-flipside

[繁體中文 →](docs/README.zh-TW.md)

<table>
  <tr>
    <td><img src="docs/screenshot-home-light.png" width="400" alt="Home page, Life face, light theme"></td>
    <td><img src="docs/screenshot-home-dark.png" width="400" alt="Home page, Life face, dark theme"></td>
  </tr>
  <tr>
    <td align="center"><sub>Life face (light)</sub></td>
    <td align="center"><sub>Life face (dark)</sub></td>
  </tr>
  <tr>
    <td><img src="docs/screenshot-work.png" width="400" alt="Home page, Work face"></td>
    <td><img src="docs/screenshot-post.png" width="400" alt="Blog post with a table of contents and a code block"></td>
  </tr>
  <tr>
    <td align="center"><sub>Work face</sub></td>
    <td align="center"><sub>Blog post (TOC + code block)</sub></td>
  </tr>
</table>

astro-flipside is a personal-site template for Astro built around one idea: a
single Work/Life toggle flips the About page between a professional profile
and a personal one. Same layout, same content blocks, different data. Behind
it sits a Markdown blog with code blocks, a table of contents, tags,
pagination, search, and RSS.

## Features

**Dual-face About**

- Work/Life toggle with a 3D avatar flip. Both faces render from the same 12
  generic content blocks: text, chips, key-value, timeline, highlights,
  cards, stats, links, freeform markdown, plus Steam/osu!/Last.fm blocks.
  Edit data, not components.
- Work face data in `src/data/about.ts`, Life face data in `src/data/life.ts`.
- A `cards` block is a natural fit for listing projects. `src/data/projects.ts`
  and `ProjectCard.astro` ship as a scaffold for a future dedicated
  `/projects/` page. Neither is wired into a live route today; both exist as
  a worked example.

**Blog**

- Expressive Code fenced blocks: filenames, line numbers, diff highlighting.
- Auto-generated table of contents with scroll-spy (desktop rail, mobile
  disclosure), heading anchors, CJK-aware reading time.
- Tags with a tag index, pagination, prev/next navigation between posts.
- Drafts: `draft: true` in frontmatter shows the post only in `astro dev`;
  production builds and the RSS feed exclude it automatically.
- RSS feed, Pagefind full-text search (static, no server involved).

**Everywhere**

- Dark mode: follows OS preference, or an explicit toggle that persists.
- Built-in en / zh-TW UI strings, switched with one config flag.
- Optional, flag-gated: KaTeX math, Mermaid diagrams, giscus comments,
  Steam/osu!/Last.fm stat blocks. Each compiles to zero bundle bytes when its
  flag is off.

## Quick start

1. Click **Use this template** on GitHub (or
   `gh repo create --template nagameTW/astro-flipside`).
2. `npm install`
3. Edit `src/config.ts`: site URL, base path, title, nav, socials, feature
   flags (see [Config reference](#config-reference)).
4. Edit `src/data/*`: About content for both faces (`about.ts`, `life.ts`),
   projects, trophies, gear.
5. Write posts in `src/content/blog/`. Delete the demo posts (`welcome.md`,
   `kitchen-sink.md`, `kitchen-sink-zh.md`) when you're ready to publish your
   own.
6. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
7. `npm run dev` to preview locally; push to `main` to deploy (see
   [Deploy](#deploy)).

## Deploy

`.github/workflows/deploy.yml` builds with `npm run check && npm run build`
and publishes through GitHub Pages' native Actions deployment
(`actions/deploy-pages`) on every push to `main`. Enable it once:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

`site` and `base` in `src/config.ts` (the single source of truth;
`astro.config.mjs` reads both from there) must match how the repo is
published:

| Deployment             | Repo name          | `site`                       | `base`           | Result                                  |
| ---------------------- | ------------------ | ---------------------------- | ---------------- | --------------------------------------- |
| Project page           | anything           | `"https://<user>.github.io"` | `"/<repo-name>"` | `https://<user>.github.io/<repo-name>/` |
| User/organization page | `<user>.github.io` | `"https://<user>.github.io"` | `""`             | `https://<user>.github.io/`             |

This repo deploys itself as a project page (`base: "/astro-flipside"`) at
<https://nagametw.github.io/astro-flipside/> as a live demo.

## Optional modules

**Steam / osu! / Last.fm stats** (Life face; the Music/Steam/osu! blocks
self-hide until there's data):

- Repo **secrets** (Settings → Secrets and variables → Actions → Secrets):
  `STEAM_API_KEY`, `OSU_CLIENT_ID`, `OSU_CLIENT_SECRET`, `LASTFM_API_KEY`.
  Add only the ones you use; a source with no secret is silently skipped.
- Repo **variables** (same page → Variables): `STEAM_ACCOUNTS`
  (comma-separated SteamIDs), `EXCLUDED_APPIDS`, `OSU_USER_ID`, `LASTFM_USER`.
- `.github/workflows/gamestats.yml` runs `scripts/fetch_gamestats.py` daily
  (and on manual dispatch), writes `src/data/gamestats.json`, commits if it
  changed, and triggers a redeploy.

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

The whole UI (not per-post) reads one locale: set `locale: "zh-TW"` in
`src/config.ts` to switch every built-in string at once. Both dictionaries
live in `src/locales/`; add another language by copying `en.ts`'s keys.

繁體中文版說明：[docs/README.zh-TW.md](docs/README.zh-TW.md)

## Acknowledgments

Built on [Tocas UI](https://tocas-ui.com/). Blog scaffolding follows the
official Astro blog starter.

## License

MIT. See [LICENSE](LICENSE).
