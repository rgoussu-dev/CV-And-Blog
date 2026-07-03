// Preview the built blog at http://127.0.0.1:4174/blog/ (mirrors the /blog/ deploy path).
// Run `npm run build` first (or `npm run dev`).
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, "..", "dist");
const PORT = 4174;
const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

const server = createServer((req, res) => {
  // Served under /blog/ in production; strip that prefix for local preview.
  let path = decodeURIComponent((req.url || "/").split("?")[0]).replace(/^\/blog/, "");
  if (path === "" || path === "/") path = "/index.html";
  let file = join(distDir, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`blog preview → http://127.0.0.1:${PORT}/blog/`);
});
