// Client-side search over dist/search-index.json — no dependencies, substring scoring only.
// The index carries {t: title, d: description, y: type, g: [tags], m: theme, u: urlPath}.
(function () {
  "use strict";
  var box = document.querySelector("[data-search]");
  if (!box) return;
  var input = box.querySelector("input");
  var list = box.querySelector(".lib-search-results");
  var prefix = document.body.getAttribute("data-prefix") || "./";
  var index = null;
  var loading = false;

  function load() {
    if (index || loading) return;
    loading = true;
    fetch(prefix + "search-index.json")
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; run(); })
      .catch(function () { loading = false; });
  }

  function score(doc, q) {
    var s = 0;
    var title = doc.t.toLowerCase();
    if (title.indexOf(q) === 0) s += 4;
    else if (title.indexOf(q) >= 0) s += 3;
    if (doc.g.some(function (t) { return t.indexOf(q) >= 0; })) s += 2;
    if ((doc.d || "").toLowerCase().indexOf(q) >= 0) s += 1;
    if ((doc.m || "").toLowerCase().indexOf(q) >= 0) s += 1;
    return s;
  }

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function run() {
    var q = input.value.trim().toLowerCase();
    if (!q || !index) {
      list.hidden = true;
      list.innerHTML = "";
      return;
    }
    var hits = index
      .map(function (doc) { return { doc: doc, s: score(doc, q) }; })
      .filter(function (h) { return h.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 8);
    if (!hits.length) {
      list.innerHTML = '<li class="lib-search-empty">no matches on the shelves</li>';
      list.hidden = false;
      return;
    }
    list.innerHTML = hits
      .map(function (h) {
        return (
          '<li><a href="' + prefix + esc(h.doc.u) + '">' +
          '<span class="lib-search-title">' + esc(h.doc.t) + "</span>" +
          '<span class="lib-search-meta">' + esc(h.doc.y) + (h.doc.m ? " · " + esc(h.doc.m) : "") + "</span>" +
          "</a></li>"
        );
      })
      .join("");
    list.hidden = false;
  }

  input.addEventListener("focus", load);
  input.addEventListener("input", run);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { input.value = ""; run(); input.blur(); }
    if (e.key === "Enter") {
      var first = list.querySelector("a");
      if (first) first.click();
    }
  });
  document.addEventListener("click", function (e) {
    if (!box.contains(e.target)) { list.hidden = true; }
  });
})();
