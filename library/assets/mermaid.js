// Client-side Mermaid rendering for <pre class="mermaid"> blocks emitted by src/markdown.ts.
// The mermaid bundle (~2.5 MB) is vendored at assets/mermaid.min.js but only fetched here,
// on demand, when the page actually contains a diagram — every other page pays nothing.
// Without JS (or if the bundle fails to load) the raw diagram source stays readable.
(function () {
  "use strict";
  var nodes = document.querySelectorAll("pre.mermaid");
  if (!nodes.length) return;
  var prefix = document.body.getAttribute("data-prefix") || "./";

  var script = document.createElement("script");
  script.src = prefix + "assets/mermaid.min.js";
  script.onload = function () {
    var light = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    var styles = getComputedStyle(document.documentElement);
    window.mermaid.initialize({
      startOnLoad: false,
      theme: light ? "neutral" : "dark",
      fontFamily: styles.getPropertyValue("--font-mono") || "monospace",
      themeVariables: {
        // Blend with the Ubuntu terminal palette (kb-site/theme.css).
        primaryColor: light ? "#fbf6f8" : "#3a1030",
        primaryBorderColor: styles.getPropertyValue("--cv-neon") || "#e95420",
        lineColor: styles.getPropertyValue("--cv-muted") || "#c9b3c1",
      },
    });
    window.mermaid.run({ nodes: nodes });
  };
  document.head.appendChild(script);
})();
