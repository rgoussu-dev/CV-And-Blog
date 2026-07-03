# CV-And-Blog

The public site at **https://rgoussu-dev.github.io/CV-And-Blog/** — served from the `gh-pages`
branch via GitHub Pages.

| Path | What | Source |
|------|------|--------|
| `/` | Landing page (blog placeholder for now) | [`site/`](site/) in this repo |
| `/cv/` | The CV (EN + FR + PDFs) | Built & deployed from the private `Alfred` repo |

## How deployment works

`gh-pages` is assembled from two independent, non-colliding deploys — both use `keep_files: true`
so neither clobbers the other's subtree:

- **Landing page** — [`.github/workflows/deploy-landing.yml`](.github/workflows/deploy-landing.yml)
  publishes [`site/`](site/) to the `gh-pages` **root** on every push to `main` that touches
  `site/`. Edit `site/index.html` here and merge to `main` to update it.
- **CV** — the `Alfred` repo's `cv-deploy.yml` builds the CV and publishes it into `gh-pages`
  under `cv/`. The CV source is never edited here.

The blog is under construction; hand-written tech articles will grow out of the landing page over
time.
