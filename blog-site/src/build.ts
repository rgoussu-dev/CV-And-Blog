// Build the static blog into blog-site/dist/.
//
//   dist/index.html          the blog index (posts newest-first)
//   dist/<slug>/index.html   one page per post in ../blog/posts/*.md
//   dist/feed.xml            RSS 2.0 feed
//   dist/assets/blog.css     the Ubuntu-terminal theme (shared look with the CV)
//
// The deploy workflow publishes dist/ into the gh-pages branch under /blog/ (keep_files:true),
// so the site root landing page and the /cv/ subtree are preserved.
//
// CLI flags:
//   --drafts   include posts with draft:true (built noindex; skipped by the public deploy)
import {
  mkdirSync,
  writeFileSync,
  readdirSync,
  readFileSync,
  rmSync,
  existsSync,
  copyFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { renderIndex, renderPost, renderFeed, type Post, type SiteCtx } from "./render.js";

const here = dirname(fileURLToPath(import.meta.url));
const blogSiteDir = resolve(here, "..");
const repoRoot = resolve(blogSiteDir, "..");
const postsDir = join(repoRoot, "blog", "posts");
const distDir = join(blogSiteDir, "dist");
const assetsDir = join(distDir, "assets");
const themeSrc = join(blogSiteDir, "src", "theme.css");

const SITE = (process.env.BLOG_BASE_URL || "https://rgoussu-dev.github.io/CV-And-Blog").replace(
  /\/+$/,
  "",
);
const ctx: SiteCtx = {
  siteBase: SITE,
  blogBase: `${SITE}/blog`,
  author: "Romain Goussu",
  blogTitle: "blog",
};

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

function loadPosts(includeDrafts: boolean): Post[] {
  if (!existsSync(postsDir)) return [];
  const files = readdirSync(postsDir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  const posts: Post[] = [];
  for (const f of files) {
    const { data, content } = matter(readFileSync(join(postsDir, f), "utf8"));
    const draft = Boolean(data.draft);
    if (draft && !includeDrafts) continue;
    const slug = String(data.slug || f.replace(/\.md$/, ""));
    posts.push({
      slug,
      title: String(data.title || slug),
      date: String(data.date || ""),
      description: String(data.description || ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      // A post authored on the blog is canonical to itself; front matter `canonical` can override
      // (e.g. if the piece originated elsewhere). Empty string in front matter = self-canonical.
      canonical: data.canonical ? String(data.canonical) : `${ctx.blogBase}/${slug}/`,
      draft,
      html: md.render(content),
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // newest first
  return posts;
}

function main(): void {
  const includeDrafts = process.argv.includes("--drafts");
  const posts = loadPosts(includeDrafts);

  if (existsSync(distDir)) rmSync(distDir, { recursive: true });
  mkdirSync(assetsDir, { recursive: true });

  if (!existsSync(themeSrc)) throw new Error(`Missing theme: ${themeSrc}`);
  copyFileSync(themeSrc, join(assetsDir, "blog.css"));

  writeFileSync(join(distDir, "index.html"), renderIndex(posts, ctx), "utf8");
  for (const p of posts) {
    const dir = join(distDir, p.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), renderPost(p, ctx), "utf8");
    console.log(`✓ blog/${p.slug}/index.html${p.draft ? "  (draft, noindex)" : ""}`);
  }
  writeFileSync(join(distDir, "feed.xml"), renderFeed(posts, ctx), "utf8");
  writeFileSync(join(distDir, ".nojekyll"), "", "utf8");

  console.log(`\nBuilt ${posts.length} post(s) + index + feed → ${distDir}`);
}

main();
