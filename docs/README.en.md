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
  <a href="https://astro-flipside.vercel.app/">Live demo</a>
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
    <li><a href="#-commands">Commands</a></li>
    <li><a href="#-project-structure">Project structure</a></li>
    <li><a href="#-deploy">Deploy</a></li>
    <li><a href="#-locale">Locale</a></li>
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

**2. Run locally**

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

Every push to `main` redeploys, automatically.

Site comes up unstyled or imageless? Back to step 3, check `base`. To add
content, copy the three examples under [Adding content](#-adding-content).

Netlify, Vercel, Cloudflare Pages work too. See the
[Astro deployment guide](https://docs.astro.build/en/guides/deploy/).

## ✍️ Adding content

- Posts → `src/content/blog/`
- Projects → `src/data/projects.ts`
- Photos → `src/data/gallery.ts`

Save, and `npm run dev` picks it up.

**Write a post**

Add a `.md` (or `.mdx`) file under `src/content/blog/`, keep its images
next to the file, and reference them with relative paths:

```md
---
title: "Post title"
description: "Blurb for the list and search results" # optional
pubDate: "2026-07-13"
updatedDate: "2026-07-20" # optional
heroImage: "./cover.jpg" # optional; post hero + list thumbnail
tags: ["life", "music"] # optional
draft: true # drafts render in dev only
---

The body is plain Markdown. Relative images like `![alt](./photo.jpg)`
ship as responsive webp automatically; code frames, tables, the table
of contents, and tags are all built in.
```

Want the full range? The "Kitchen sink" demo post
(`src/content/blog/kitchen-sink.md`) shows every construct. Copy it.

**Add a project**

Append an entry to `PROJECTS` in `src/data/projects.ts`:

```ts
{
  name: "Project name",
  description: "One line on what it is.",
  tech: ["Astro", "TypeScript"],       // rendered as tech tags
  url: "https://github.com/you/repo",  // the whole block links here
  img: cover,                          // optional; a top-of-file import or an https URL
},
```

**Add a photo**

Drop the file into `src/assets/gallery/`, import it in
`src/data/gallery.ts`, and add an entry:

```ts
{
  src: photo,                     // an imported file or an https URL
  alt: "Description for screen readers and search",  // required
  caption: "Line shown under the photo and in the lightbox",  // optional
},
```

Array order is display order.

## 🧰 Commands

From the project root:

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
├── pages/         # Routes: home, about, blog, tags, gallery, projects, RSS
├── styles/        # global.css
├── utils/         # Posts, timeline, URL, dialog helpers
└── config.ts      # ← single source of site configuration
```

The arrows mark what you actually edit for a new site.

## 🚢 Deploy

`.github/workflows/deploy.yml`: on every push to `main`, it runs
`npm run check && npm run build`, then publishes through GitHub Pages'
native Actions deploy (`actions/deploy-pages`). Enable it once:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

`site` and `base` in `src/config.ts` must match how the repo is
published:

| Deployment             | Repo name          | `site`                       | `base`           | Result                                  |
| ---------------------- | ------------------ | ---------------------------- | ---------------- | --------------------------------------- |
| Project page           | anything           | `"https://<user>.github.io"` | `"/<repo-name>"` | `https://<user>.github.io/<repo-name>/` |
| User/organization page | `<user>.github.io` | `"https://<user>.github.io"` | `""`             | `https://<user>.github.io/`             |

### Deploy to Vercel

No config change. Importing the repo is enough.

At [vercel.com](https://vercel.com), sign in with GitHub, **Add New →
Project**, import the repo, **Deploy**.

Every push to `main` redeploys, and PRs get a preview URL. Fully static output, so the free Hobby plan covers it. No adapter needed.

## 🌐 Locale

Defaults to `"zh-TW"`. For English, set `locale: "en"` in `src/config.ts`.

Both dictionaries live in `src/locales/`. Add a language by copying
`en.ts`'s keys.

## 🤝 Contributing

Issues and PRs welcome. Bug reports and feature ideas go through the
[issue forms](../../../issues/new/choose). Small fixes can go straight to a
PR; for anything bigger, open an issue first so we can agree on the shape.

[CONTRIBUTING.md](../CONTRIBUTING.md) covers the dev setup, repo map, and
conventions.

## 📄 License

MIT. See [LICENSE](../LICENSE).

## 📫 Contact

Author: [nagameTW](https://github.com/nagameTW)

Project link: <https://github.com/nagameTW/astro-flipside>

## 🙏 Acknowledgments

Built on [Tocas UI](https://tocas-ui.com/). The blog scaffolding follows
the official Astro blog starter.
