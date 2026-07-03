# blog-site

The static generator for the tech blog. It reads Markdown posts from [`../blog/posts/`](../blog/posts)
and renders the blog (index + one page per post + an RSS feed) into `dist/`, which the deploy workflow
publishes to the `gh-pages` branch under **`/blog/`**
(`https://rgoussu-dev.github.io/CV-And-Blog/blog/`).

It's the sibling of Alfred's `cv-site/`: same toolchain (`markdown-it` + `gray-matter` + `tsx`), same
Ubuntu-terminal look, and the same deploy discipline — an independent subtree deploy with
`keep_files: true`, so the site-root landing page and the `/cv/` subtree are never clobbered.

**Posts are authored as Markdown, never as HTML.** Alfred's `Alfred-Writing-Publish` routine adds a
post as `blog/posts/<slug>.md` via a **reviewed PR** (see `Alfred/writing/adapters/blog.md`); this
build turns it into the deployed page deterministically. Don't edit the built output.

## Commands

```bash
npm install          # once
npm run build        # ../blog/posts/*.md  ->  dist/
npm run serve        # preview dist/ at http://127.0.0.1:4174/blog/
npm run dev          # build + serve
npm run build -- --drafts   # also build draft:true posts (noindex; excluded from the public deploy)
```

## Post front matter

```yaml
---
title: "..."            # required
slug: "my-post"         # optional; defaults to the filename
date: "2026-07-03"      # YYYY-MM-DD — controls order + display
description: "..."      # the dek: <meta description> + the index card
tags: ["backend"]       # plain words (no leading #); rendered as chips
canonical: ""           # empty = self-canonical; set only if it first appeared elsewhere
draft: false            # true = built noindex + excluded from the public deploy & feed
---
```

Files whose name starts with `_` (e.g. `_TEMPLATE.md`) are ignored by the build.

## Output tree

```
dist/
  index.html          the blog index (posts newest-first)
  <slug>/index.html   each post
  feed.xml            RSS 2.0
  assets/blog.css     the Ubuntu-terminal theme
  .nojekyll
```

## Notes

- **Base URL:** canonical links and the feed use `https://rgoussu-dev.github.io/CV-And-Blog` by
  default; override with the `BLOG_BASE_URL` env var (e.g. for a custom domain later).
- The deploy (`.github/workflows/deploy-blog.yml`) builds and publishes on every push to `main` that
  touches `blog/**` or `blog-site/**`.
