<div align="center">

[![CI](https://img.shields.io/github/actions/workflow/status/nagameTW/astro-flipside/ci.yml?label=CI&style=for-the-badge)](https://github.com/nagameTW/astro-flipside/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-2F3741?style=for-the-badge)](../LICENSE)
![Astro](https://img.shields.io/badge/Astro-5-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
[![Tocas UI](https://img.shields.io/badge/Tocas_UI-1F2430?style=for-the-badge)](https://tocas-ui.com/)
![i18n](https://img.shields.io/badge/i18n-%E7%B9%81%E9%AB%94%E4%B8%AD%E6%96%87%20%7C%20English-2F3741?style=for-the-badge)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-2F3741?style=for-the-badge)](../CONTRIBUTING.md)

<img src="../public/favicon.svg" alt="Flipside logo" width="80" height="80">

<h3 align="center">Flipside</h3>

<p align="center">
  Flip it over, meet the other you.
  <br />
  <br />
  <a href="https://nagametw.github.io/astro-flipside/">Live demo</a>
  ·
  <a href="../../../issues/new/choose">Report a bug</a>
  ·
  <a href="../../../issues/new/choose">Request a feature</a>
  <br />
  README in <a href="../README.md">繁體中文</a> / <strong>English</strong>
</p>

</div>

<details>
  <summary>Table of contents</summary>
  <ol>
    <li><a href="#-about-flipside">About Flipside</a></li>
    <li><a href="#-getting-started">Getting started</a></li>
    <li><a href="#-features">Features</a></li>
    <li><a href="#-commands">Commands</a></li>
    <li><a href="#-project-structure">Project structure</a></li>
    <li><a href="#-deploy">Deploy</a></li>
    <li><a href="#-locale">Locale</a></li>
    <li><a href="#-roadmap">Roadmap</a></li>
    <li><a href="#-contributing">Contributing</a></li>
    <li><a href="#-license">License</a></li>
    <li><a href="#-contact">Contact</a></li>
    <li><a href="#-acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## 🪙 About Flipside

By day you move between email and meetings, introducing yourself by
the title on your business card. By night you practice guitar, play
ball, or slip into an ID only fellow fans would know.

Both are you, yet they rarely show up in the same place.

Most personal sites give you one layout and one way to tell your
story, so you keep having to choose: show the profession, or share
the passion? In the end, one side gets to stand for all of you.

But why compromise.

Like a coin: profession on the front, passion on the back. Both sides
are the real you. One flip, and visitors meet you from another angle.

This is Flipside, a clean, Chinese-friendly Astro theme. It grew out
of my personal site: everything private removed, the design thinking
kept, shaped into a starting point you can use right away, so that
more people can build a space of their own that shows their
profession and keeps what makes them who they are.

<img src="hero.jpg" alt="Flipside at a glance: the Work and Life faces, gallery, post list, code frames, and the dark theme">

### 🛠️ Built with

- [Astro](https://astro.build/) — the static-output site framework
- [Tocas UI](https://tocas-ui.com/) — a UI framework designed for Chinese
- [Expressive Code](https://expressive-code.com/) — code frames
- [Pagefind](https://pagefind.app/) — static full-text search

## 🚀 Getting started

**1. Create your repo**

Click **Use this template** at the top, or use the GitHub CLI:

```bash
gh repo create my-site --template nagameTW/astro-flipside --public --clone
```

The repo name decides your URL: name it `<user>.github.io` and the site
lives at `https://<user>.github.io/`; any other name (say `my-site`) puts
it at `https://<user>.github.io/my-site/`.

**2. Run it locally**

```bash
cd my-site
npm install
npm run dev     # http://localhost:4321, live-reloads as you edit
```

**3. Point it at your URL**

Edit the top two fields of `src/config.ts` to match step 1:

```ts
site: "https://<user>.github.io",
base: "/my-site", // leave "" when the repo is named <user>.github.io
```

**4. Turn on GitHub Pages**

In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
One-time setup.

**5. Deploy**

```bash
git add -A
git commit -m "first deploy"
git push        # Actions builds and deploys; live in about a minute
```

Every later push to `main` redeploys automatically. If the site comes up
unstyled or without images, go back to step 3 and check `base`. Your
content lives in the three arrowed spots under
[Project structure](#-project-structure); every other field in
`src/config.ts` carries its own comment, so fill them in as you go.
Delete the demo posts once you've read them.

Netlify, Vercel, and Cloudflare Pages work too: the template is fully
static, so importing the repo is enough (set `base` to `""`). See the
[Astro deployment guide](https://docs.astro.build/en/guides/deploy/).

## ✨ Features

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
- [x] Table of contents with scroll-spy, heading anchors, and CJK-aware
      reading time
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
- [x] Data-driven: drop the files in `src/assets/gallery/`, import and list them in `src/data/gallery.ts` (auto webp + responsive sizes)
- [x] Click a photo to open it full-size in a lightbox

**Everywhere**

- [x] Dark mode: follows OS preference, or an explicit toggle that persists
- [x] Built-in en / zh-TW UI strings, switched with one config flag
- [x] Optional, flag-gated KaTeX math, Mermaid diagrams, and giscus
      comments, each at zero bundle cost when off
- [x] Base-path support for GitHub project pages
- [x] Fully static output: zero secrets, zero server

## 🧰 Commands

All commands run from the project root, in a terminal:

| Command           | Action                                                               |
| :---------------- | :------------------------------------------------------------------- |
| `npm run dev`     | Starts the local dev server at `localhost:4321`                      |
| `npm run build`   | Builds the production site to `dist/`, then indexes it with Pagefind |
| `npm run preview` | Previews the production build locally                                |
| `npm run check`   | Type-checks the project                                              |
| `npm test`        | Runs the plugin unit tests (`plugins/*.test.mjs`)                    |
| `npm run fmt`     | Formats the codebase with Prettier                                   |

## 🗂️ Project structure

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

## 🚢 Deploy

`.github/workflows/deploy.yml` builds with `npm run check && npm run build`
and publishes through GitHub Pages' native Actions deployment
(`actions/deploy-pages`) on every push to `main`. Enable it once:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

`site` and `base` in `src/config.ts` must match how the repo is
published:

| Deployment             | Repo name          | `site`                       | `base`           | Result                                  |
| ---------------------- | ------------------ | ---------------------------- | ---------------- | --------------------------------------- |
| Project page           | anything           | `"https://<user>.github.io"` | `"/<repo-name>"` | `https://<user>.github.io/<repo-name>/` |
| User/organization page | `<user>.github.io` | `"https://<user>.github.io"` | `""`             | `https://<user>.github.io/`             |

This repo deploys itself as a project page; the live demo is at
<https://nagametw.github.io/astro-flipside/>.

## 🌐 Locale

The UI reads one locale, and it defaults to `"zh-TW"`. Set
`locale: "en"` in `src/config.ts` to switch to the English strings
instead. Both dictionaries live in `src/locales/`; add another language
by copying `en.ts`'s keys.

## 🗺️ Roadmap

- [ ] Home page. The site currently opens straight into the About page;
      a dedicated landing page is planned
- [ ] `/projects/` portfolio page (the `src/data/projects.ts` +
      `ProjectCard.astro` scaffold is ready; it gets a route once there is
      real content to show)

Planned work and known issues live in the
[open issues](../../../issues).

## 🤝 Contributing

Issues and pull requests are welcome. Bug reports and feature ideas go
through the [issue forms](../../../issues/new/choose); small fixes can go
straight to a PR, and it's worth opening an issue first for anything
bigger so we can agree on the shape before you build it.

[CONTRIBUTING.md](../CONTRIBUTING.md) covers the dev setup, repo map, and
conventions; the PR form walks you through the rest. CI runs the same
three checks you can run locally:
`npm run check && npm run build && npm test`.

## 📄 License

MIT. See [LICENSE](../LICENSE).

## 📫 Contact

Author: [nagameTW](https://github.com/nagameTW)

Project link: <https://github.com/nagameTW/astro-flipside>

## 🙏 Acknowledgments

Built on [Tocas UI](https://tocas-ui.com/). Blog scaffolding follows the
official Astro blog starter.
