# polyterative.github.io

Personal blog and portfolio of **Vladyslav Yakovenko (Polyterative)** — UX engineer, modular synthesist, and generative artist based in Bologna, Italy.

→ **Live site:** [polyterative.github.io](https://polyterative.github.io)

## What's here

An [Astro](https://astro.build) static site with:
- Blog posts on code, music, tooling, home automation, and creative systems
- Projects page covering open-source work and personal tools
- Music page
- RSS feed at `/rss.xml`

## Local development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview the build locally
```

## Content

Blog posts live in `src/content/blog/` as Markdown files. Frontmatter schema:

```yaml
---
title: "Post Title"
description: "Optional description"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
draft: false        # set true to exclude from build
---
```

## Stack

- [Astro](https://astro.build) — static site generator
- Markdown content with Astro Content Collections
- No JS framework — plain Astro components
- Deployed on Vercel
