var h = Object.defineProperty;
var c = (s, t, e) => t in s ? h(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var n = (s, t, e) => c(s, typeof t != "symbol" ? t + "" : t, e);
const o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
class i extends HTMLElement {
  applyInstanceStyles() {
  }
  connectedCallback() {
    this.setAttribute("data-role", "layout");
    const t = this.localName;
    if (!o.has(t)) {
      o.add(t);
      const e = document.createElement("style");
      e.dataset.pkComponent = t, e.textContent = this.structuralCss(), document.head.appendChild(e);
    }
    this.applyInstanceStyles();
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(t, e, r) {
    this.isConnected && this.applyInstanceStyles();
  }
  static ensureDynamicStyle(t, e) {
    if (l.has(t)) return;
    l.add(t);
    const r = document.createElement("style");
    r.dataset.pkDyn = t, r.textContent = e(), document.head.appendChild(r);
  }
}
class u extends i {
  structuralCss() {
    return `
            box-pk {
                display: inline-block;
                box-sizing: border-box;
                padding: var(--box-padding, var(--s1));
                border-style: solid;
                border-width: var(--box-border-width, 0);
                border-color: var(--box-border-color, transparent);
                border-radius: var(--box-border-radius, 0);
                color: var(--box-color, inherit);
                background-color: var(--box-bg-color, transparent);
                box-shadow: var(--box-shadow, none);
            }
        `;
  }
  applyInstanceStyles() {
    this.style.setProperty("--box-padding", this.padding), this.style.setProperty("--box-border-width", this.borderWidth === "none" ? "0" : this.borderWidth), this.style.setProperty("--box-border-color", this.borderColor), this.style.setProperty("--box-border-radius", this.borderRadius), this.style.setProperty("--box-color", this.color), this.style.setProperty("--box-bg-color", this.backgroundColor), this.style.setProperty("--box-shadow", this.boxShadow || "none");
  }
  get padding() {
    return this.getAttribute("padding") || "var(--s1)";
  }
  set padding(t) {
    this.setAttribute("padding", t);
  }
  get borderWidth() {
    return this.getAttribute("borderWidth") || "none";
  }
  set borderWidth(t) {
    this.setAttribute("borderWidth", t);
  }
  get borderColor() {
    return this.getAttribute("borderColor") || "#000";
  }
  set borderColor(t) {
    this.setAttribute("borderColor", t);
  }
  get borderRadius() {
    return this.getAttribute("borderRadius") || "0";
  }
  set borderRadius(t) {
    this.setAttribute("borderRadius", t);
  }
  get color() {
    return this.getAttribute("color") || "inherit";
  }
  set color(t) {
    this.setAttribute("color", t);
  }
  get backgroundColor() {
    return this.getAttribute("backgroundColor") || "transparent";
  }
  set backgroundColor(t) {
    this.setAttribute("backgroundColor", t);
  }
  get boxShadow() {
    return this.getAttribute("shadow") || "";
  }
  set boxShadow(t) {
    this.setAttribute("shadow", t);
  }
  static get observedAttributes() {
    return ["padding", "borderWidth", "borderColor", "borderRadius", "color", "backgroundColor", "shadow"];
  }
}
"customElements" in window && !customElements.get("box-pk") && customElements.define("box-pk", u);
class p extends i {
  structuralCss() {
    return `
            center-pk {
                display: block;
                box-sizing: content-box;
                margin-inline-start: auto;
                margin-inline-end: auto;
                max-inline-size: var(--center-max-width, var(--measure));
                padding-inline-start: var(--center-gutter, 0);
                padding-inline-end: var(--center-gutter, 0);
            }
            center-pk[alignText] { text-align: center; }
            center-pk[intrinsic] {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `;
  }
  applyInstanceStyles() {
    this.style.setProperty("--center-max-width", this.maxWidth), this.style.setProperty("--center-gutter", this.gutters || "0");
  }
  get maxWidth() {
    return this.getAttribute("maxWidth") || "var(--measure)";
  }
  set maxWidth(t) {
    this.setAttribute("maxWidth", t);
  }
  get alignText() {
    return this.hasAttribute("alignText");
  }
  set alignText(t) {
    t ? this.setAttribute("alignText", "") : this.removeAttribute("alignText");
  }
  get gutters() {
    return this.getAttribute("gutters");
  }
  set gutters(t) {
    t ? this.setAttribute("gutters", t) : this.removeAttribute("gutters");
  }
  get intrinsic() {
    return this.hasAttribute("intrinsic");
  }
  set intrinsic(t) {
    t ? this.setAttribute("intrinsic", "") : this.removeAttribute("intrinsic");
  }
  static get observedAttributes() {
    return ["maxWidth", "alignText", "gutters", "intrinsic"];
  }
}
"customElements" in window && !customElements.get("center-pk") && customElements.define("center-pk", p);
class d extends i {
  structuralCss() {
    return `
            cluster-pk {
                display: flex;
                flex-wrap: wrap;
                gap: var(--cluster-gap, var(--s1));
                justify-content: var(--cluster-justify, flex-start);
                align-items: var(--cluster-align, flex-start);
            }
        `;
  }
  applyInstanceStyles() {
    this.style.setProperty("--cluster-gap", this.space), this.style.setProperty("--cluster-justify", this.justify), this.style.setProperty("--cluster-align", this.align);
  }
  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }
  set space(t) {
    this.setAttribute("space", t);
  }
  get justify() {
    return this.getAttribute("justify") || "flex-start";
  }
  set justify(t) {
    this.setAttribute("justify", t);
  }
  get align() {
    return this.getAttribute("align") || "flex-start";
  }
  set align(t) {
    this.setAttribute("align", t);
  }
  static get observedAttributes() {
    return ["space", "justify", "align"];
  }
}
"customElements" in window && !customElements.get("cluster-pk") && customElements.define("cluster-pk", d);
class g extends i {
  structuralCss() {
    return `
            container-pk {
                display: block;
                container-type: inline-size;
            }
        `;
  }
  applyInstanceStyles() {
    this.name ? this.style.setProperty("container-name", this.name) : this.style.removeProperty("container-name");
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(t) {
    t ? this.setAttribute("name", t) : this.removeAttribute("name");
  }
  static get observedAttributes() {
    return ["name"];
  }
}
"customElements" in window && !customElements.get("container-pk") && customElements.define("container-pk", g);
class b extends i {
  structuralCss() {
    return `
            cover-pk {
                display: flex;
                flex-direction: column;
                min-block-size: var(--cover-min-height, 100vh);
                padding: var(--cover-padding, var(--s1));
            }
            cover-pk[noPad] { padding: 0; }
            cover-pk > * { margin-block: var(--cover-space, var(--s0)); }
            cover-pk > [data-pk-centered],
            cover-pk > [slot="centered"] { margin-block: auto; }
            cover-pk > :first-child:not([data-pk-centered]):not([slot="centered"]) { margin-block-start: 0; }
            cover-pk > :last-child:not([data-pk-centered]):not([slot="centered"]) { margin-block-end: 0; }
        `;
  }
  applyInstanceStyles() {
    this.style.setProperty("--cover-min-height", this.minHeight || "100vh"), this.style.setProperty("--cover-space", this.space || "var(--s0)"), this.style.setProperty("--cover-padding", this.space || "var(--s1)");
  }
  get space() {
    return this.getAttribute("space") || void 0;
  }
  set space(t) {
    t === void 0 ? this.removeAttribute("space") : this.setAttribute("space", t);
  }
  get minHeight() {
    return this.getAttribute("minHeight") || void 0;
  }
  set minHeight(t) {
    t === void 0 ? this.removeAttribute("minHeight") : this.setAttribute("minHeight", t);
  }
  get noPad() {
    return this.hasAttribute("noPad");
  }
  set noPad(t) {
    t ? this.setAttribute("noPad", "") : this.removeAttribute("noPad");
  }
  static get observedAttributes() {
    return ["space", "minHeight", "noPad"];
  }
}
"customElements" in window && !customElements.get("cover-pk") && customElements.define("cover-pk", b);
class m extends i {
  structuralCss() {
    return `
            frame-pk {
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                aspect-ratio: var(--frame-n) / var(--frame-d);
            }
            frame-pk > img,
            frame-pk > video {
                inline-size: 100%;
                block-size: 100%;
                object-fit: cover;
            }
        `;
  }
  applyInstanceStyles() {
    const [t, e] = this.parseRatio(this.ratio);
    this.style.setProperty("--frame-n", t.toString()), this.style.setProperty("--frame-d", e.toString());
  }
  parseRatio(t) {
    const e = t.split(":");
    if (e.length === 2 && e[0] && e[1]) {
      const r = parseInt(e[0], 10), a = parseInt(e[1], 10);
      if (!isNaN(r) && !isNaN(a) && a !== 0) return [r, a];
    }
    return [16, 9];
  }
  get ratio() {
    return this.getAttribute("ratio") || "16:9";
  }
  set ratio(t) {
    this.setAttribute("ratio", t);
  }
  static get observedAttributes() {
    return ["ratio"];
  }
}
"customElements" in window && !customElements.get("frame-pk") && customElements.define("frame-pk", m);
class y extends i {
  structuralCss() {
    return `
            grid-pk {
                display: grid;
                grid-gap: var(--grid-space, var(--s1));
                align-items: var(--grid-align, stretch);
                justify-content: var(--grid-justify, stretch);
            }
            @supports (width: min(var(--grid-min, 250px), 100%)) {
                grid-pk {
                    grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min, 250px), 100%), 1fr));
                }
            }
        `;
  }
  applyInstanceStyles() {
    this.style.setProperty("--grid-min", this.min), this.style.setProperty("--grid-space", this.space), this.style.setProperty("--grid-align", this.align || "stretch"), this.style.setProperty("--grid-justify", this.justify || "stretch");
  }
  get min() {
    return this.getAttribute("min") || "250px";
  }
  set min(t) {
    this.setAttribute("min", t);
  }
  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }
  set space(t) {
    this.setAttribute("space", t);
  }
  get align() {
    return this.getAttribute("align") || "";
  }
  set align(t) {
    this.setAttribute("align", t);
  }
  get justify() {
    return this.getAttribute("justify") || "";
  }
  set justify(t) {
    this.setAttribute("justify", t);
  }
  static get observedAttributes() {
    return ["min", "space", "align", "justify"];
  }
}
"customElements" in window && !customElements.get("grid-pk") && customElements.define("grid-pk", y);
class f extends i {
  structuralCss() {
    return `
            icon-pk { display: inline-flex; align-items: baseline; }
            icon-pk > svg {
                width: 0.75em;
                width: 1cap;
                height: 0.75em;
                height: 1cap;
                margin-inline-end: var(--icon-space, 0);
            }
        `;
  }
  applyInstanceStyles() {
    this.style.setProperty("--icon-space", this.space || "0"), this.label ? (this.setAttribute("role", "img"), this.setAttribute("aria-label", this.label)) : (this.removeAttribute("role"), this.removeAttribute("aria-label"));
  }
  get space() {
    return this.getAttribute("space");
  }
  set space(t) {
    t ? this.setAttribute("space", t) : this.removeAttribute("space");
  }
  get label() {
    return this.getAttribute("label");
  }
  set label(t) {
    t ? this.setAttribute("label", t) : this.removeAttribute("label");
  }
  static get observedAttributes() {
    return ["space", "label"];
  }
}
"customElements" in window && !customElements.get("icon-pk") && customElements.define("icon-pk", f);
class v extends i {
  structuralCss() {
    return `
            imposter-pk {
                position: var(--imposter-position, absolute);
                inset-block-start: 50%;
                inset-inline-start: 50%;
                transform: translate(-50%, -50%);
            }
            imposter-pk:not([breakout]) {
                overflow: auto;
                max-inline-size: calc(100% - (var(--imposter-margin, 0) * 2));
                max-block-size: calc(100% - (var(--imposter-margin, 0) * 2));
            }
        `;
  }
  applyInstanceStyles() {
    this.style.setProperty("--imposter-position", this.fixed ? "fixed" : "absolute"), this.style.setProperty("--imposter-margin", this.margin);
  }
  get breakout() {
    return this.hasAttribute("breakout");
  }
  set breakout(t) {
    t ? this.setAttribute("breakout", "") : this.removeAttribute("breakout");
  }
  get margin() {
    return this.getAttribute("margin") || "0";
  }
  set margin(t) {
    this.setAttribute("margin", t);
  }
  get fixed() {
    return this.hasAttribute("fixed");
  }
  set fixed(t) {
    t ? this.setAttribute("fixed", "") : this.removeAttribute("fixed");
  }
  static get observedAttributes() {
    return ["breakout", "margin", "fixed"];
  }
}
"customElements" in window && !customElements.get("imposter-pk") && customElements.define("imposter-pk", v);
class A extends i {
  constructor() {
    super(...arguments);
    n(this, "resizeObserver");
    n(this, "mutationObserver");
    n(this, "toggleOverflowClass", () => {
      this.classList.toggle("overflowing", this.scrollWidth > this.clientWidth);
    });
  }
  structuralCss() {
    return `
            reel-pk {
                display: flex;
                block-size: var(--reel-height, auto);
                overflow-x: auto;
                overflow-y: hidden;
            }
            reel-pk:not([noBar]) { scrollbar-color: #fff #000; }
            reel-pk:not([noBar])::-webkit-scrollbar { block-size: 1rem; }
            reel-pk:not([noBar])::-webkit-scrollbar-track { background-color: #000; }
            reel-pk:not([noBar])::-webkit-scrollbar-thumb {
                background-color: #000;
                background-image: linear-gradient(#000 0, #000 0.25rem, #fff 0.25rem, #fff 0.75rem, #000 0.75rem);
            }
            reel-pk[noBar]::-webkit-scrollbar { display: none; }
            reel-pk[noBar] { -ms-overflow-style: none; scrollbar-width: none; }
            reel-pk > * {
                flex: 0 0 var(--reel-item-width, auto);
                margin-inline-start: var(--reel-space, var(--s0));
            }
            reel-pk > :first-child { margin-inline-start: 0; }
            reel-pk > img { block-size: 100%; flex-basis: auto; width: auto; }
            reel-pk.overflowing:not([noBar]) { padding-block-end: 1rem; }
        `;
  }
  applyInstanceStyles() {
    this.style.setProperty("--reel-item-width", this.itemWidth), this.style.setProperty("--reel-space", this.space), this.style.setProperty("--reel-height", this.height);
  }
  connectedCallback() {
    super.connectedCallback(), "ResizeObserver" in window && (this.resizeObserver = new ResizeObserver(this.toggleOverflowClass), this.resizeObserver.observe(this)), "MutationObserver" in window && (this.mutationObserver = new MutationObserver(this.toggleOverflowClass), this.mutationObserver.observe(this, { childList: !0 })), this.toggleOverflowClass();
  }
  disconnectedCallback() {
    var e, r;
    super.disconnectedCallback(), (e = this.resizeObserver) == null || e.disconnect(), (r = this.mutationObserver) == null || r.disconnect();
  }
  get itemWidth() {
    return this.getAttribute("itemWidth") || "auto";
  }
  set itemWidth(e) {
    this.setAttribute("itemWidth", e);
  }
  get space() {
    return this.getAttribute("space") || "var(--s0)";
  }
  set space(e) {
    this.setAttribute("space", e);
  }
  get height() {
    return this.getAttribute("height") || "auto";
  }
  set height(e) {
    this.setAttribute("height", e);
  }
  get noBar() {
    return this.hasAttribute("noBar");
  }
  set noBar(e) {
    e ? this.setAttribute("noBar", "") : this.removeAttribute("noBar");
  }
  static get observedAttributes() {
    return ["itemWidth", "space", "height", "noBar"];
  }
}
"customElements" in window && !customElements.get("reel-pk") && customElements.define("reel-pk", A);
class k extends i {
  structuralCss() {
    return `
            sidebar-pk {
                display: flex;
                flex-wrap: wrap;
                gap: var(--sidebar-space, var(--s2));
                align-items: stretch;
            }
            sidebar-pk[noStretch] { align-items: flex-start; }

            sidebar-pk:not([side="right"]) > :first-child {
                flex-grow: 1;
                flex-basis: var(--sidebar-side-basis, 0);
                min-inline-size: auto;
            }
            sidebar-pk:not([side="right"]) > :last-child {
                flex-grow: 999;
                flex-basis: 0;
                min-inline-size: var(--sidebar-content-min, 50%);
            }

            sidebar-pk[side="right"] > :first-child {
                flex-grow: 999;
                flex-basis: 0;
                min-inline-size: var(--sidebar-content-min, 50%);
            }
            sidebar-pk[side="right"] > :last-child {
                flex-grow: 1;
                flex-basis: var(--sidebar-side-basis, 0);
                min-inline-size: auto;
            }
        `;
  }
  applyInstanceStyles() {
    this.style.setProperty("--sidebar-space", this.space), this.style.setProperty("--sidebar-side-basis", this.sideWidth || "0"), this.contentWidth ? this.style.setProperty("--sidebar-content-min", this.contentWidth) : this.style.removeProperty("--sidebar-content-min");
  }
  get side() {
    return this.getAttribute("side") || "left";
  }
  set side(t) {
    this.setAttribute("side", t);
  }
  get sideWidth() {
    return this.getAttribute("sideWidth") || "250px";
  }
  set sideWidth(t) {
    this.setAttribute("sideWidth", t);
  }
  get contentWidth() {
    return this.getAttribute("contentWidth") || "";
  }
  set contentWidth(t) {
    this.setAttribute("contentWidth", t);
  }
  get space() {
    return this.getAttribute("space") || "var(--s2)";
  }
  set space(t) {
    this.setAttribute("space", t);
  }
  get noStretch() {
    return this.hasAttribute("noStretch");
  }
  set noStretch(t) {
    t ? this.setAttribute("noStretch", "") : this.removeAttribute("noStretch");
  }
  static get observedAttributes() {
    return ["side", "sideWidth", "contentWidth", "space", "noStretch"];
  }
}
"customElements" in window && !customElements.get("sidebar-pk") && customElements.define("sidebar-pk", k);
class x extends i {
  structuralCss() {
    return `
            stack-pk { display: block; }
            stack-pk > * + * { margin-block-start: var(--stack-space, var(--s1)); }
            stack-pk[recursive] * + * { margin-block-start: var(--stack-space, var(--s1)); }
            stack-pk[splitAfter]:only-child { block-size: 100%; }
        `;
  }
  applyInstanceStyles() {
    if (this.style.setProperty("--stack-space", this.space), this.splitAfter) {
      this.dataset.pkSplit = this.splitAfter;
      const t = this.splitAfter;
      i.ensureDynamicStyle(
        `stack-split-${t}`,
        () => `stack-pk[data-pk-split="${t}"] > :nth-child(${t}) { margin-block-end: auto; }`
      );
    } else
      delete this.dataset.pkSplit;
  }
  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }
  set space(t) {
    this.setAttribute("space", t);
  }
  get recursive() {
    return this.hasAttribute("recursive");
  }
  set recursive(t) {
    t ? this.setAttribute("recursive", "") : this.removeAttribute("recursive");
  }
  get splitAfter() {
    return this.getAttribute("splitAfter") || "";
  }
  set splitAfter(t) {
    this.setAttribute("splitAfter", t);
  }
  static get observedAttributes() {
    return ["space", "recursive", "splitAfter"];
  }
}
"customElements" in window && !customElements.get("stack-pk") && customElements.define("stack-pk", x);
class w extends i {
  structuralCss() {
    return `
            switcher-pk {
                display: flex;
                flex-wrap: wrap;
                gap: var(--switcher-space, var(--s1));
            }
            switcher-pk > * {
                flex-grow: 1;
                flex-basis: calc((var(--switcher-threshold, var(--measure)) - 100%) * 999);
            }
        `;
  }
  applyInstanceStyles() {
    if (this.style.setProperty("--switcher-threshold", this.threshold), this.style.setProperty("--switcher-space", this.space), this.limit !== void 0) {
      const t = this.limit;
      this.dataset.pkLimit = t.toString(), i.ensureDynamicStyle(
        `switcher-limit-${t}`,
        () => `switcher-pk[data-pk-limit="${t}"] > :nth-last-child(n + ${t + 1}),
                 switcher-pk[data-pk-limit="${t}"] > :nth-last-child(n + ${t + 1}) ~ * {
                    flex-basis: 100%;
                 }`
      );
    } else
      delete this.dataset.pkLimit;
  }
  get threshold() {
    return this.getAttribute("threshold") || "var(--measure)";
  }
  set threshold(t) {
    this.setAttribute("threshold", t);
  }
  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }
  set space(t) {
    this.setAttribute("space", t);
  }
  get limit() {
    return this.hasAttribute("limit") ? parseInt(this.getAttribute("limit") || "0") : void 0;
  }
  set limit(t) {
    this.setAttribute("limit", t.toString());
  }
  static get observedAttributes() {
    return ["threshold", "space", "limit"];
  }
}
"customElements" in window && !customElements.get("switcher-pk") && customElements.define("switcher-pk", w);
class S extends i {
  structuralCss() {
    return `
            typography-pk {
                display: block;
                font-family: var(--typo-font-family, inherit);
                font-size: var(--typo-font-size, inherit);
                font-weight: var(--typo-font-weight, normal);
                font-style: var(--typo-font-style, normal);
                line-height: var(--typo-line-height, inherit);
                letter-spacing: var(--typo-letter-spacing, normal);
                text-align: var(--typo-text-align, inherit);
                text-transform: var(--typo-text-transform, none);
                text-decoration: var(--typo-text-decoration, none);
                color: var(--typo-color, inherit);
            }
            typography-pk[variant="heading-1"] {
                --typo-font-size: var(--s4);
                --typo-font-weight: bold;
                --typo-line-height: 1.1;
                --typo-letter-spacing: -0.025em;
            }
            typography-pk[variant="heading-2"] {
                --typo-font-size: var(--s3);
                --typo-font-weight: bold;
                --typo-line-height: 1.2;
                --typo-letter-spacing: -0.02em;
            }
            typography-pk[variant="heading-3"] {
                --typo-font-size: var(--s2);
                --typo-font-weight: 600;
                --typo-line-height: 1.3;
                --typo-letter-spacing: -0.01em;
            }
            typography-pk[variant="body"] {
                --typo-font-size: var(--s0);
                --typo-line-height: 1.6;
            }
            typography-pk[variant="caption"] {
                --typo-font-size: var(--s-1);
                --typo-line-height: 1.4;
                --typo-letter-spacing: 0.01em;
            }
            typography-pk[variant="small"] {
                --typo-font-size: var(--s-2);
                --typo-line-height: 1.3;
                --typo-letter-spacing: 0.02em;
            }
        `;
  }
  applyInstanceStyles() {
    const t = [
      ["--typo-font-family", this.fontFamily],
      ["--typo-font-size", this.fontSize],
      ["--typo-font-weight", this.fontWeight],
      ["--typo-font-style", this.fontStyle],
      ["--typo-line-height", this.lineHeight],
      ["--typo-letter-spacing", this.letterSpacing],
      ["--typo-text-align", this.textAlign],
      ["--typo-text-transform", this.textTransform],
      ["--typo-text-decoration", this.textDecoration],
      ["--typo-color", this.color]
    ];
    for (const [e, r] of t)
      r ? this.style.setProperty(e, r) : this.style.removeProperty(e);
  }
  get fontFamily() {
    return this.getAttribute("fontFamily") || "";
  }
  set fontFamily(t) {
    this.setAttribute("fontFamily", t);
  }
  get fontSize() {
    return this.getAttribute("fontSize") || "";
  }
  set fontSize(t) {
    this.setAttribute("fontSize", t);
  }
  get fontWeight() {
    return this.getAttribute("fontWeight") || "";
  }
  set fontWeight(t) {
    this.setAttribute("fontWeight", t);
  }
  get fontStyle() {
    return this.getAttribute("fontStyle") || "";
  }
  set fontStyle(t) {
    this.setAttribute("fontStyle", t);
  }
  get lineHeight() {
    return this.getAttribute("lineHeight") || "";
  }
  set lineHeight(t) {
    this.setAttribute("lineHeight", t);
  }
  get letterSpacing() {
    return this.getAttribute("letterSpacing") || "";
  }
  set letterSpacing(t) {
    this.setAttribute("letterSpacing", t);
  }
  get textAlign() {
    return this.getAttribute("textAlign") || "";
  }
  set textAlign(t) {
    this.setAttribute("textAlign", t);
  }
  get textTransform() {
    return this.getAttribute("textTransform") || "";
  }
  set textTransform(t) {
    this.setAttribute("textTransform", t);
  }
  get textDecoration() {
    return this.getAttribute("textDecoration") || "";
  }
  set textDecoration(t) {
    this.setAttribute("textDecoration", t);
  }
  get color() {
    return this.getAttribute("color") || "";
  }
  set color(t) {
    this.setAttribute("color", t);
  }
  get variant() {
    return this.getAttribute("variant") || "";
  }
  set variant(t) {
    this.setAttribute("variant", t);
  }
  static get observedAttributes() {
    return ["fontFamily", "fontSize", "fontWeight", "fontStyle", "lineHeight", "letterSpacing", "textAlign", "textTransform", "textDecoration", "color", "variant"];
  }
}
"customElements" in window && !customElements.get("typography-pk") && customElements.define("typography-pk", S);
export {
  i as LayoutElementPk
};
