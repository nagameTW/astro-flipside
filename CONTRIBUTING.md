# Contributing

Thanks for considering a contribution to this template.

## Dev setup

```bash
npm install
npm run dev
```

Before opening a PR, verify locally exactly what CI checks:

```bash
npm run check && npm run build && npm test
```

`npm audit` may still list advisories against `astro`/`esbuild`: clearing
those needs a breaking major-version bump, so they're left for a deliberate
upgrade rather than `--force`. They're build-tooling-only (the static
output this template ships is unaffected), and dependabot already tracks
them weekly (`.github/dependabot.yml`).

## Repo map

- `src/config.ts`: single source of site configuration (title, nav, feature
  flags, socials). Most customization starts here.
- `src/locales/en.ts`, `src/locales/zh-TW.ts`: every built-in UI string, one
  dictionary per locale. `SITE.locale` in `src/config.ts` picks which loads.
- `src/data/*.ts`: content data, work/life "about" copy (`about.ts`,
  `life.ts`), portfolio entries (`projects.ts`), and the shared block-content
  type definitions (`sections.ts`).
- `src/components/blocks/*.astro`: the generic content blocks (text, chips,
  timeline, cards, stats, ...) that both about-faces render from
  `src/data/sections.ts` entries. See Conventions below.
- `plugins/*.mjs`: build-time remark plugins (Mermaid fences, reading time),
  each with an adjacent `*.test.mjs`.

## Conventions

- [Conventional Commits](https://www.conventionalcommits.org/) for commit
  messages and PR titles (`feat:`, `fix:`, `docs:`, ...).
- One branch per change; open a PR against `main`.
- Blocks stay data-driven: a block component takes its content from
  `src/data/*.ts` and renders nothing when that data is empty (see e.g.
  `cards.length > 0 && (...)` in `Cards.astro`). Don't hardcode content
  inside a block component.
- A UI string change touches **both** `src/locales/en.ts` and
  `src/locales/zh-TW.ts` in the same PR. One locale silently falling behind
  the other is treated as a bug.

## Pull requests

Small fixes can go straight to a PR. For features or behavior changes,
open an issue first so the shape is agreed before you build. The PR form
asks for a description, the type of change, how you tested it, and
before/after screenshots for anything visual; the PR title follows
Conventional Commits because it becomes the squash-merge commit message.

## Personal data

This template ships with obviously-fake demo content (see `src/data/life.ts`)
so nothing personal to the template's maintainer leaks into your fork. Don't
introduce real names, employer/organization affiliations, phone numbers,
government or account IDs, or links to a real person's social/gaming
profiles anywhere under `src/`, `public/`, `.github/`, `package.json`, or
`astro.config.mjs`.

A partial, safe-to-run version of the check (catches accidental real social
links; maintainers additionally check for a few maintainer-specific
identifiers during review that aren't listed here):

```bash
grep -rniE "steamcommunity|gravatar|instagram|facebook" src/ public/ .github/ package.json astro.config.mjs
```

Any hit should be a vendored/generic reference (e.g. an icon class name in
`public/vendor/tocas/tocas.min.css`), never a real profile URL.

## `.mdx` content trust

Blog posts can be `.md` or `.mdx`. Unlike `.md`, an `.mdx` file executes as
JavaScript/JSX at build time, so a PR that adds or changes one needs the
same code-level review trust as a source change, not a content-only skim.
(This template's demo posts are intentionally all `.md`.)

## Visual check

```bash
npm run build && npm run preview
```

Then open the printed local URL and spot-check the page(s) your change
touches: light + dark, and both locales if you touched UI strings.
