// Render the blog to static HTML. Art direction mirrors the CV: an Ubuntu-terminal skin
// (aubergine + orange, Ubuntu Mono), plain semantic HTML so posts are readable/indexable.
// Content is authored as Markdown in ../blog/posts/*.md; this module only lays it out.

export interface Post {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  tags: string[];
  canonical: string; // resolved canonical URL for this post
  draft: boolean;
  html: string; // rendered Markdown body
}

export interface SiteCtx {
  siteBase: string; // e.g. https://rgoussu-dev.github.io/CV-And-Blog
  blogBase: string; // e.g. https://rgoussu-dev.github.io/CV-And-Blog/blog
  author: string;
  blogTitle: string;
}

export const esc = (s: string): string =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

function fmtDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(y, m - 1, d),
  );
}

const PROMPT = `<span class="tok-p">❯</span> <span class="tok-path">~/blog</span>`;

/** depth 0 = blog index (/blog/), depth 1 = a post (/blog/<slug>/). */
function nav(depth: number, current: "blog" | "cv" | "home"): { head: string; foot: string; assets: string } {
  const up = "../".repeat(depth + 1); // from the blog subtree up to the site root
  const assets = (depth === 0 ? "./" : "../".repeat(depth)) + "assets/";
  const homeHref = up;
  const cvHref = `${up}cv/`;
  const blogHref = depth === 0 ? "./" : "../".repeat(depth);
  const link = (label: string, href: string, key: string) =>
    key === current
      ? `<a class="site-nav-link is-active" href="${esc(href)}" aria-current="page">${esc(label)}</a>`
      : `<a class="site-nav-link" href="${esc(href)}">${esc(label)}</a>`;
  const head = `<header class="site-header"><div class="site-header-inner">
      <a class="site-brand" href="${esc(homeHref)}" aria-label="rgoussu.dev — home"><span class="tok-p" aria-hidden="true">❯</span> <span class="site-brand-name">rgoussu.dev</span></a>
      <nav class="site-nav" aria-label="Primary">${link("blog", blogHref, "blog")}${link("cv", cvHref, "cv")}</nav>
    </div></header>`;
  const year = new Date().getFullYear();
  const foot = `<footer class="site-footer"><div class="site-footer-inner">
      <span class="site-copy">© ${year} Romain Goussu</span>
      <span class="site-built"><span class="tok-comment"># Built with care, love, and Claude.</span></span>
    </div></footer>`;
  return { head, foot, assets };
}

function shell(opts: {
  title: string;
  description: string;
  canonical?: string;
  bodyClass?: string;
  head: string;
  foot: string;
  assets: string;
  main: string;
  noindex?: boolean;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark light" />
  <title>${esc(opts.title)}</title>
  <meta name="description" content="${esc(opts.description)}" />
  ${opts.canonical ? `<link rel="canonical" href="${esc(opts.canonical)}" />` : ""}
  ${opts.noindex ? `<meta name="robots" content="noindex, nofollow" />` : ""}
  <meta property="og:title" content="${esc(opts.title)}" />
  <meta property="og:description" content="${esc(opts.description)}" />
  <meta property="og:type" content="article" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet" />
  <link rel="alternate" type="application/rss+xml" title="rgoussu.dev — blog" href="/CV-And-Blog/blog/feed.xml" />
  <link rel="stylesheet" href="${opts.assets}blog.css" />
</head>
<body class="${opts.bodyClass ?? ""}">
  ${opts.head}
  <main class="blog-page">${opts.main}</main>
  ${opts.foot}
</body>
</html>
`;
}

function tagChips(tags: string[]): string {
  if (!tags.length) return "";
  return `<cluster class="post-tags">${tags
    .map((t) => `<span class="post-tag">${esc(t)}</span>`)
    .join("")}</cluster>`;
}

export function renderIndex(posts: Post[], ctx: SiteCtx): string {
  const { head, foot, assets } = nav(0, "blog");
  const list = posts.length
    ? `<ul class="post-list">${posts
        .map(
          (p) => `<li class="post-item">
        <a class="post-link" href="${esc(p.slug)}/">
          <span class="post-item-date">${esc(fmtDate(p.date))}</span>
          <span class="post-item-title">${esc(p.title)}</span>
        </a>
        ${p.description ? `<p class="post-item-dek">${esc(p.description)}</p>` : ""}
        ${tagChips(p.tags)}
      </li>`,
        )
        .join("")}</ul>`
    : `<p class="post-empty"><span class="tok-comment"># No posts yet — the first article is on its way.</span></p>`;

  const main = `<div class="term">
      <div class="term-bar"><span class="term-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="term-title">romain@goussu: ~/blog</span></div>
      <div class="term-body">
        <div class="term-cmd">${PROMPT} <span class="tok-cmd">ls</span> <span class="tok-flag">-t</span> <span class="tok-file">posts/</span></div>
        <h1 class="blog-h1">${esc(ctx.blogTitle)}</h1>
        <p class="blog-lead"><span class="tok-comment"># Notes on things I've built, learned, and wrestled with.</span></p>
        ${list}
      </div>
    </div>`;
  return shell({
    title: `${ctx.blogTitle} — ${ctx.author}`,
    description: "Tech articles by Romain Goussu — things built, learned, and wrestled with.",
    canonical: `${ctx.blogBase}/`,
    bodyClass: "is-index",
    head,
    foot,
    assets,
    main,
  });
}

export function renderPost(post: Post, ctx: SiteCtx): string {
  const { head, foot, assets } = nav(1, "blog");
  const selfCanonical = `${ctx.blogBase}/${post.slug}/`;
  const main = `<article class="post">
      <div class="term">
        <div class="term-bar"><span class="term-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="term-title">romain@goussu: ~/blog/${esc(post.slug)}</span></div>
        <div class="term-body">
          <div class="term-cmd">${PROMPT} <span class="tok-cmd">cat</span> <span class="tok-file">${esc(post.slug)}.md</span></div>
          <header class="post-head">
            <h1 class="post-title">${esc(post.title)}</h1>
            ${post.description ? `<p class="post-dek">${esc(post.description)}</p>` : ""}
            <div class="post-meta"><span>${esc(fmtDate(post.date))}</span></div>
            ${tagChips(post.tags)}
          </header>
          <div class="post-body">${post.html}</div>
          <footer class="post-foot"><a class="post-back" href="../">${PROMPT} <span class="tok-cmd">cd</span> <span class="tok-path">..</span></a></footer>
        </div>
      </div>
    </article>`;
  return shell({
    title: `${post.title} — ${ctx.author}`,
    description: post.description || post.title,
    // A post authored here is canonical to itself unless front matter points elsewhere.
    canonical: post.canonical || selfCanonical,
    bodyClass: "is-post",
    head,
    foot,
    assets,
    main,
    noindex: post.draft,
  });
}

export function renderFeed(posts: Post[], ctx: SiteCtx): string {
  const items = posts
    .filter((p) => !p.draft)
    .slice(0, 20)
    .map((p) => {
      const link = `${ctx.blogBase}/${p.slug}/`;
      const pub = p.date ? new Date(`${p.date}T09:00:00Z`).toUTCString() : "";
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      ${pub ? `<pubDate>${pub}</pubDate>` : ""}
      <description>${esc(p.description || p.title)}</description>
    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(ctx.blogTitle)} — ${esc(ctx.author)}</title>
    <link>${esc(ctx.blogBase)}/</link>
    <description>Tech articles by ${esc(ctx.author)}.</description>
${items}
  </channel>
</rss>
`;
}
