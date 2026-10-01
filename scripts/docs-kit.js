/**
 * Kit da documentação — transforma os dados de components/<id>/<id>.docs.js em tabs.
 *
 * O arquivo de docs é só dados (carrega mesmo sem este kit, ex.: no smoke test):
 *   CDS.docs = CDS.docs || {};
 *   CDS.docs["credit-card-input"] = {
 *     tag: "cds-credit-card-input",       // componente usado nos exemplos
 *     base: { label: "…" },               // atributos comuns a todos os exemplos
 *     source: "https://figma…",           // frame [Documentação] no Figma
 *     tabs: [{ id: "uso", title: "Uso", blocks: [ { h2: "Sobre" }, { p: "…" }, … ] }]
 *   };
 *
 * Blocos (uma chave por objeto):
 *   h2 · h3 · p · ul · ol · note           texto (`código` vira <code>)
 *   cards: [[título, texto], …]           grade de princípios
 *   display: { attrs, live }              caixa de exibição com um exemplo
 *   compare: [{ title, attrs | empty }]   exemplos lado a lado
 *   anatomy: { attrs, markers: [{ n, target, side }], legend: [...] }
 *   props: [{ name, type, icon, nested: [{ name, type, values }] }]
 *   specimens: { title, min, items: [{ label, attrs }] }   min = largura mínima da coluna
 *   guides: [{ attrs, title, text }]
 *   dodont: [{ kind: "do"|"dont", attrs, text, style }]
 *   table: { head: [...], rows: [[...]] }
 *   specs: [{ title, rows: [[rótulo, valor], …] }]   cards de ficha técnica (ex.: Motion Style por interação)
 *
 * Exemplos estáticos ficam com `inert` (sem hover, foco ou tab); `live: true` os deixa interativos.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  // Tipo de propriedade do Figma → Appearance do Tag (como no .Prop-type da doc)
  var PROP_TYPE = { "Swap component": "warning", "Variant": "informative", "Boolean": "positive", "Text": "accent" };

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  /** Texto com `código` → <code>; o resto é escapado. */
  function rich(n, s){
    String(s).split(/(`[^`]+`)/).forEach(function(part){
      if (/^`[^`]+`$/.test(part)){
        // <wbr> depois de / e - : tokens longos quebram nos separadores, não no meio da palavra
        var c = el("code");
        part.slice(1, -1).split(/(?<=[^\/-][\/-])/).forEach(function(seg, i){ if (i) c.appendChild(document.createElement("wbr")); c.appendChild(document.createTextNode(seg)); });
        n.appendChild(c);
      }
      else if (part) n.appendChild(document.createTextNode(part));
    });
    return n;
  }
  function list(tag, items){
    var l = el(tag, "pg-doc-list");
    items.forEach(function(t){ l.appendChild(rich(el("li"), t)); });
    return l;
  }

  function example(doc, attrs, live){
    var c = document.createElement(doc.tag), all = Object.assign({}, doc.base || {}, attrs || {});
    Object.keys(all).forEach(function(k){
      var v = all[k];
      if (v == null) return;
      c.setAttribute(k, v === true ? "" : v === false ? "false" : v); // false → "false" (booleans do Figma ligados por padrão)
    });
    if (!live) c.inert = true;
    return c;
  }
  function display(child, cls){
    var d = el("div", "pg-doc-display" + (cls ? " " + cls : ""));
    if (child) d.appendChild(child);
    return d;
  }

  // ---------- Anatomia: marcadores numerados ligados às partes reais do componente ----------
  function anatomy(doc, b){
    var wrap = el("div", "pg-doc-anatomy");
    var stage = display(null, "pg-doc-display--anatomy");
    var cmp = example(doc, b.attrs, false);
    cmp.style.flex = "0 0 auto"; // sem encolher como item flex: a medida é a largura natural
    stage.appendChild(cmp);
    var marks = b.markers.map(function(m){
      var mk = el("span", "pg-doc-mark pg-doc-mark--" + m.side);
      mk.setAttribute("aria-hidden", "true");
      mk.appendChild(el("span", "pg-doc-mark__n", String(m.n)));
      mk.appendChild(el("span", "pg-doc-mark__line"));
      stage.appendChild(mk);
      return { m: m, el: mk };
    });
    // Normal: número + seta (76px por lado). Sem esse espaço (telas estreitas), o diagrama encolhe
    // por escala e o número fica colado na parte, sem seta (32px por lado).
    var SIDE = 76, SIDE_COMPACT = 32;
    function place(){
      cmp.style.transform = ""; cmp.style.maxWidth = "none"; // mede a largura natural do componente
      var W = cmp.offsetWidth;
      // decide pela largura total (o padding muda com a classe; medir por ele faria a decisão oscilar)
      var compact = stage.clientWidth - 48 < W + 2 * SIDE, avail = stage.clientWidth - 16;
      stage.classList.toggle("is-compact", compact);
      if (compact) cmp.style.transform = "scale(" + Math.min(1, (avail - 2 * SIDE_COMPACT) / W).toFixed(3) + ")";
      else cmp.style.maxWidth = "";
      var s = stage.getBoundingClientRect(), gap = compact ? 4 : 8;
      marks.forEach(function(x){
        var t = cmp.querySelector(x.m.target), mk = x.el;
        if (!t){ mk.hidden = true; return; }
        var r = t.getBoundingClientRect();
        mk.hidden = false; mk.style.left = mk.style.top = mk.style.right = "";
        if (x.m.side === "left"){ mk.style.right = (s.right - r.left + gap) + "px"; mk.style.top = (r.top - s.top + r.height / 2) + "px"; }
        else if (x.m.side === "right"){ mk.style.left = (r.right - s.left + gap) + "px"; mk.style.top = (r.top - s.top + r.height / 2) + "px"; }
        else { mk.style.left = (r.left - s.left + Math.min(r.width / 2, 56)) + "px"; mk.style.top = (r.bottom - s.top + gap) + "px"; }
      });
    }
    requestAnimationFrame(function(){ requestAnimationFrame(place); });
    if (window.ResizeObserver) new ResizeObserver(place).observe(stage, { box: "border-box" });
    wrap.appendChild(stage);
    wrap.appendChild(list("ol", b.legend));
    return wrap;
  }

  function props(items){
    var box = el("div", "pg-doc-props");
    function tag(type){
      var t = document.createElement("cds-tag");
      t.setAttribute("label", type); t.setAttribute("appearance", PROP_TYPE[type] || "neutral"); t.setAttribute("show-lead-item", "false");
      return t;
    }
    items.forEach(function(p){
      var row = el("div", "pg-doc-prop");
      var head = el("div", "pg-doc-prop__head");
      if (p.icon){ var i = document.createElement("cds-icon"); i.setAttribute("icon", p.icon); i.setAttribute("size", "small"); i.setAttribute("appearance", "neutral"); head.appendChild(i); }
      head.appendChild(el("span", "pg-doc-prop__name", p.name));
      if (p.type) head.appendChild(tag(p.type));
      row.appendChild(head);
      (p.nested || []).forEach(function(n){
        var sub = el("div", "pg-doc-prop__nested");
        var sh = el("div", "pg-doc-prop__head");
        sh.appendChild(el("span", "pg-doc-prop__attr", n.name));
        if (n.type) sh.appendChild(tag(n.type));
        sub.appendChild(sh);
        var vals = el("ul", "pg-doc-prop__values");
        (n.values || []).forEach(function(v){ vals.appendChild(el("li", null, v)); });
        sub.appendChild(vals);
        row.appendChild(sub);
      });
      box.appendChild(row);
    });
    return box;
  }

  var BLOCKS = {
    h2: function(d, v){ return el("h2", "pg-doc-h2", v); },
    h3: function(d, v){ return el("h3", "pg-doc-h3", v); },
    p: function(d, v){ return rich(el("p", "pg-doc-p"), v); },
    note: function(d, v){ return rich(el("p", "pg-doc-note"), v); },
    ul: function(d, v){ return list("ul", v); },
    ol: function(d, v){ return list("ol", v); },
    cards: function(d, v){
      var g = el("div", "pg-doc-cards");
      v.forEach(function(c){ var k = el("div", "pg-doc-card"); k.appendChild(el("h4", "pg-doc-h4", c[0])); k.appendChild(rich(el("p", "pg-doc-p"), c[1])); g.appendChild(k); });
      return g;
    },
    display: function(d, v){ return display(example(d, v.attrs, v.live), v.live ? "is-live" : ""); },
    compare: function(d, v){
      var g = el("div", "pg-doc-compare");
      v.forEach(function(c){
        var f = el("figure", "pg-doc-figure");
        f.appendChild(c.empty ? display(el("span", "pg-doc-empty", c.empty), "is-empty") : display(example(d, c.attrs)));
        f.appendChild(el("figcaption", null, c.title));
        g.appendChild(f);
      });
      return g;
    },
    anatomy: anatomy,
    props: function(d, v){ return props(v); },
    specimens: function(d, v){
      var s = el("section", "pg-doc-specimens");
      if (v.title) s.appendChild(el("h3", "pg-doc-h3", v.title));
      var g = display(null, "pg-doc-display--grid"); // a própria caixa é a grade
      if (v.min) g.style.setProperty("--_min", v.min); // largura mínima da coluna (padrão 320px)
      v.items.forEach(function(it){
        var f = el("figure", "pg-doc-specimen");
        f.appendChild(example(d, it.attrs));
        f.appendChild(el("figcaption", null, it.label));
        g.appendChild(f);
      });
      s.appendChild(g);
      return s;
    },
    guides: function(d, v){
      var g = el("div", "pg-doc-guides");
      v.forEach(function(it){
        var row = el("div", "pg-doc-guide");
        row.appendChild(display(example(d, it.attrs)));
        var t = el("div", "pg-doc-guide__text");
        t.appendChild(el("h3", "pg-doc-h3", it.title));
        t.appendChild(rich(el("p", "pg-doc-p"), it.text));
        row.appendChild(t);
        g.appendChild(row);
      });
      return g;
    },
    dodont: function(d, v){
      var g = el("div", "pg-doc-dodont");
      v.forEach(function(it){
        var card = el("figure", "pg-doc-dd pg-doc-dd--" + it.kind);
        var box = el("div", "pg-doc-dd__box"), c = example(d, it.attrs);
        if (it.style) c.setAttribute("style", it.style);
        box.appendChild(c);
        card.appendChild(box);
        var cap = el("figcaption", "pg-doc-dd__text");
        cap.appendChild(el("strong", null, it.kind === "do" ? "Use" : it.kind === "caution" ? "Use com cautela" : "Não use"));
        cap.appendChild(rich(el("span"), it.text));
        card.appendChild(cap);
        g.appendChild(card);
      });
      return g;
    },
    specs: function(d, v){
      var g = el("div", "pg-doc-specs");
      v.forEach(function(c){
        var card = el("section", "pg-doc-spec");
        card.appendChild(el("h3", "pg-doc-h4", c.title));
        var dl = el("dl");
        c.rows.forEach(function(r){ dl.appendChild(el("dt", null, r[0])); dl.appendChild(rich(el("dd"), r[1])); });
        card.appendChild(dl);
        g.appendChild(card);
      });
      return g;
    },
    table: function(d, v){
      var wrap = el("div", "pg-doc-table-wrap"), t = el("table", "pg-doc-table");
      var tr = el("tr"); v.head.forEach(function(h){ tr.appendChild(el("th", null, h)); });
      var thead = el("thead"); thead.appendChild(tr); t.appendChild(thead);
      var tb = el("tbody");
      v.rows.forEach(function(r){ var row = el("tr"); r.forEach(function(c){ row.appendChild(rich(el("td"), c)); }); tb.appendChild(row); });
      t.appendChild(tb); wrap.appendChild(t);
      return wrap;
    }
  };

  /** Renderiza uma tab da doc em `root`. */
  CDS.renderDoc = function(doc, tabId, root){
    var tab = doc.tabs.filter(function(t){ return t.id === tabId; })[0] || doc.tabs[0];
    root.innerHTML = "";
    var page = el("article", "pg-doc");
    tab.blocks.forEach(function(b){
      var k = Object.keys(b)[0];
      if (BLOCKS[k]) page.appendChild(BLOCKS[k](doc, b[k]));
    });
    if (doc.source){
      var src = el("p", "pg-doc-source");
      src.appendChild(document.createTextNode("Fonte: "));
      var a = el("a", null, "[Documentação] no Figma"); a.href = doc.source; a.target = "_blank"; a.rel = "noopener";
      src.appendChild(a);
      page.appendChild(src);
    }
    root.appendChild(page);
  };
})();
