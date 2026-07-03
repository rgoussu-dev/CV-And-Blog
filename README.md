# CV-And-Blog

The public site at **https://rgoussu-dev.github.io/CV-And-Blog/** — served from the `gh-pages`
branch via GitHub Pages.

| Path | What | Source |
|------|------|--------|
| `/` | Landing page | [`site/`](site/) in this repo |
| `/blog/` | The tech blog (articles + RSS) | [`blog/posts/`](blog/posts) → built by [`blog-site/`](blog-site) in this repo |
| `/cv/` | The CV (EN + FR + PDFs) | Built & deployed from the private `Alfred` repo |

## How deployment works

`gh-pages` is assembled from three independent, non-colliding deploys — each uses `keep_files: true`
so none clobbers another's subtree:

- **Landing page** — [`.github/workflows/deploy-landing.yml`](.github/workflows/deploy-landing.yml)
  publishes [`site/`](site/) to the `gh-pages` **root** on every push to `main` that touches
  `site/`. Edit `site/index.html` here and merge to `main` to update it.
- **Blog** — [`.github/workflows/deploy-blog.yml`](.github/workflows/deploy-blog.yml) builds
  [`blog-site/`](blog-site) (which renders [`blog/posts/*.md`](blog/posts)) and publishes it under
  `blog/` on every push to `main` that touches `blog/` or `blog-site/`. See
  [`blog-site/README.md`](blog-site/README.md).
- **CV** — the `Alfred` repo's `cv-deploy.yml` builds the CV and publishes it into `gh-pages`
  under `cv/`. The CV source is never edited here.

Blog posts are authored as Markdown and normally added by Alfred's writing pipeline via a **reviewed
PR** (`Alfred/writing/` → `Alfred/routines/writing-publish.md`), which publishes the canonical copy
here before cross-posting elsewhere. The CV source is never edited here either — both the CV and the
blog treat this repo as a publish target.
