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
 *   iconGallery: { only }              galeria do [Caju] Icons por categoria, com busca por nome e palavra-chave; only: "deprecated" mostra só os deprecated
 *   illustrationGallery: {}             galeria do [Caju] Illustrations por categoria (imagens com lazy load), busca por nome, categoria e description
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
    // Galeria em accordion: uma categoria (bucket) por painel; a busca abre só os painéis com resultado
    iconGallery: function(d, v){
      var A = window.CDS.assets || {}, meta = {};
      (A.icons || []).forEach(function(i){ meta[i.name] = i; });
      var wrap = el("div", "pg-doc-icons");
      var search = el("input", "pg-text pg-doc-icons__search");
      search.type = "search"; search.placeholder = "Buscar por nome ou palavra-chave (ex.: cartão, seta, pix)"; search.setAttribute("aria-label", "Buscar ícone");
      var tools = el("div", "pg-doc-icons__tools");
      var count = el("p", "pg-doc-note"); count.setAttribute("aria-live", "polite");
      var toggleAll = el("button", "pg-doc-link", "Abrir todas"); toggleAll.type = "button";
      tools.appendChild(count); tools.appendChild(toggleAll);
      wrap.appendChild(search); wrap.appendChild(tools);
      var acc = el("div", "pg-doc-acc"), sections = [];
      var fold = function(s){ return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); };
      (A.iconBuckets || []).filter(function(b){ return !b.glyphs && (v.only === "deprecated" ? b.deprecated : !b.deprecated); }).forEach(function(b, bi){
        var det = el("details", "pg-doc-acc__item");
        var sum = el("summary", "pg-doc-acc__head");
        sum.appendChild(el("span", "pg-doc-acc__title", b.name));
        var badge = el("span", "pg-doc-acc__count", String(b.icons.length)); sum.appendChild(badge);
        var chev = el("span", "cds-icon cds-icon--dropdown-open-line pg-doc-acc__chev"); chev.setAttribute("aria-hidden", "true"); sum.appendChild(chev);
        det.appendChild(sum);
        var grid = el("ul", "pg-doc-icons__grid"), tiles = [];
        b.icons.forEach(function(n){
          var m = meta[n] || {}, li = el("li"), btn = el("button", "pg-doc-icons__tile");
          btn.type = "button"; btn.title = (m.keywords || []).join(", ");
          btn.setAttribute("aria-label", n + " — copiar nome");
          var ic = el("span", "cds-icon " + (b.deprecated ? "" : m.cls || "")); ic.setAttribute("aria-hidden", "true");
          // deprecated pode repetir nome de um ativo (sem classe própria): aponta direto para o arquivo
          if (b.deprecated){ var u = 'url("assets/icons/' + b.id + "/" + encodeURIComponent(n) + '.svg")'; ic.style.webkitMaskImage = u; ic.style.maskImage = u; }
          btn.appendChild(ic); btn.appendChild(el("span", "pg-doc-icons__name", n));
          btn.addEventListener("click", function(){
            try { navigator.clipboard.writeText(n); } catch (e) {}
            count.textContent = "Copiado: " + n;
          });
          li.appendChild(btn); grid.appendChild(li);
          tiles.push({ li: li, text: fold(n + " " + (m.keywords || []).join(" ")) });
        });
        var body = el("div", "pg-doc-acc__body"); body.appendChild(grid); det.appendChild(body);
        if (bi === 0) det.open = true;
        acc.appendChild(det);
        sections.push({ det: det, badge: badge, total: b.icons.length, tiles: tiles, first: bi === 0 });
      });
      wrap.appendChild(acc);
      function filter(){
        var q = fold(search.value.trim()), shown = 0;
        sections.forEach(function(s){
          var any = 0;
          s.tiles.forEach(function(t){ var ok = !q || t.text.indexOf(q) !== -1; t.li.hidden = !ok; if (ok) any++; });
          s.det.hidden = !any; s.badge.textContent = q ? any + " de " + s.total : String(s.total);
          if (q) s.det.open = any > 0;
          shown += any;
        });
        count.textContent = shown + " ícone" + (shown === 1 ? "" : "s") + (q ? " para “" + search.value.trim() + "”" : " em " + sections.length + " categorias") + ". Clique para copiar o nome.";
      }
      var wasQuery = false;
      search.addEventListener("input", function(){
        var has = !!search.value.trim();
        if (wasQuery && !has) sections.forEach(function(s){ s.det.open = s.first; }); // limpou a busca: volta ao estado inicial
        wasQuery = has; filter();
      });
      toggleAll.addEventListener("click", function(){
        var open = sections.some(function(s){ return !s.det.hidden && !s.det.open; });
        sections.forEach(function(s){ if (!s.det.hidden) s.det.open = open; });
        toggleAll.textContent = open ? "Fechar todas" : "Abrir todas";
      });
      filter();
      return wrap;
    },
    illustrationGallery: function(d, v){
      var A = window.CDS.assets || {}, meta = {};
      (A.illustrations || []).forEach(function(i){ meta[i.name] = i; });
      var wrap = el("div", "pg-doc-icons pg-doc-ills");
      var search = el("input", "pg-text pg-doc-icons__search");
      search.type = "search"; search.placeholder = "Buscar por nome, categoria ou uso (ex.: cartão, pix, erro)"; search.setAttribute("aria-label", "Buscar ilustração");
      var tools = el("div", "pg-doc-icons__tools");
      var count = el("p", "pg-doc-note"); count.setAttribute("aria-live", "polite");
      var toggleAll = el("button", "pg-doc-link", "Abrir todas"); toggleAll.type = "button";
      tools.appendChild(count); tools.appendChild(toggleAll);
      wrap.appendChild(search); wrap.appendChild(tools);
      var acc = el("div", "pg-doc-acc"), sections = [];
      var fold = function(s){ return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); };
      (A.illustrationBuckets || []).forEach(function(b, bi){
        var det = el("details", "pg-doc-acc__item");
        var sum = el("summary", "pg-doc-acc__head");
        sum.appendChild(el("span", "pg-doc-acc__title", b.name));
        var badge = el("span", "pg-doc-acc__count", String(b.items.length)); sum.appendChild(badge);
        var chev = el("span", "cds-icon cds-icon--dropdown-open-line pg-doc-acc__chev"); chev.setAttribute("aria-hidden", "true"); sum.appendChild(chev);
        det.appendChild(sum);
        var grid = el("ul", "pg-doc-icons__grid pg-doc-ills__grid"), tiles = [];
        b.items.forEach(function(k){
          var m = meta[k] || { label: k, src: "" }, li = el("li"), btn = el("button", "pg-doc-icons__tile pg-doc-ills__tile");
          btn.type = "button"; btn.title = [m.figma, m.size, m.description].filter(Boolean).join(" · ");
          btn.setAttribute("aria-label", m.label + " — copiar nome");
          var img = el("img", "pg-doc-ills__img"); img.alt = ""; img.loading = "lazy"; img.decoding = "async"; img.src = m.src;
          btn.appendChild(img); btn.appendChild(el("span", "pg-doc-icons__name", m.label));
          btn.addEventListener("click", function(){
            try { navigator.clipboard.writeText(k); } catch (e) {}
            count.textContent = "Copiado: " + k;
          });
          li.appendChild(btn); grid.appendChild(li);
          tiles.push({ li: li, text: fold([k, m.figma, b.name, m.description].join(" ")) });
        });
        var body = el("div", "pg-doc-acc__body"); body.appendChild(grid); det.appendChild(body);
        if (bi === 0) det.open = true;
        acc.appendChild(det);
        sections.push({ det: det, badge: badge, total: b.items.length, tiles: tiles, first: bi === 0 });
      });
      wrap.appendChild(acc);
      function filter(){
        var q = fold(search.value.trim()), shown = 0;
        sections.forEach(function(s){
          var any = 0;
          s.tiles.forEach(function(t){ var ok = !q || t.text.indexOf(q) !== -1; t.li.hidden = !ok; if (ok) any++; });
          s.det.hidden = !any; s.badge.textContent = q ? any + " de " + s.total : String(s.total);
          if (q) s.det.open = any > 0;
          shown += any;
        });
        count.textContent = shown + " ilustraç" + (shown === 1 ? "ão" : "ões") + (q ? " para “" + search.value.trim() + "”" : " em " + sections.length + " categorias") + ". Clique para copiar o nome (categoria/nome).";
      }
      var wasQuery = false;
      search.addEventListener("input", function(){
        var has = !!search.value.trim();
        if (wasQuery && !has) sections.forEach(function(s){ s.det.open = s.first; });
        wasQuery = has; filter();
      });
      toggleAll.addEventListener("click", function(){
        var open = sections.some(function(s){ return !s.det.hidden && !s.det.open; });
        sections.forEach(function(s){ if (!s.det.hidden) s.det.open = open; });
        toggleAll.textContent = open ? "Fechar todas" : "Abrir todas";
      });
      filter();
      return wrap;
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
      var a = el("a", null, doc.sourceLabel || "[Documentação] no Figma"); a.href = doc.source; a.target = "_blank"; a.rel = "noopener";
      src.appendChild(a);
      page.appendChild(src);
    }
    root.appendChild(page);
  };
})();
