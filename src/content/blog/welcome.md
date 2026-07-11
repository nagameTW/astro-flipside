---
title: "Welcome to Flipside"
description: "Where to edit a Flipside site: config, data, and content."
pubDate: 2026-01-01
tags: ["meta"]
---

This is the first post on a fresh Flipside install. If you're reading it in
the built site, the blog is already wired up: tags, pagination, RSS, search,
reading time — all of it. You shouldn't need to touch any of the plumbing.
There are exactly three places you edit.

## `src/config.ts`

Site title, description, author, nav links, socials, and the feature flags
(`features.math`, `features.mermaid`, `features.giscus`). One file, mostly
strings and booleans.

## `src/data/*`

The About page's content — timeline, stats, project cards, links — lives here
as plain data files, not markup. Change the data, the page updates itself.

## `src/content/blog/`

This folder. Drop a Markdown file in, give it a `title` and `pubDate` in the
frontmatter, and it's a post — sorted into the index, tagged, syndicated to
`rss.xml`, and indexed for search on the next build.

See the kitchen-sink post next for everything the Markdown pipeline supports.
