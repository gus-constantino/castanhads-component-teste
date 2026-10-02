/**
 * Relatório do playground (#/relatorio/<tab>[/<seção>]): painel para quem acompanha o projeto.
 * Lê docs/ROADMAP.md, docs/CONFERIR.md e docs/ARCHITECTURE.md ao abrir, então está sempre igual ao repositório.
 * Tab "Visão geral" = dashboard (números, etapas, divergências, pendências); as outras tabs são os docs,
 * com as seções (##) reagrupadas por assunto. Camada do shell, não da lib.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  var REPO = "https://github.com/gus-constantino/castanhads-component-teste/blob/main/";
  // Seções por número do título (ROADMAP/ARCHITECTURE) ou pelo nome (CONFERIR). O que não estiver listado vai para o último grupo.
  var TABS = [
    { id: "visao", title: "Saúde da stack Figma" },
    { id: "conferir", title: "Conferir", file: "docs/CONFERIR.md", groups: [
      ["Em aberto, por tipo", ["Ajuste de texto", "Ajuste de UI", "Motion", "Refactor", "Naming", "Acessibilidade", "Documentação"]],
      ["Fechados", ["Resolvidos"]], ["Referência", ["Como usar esta lista"]] ] },
    { id: "arquitetura", title: "Arquitetura", file: "docs/ARCHITECTURE.md", groups: [
      ["Visão", ["1", "2"]], ["Evolução", ["7", "6", "5"]], ["Referência técnica", ["3", "4", "8"]] ] },
    { id: "roadmap", title: "Roadmap", file: "docs/ROADMAP.md", groups: [
      ["Andamento", ["8", "3"]], ["Decisões e pendências", ["4", "5", "5.1", "5.2"]], ["Referência", ["2", "7", "1"]] ], hide: ["6"] }, // 6 = Preferências (nota de trabalho, fica só no doc)
  ];
  var DOCS = TABS.filter(function(t){ return t.file; });
  var TYPES = TABS.filter(function(t){ return t.id === "conferir"; })[0].groups[0][1];
  var cache = {};
  function load(file){
    if (!cache[file]) cache[file] = fetch(file, { cache: "no-cache" }).then(function(r){ if (!r.ok) throw new Error(file + " " + r.status); return r.text(); });
    return cache[file];
  }

  // ---------- Markdown (o subconjunto que os docs usam) ----------
  function esc(s){ return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function slug(s){ return s.toLowerCase().replace(/[`*~]/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-"); }
  function href(u){
    if (/^https?:/.test(u)) return { url: u, ext: true };
    if (u.charAt(0) === "#") return { url: u, anchor: decodeURIComponent(u.slice(1)) };
    var path = new URL(u, "https://x/docs/").pathname.slice(1);
    return { url: REPO + path, ext: true };
  }
  function inline(s){
    return s.split(/(`[^`]*`)/).map(function(part, i){
      if (i % 2) return "<code>" + esc(part.slice(1, -1)) + "</code>";
      return esc(part)
        .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function(_, t, u){
          var h = href(u.replace(/&amp;/g, "&"));
          return h.anchor != null ? '<a href="' + h.url + '" data-anchor="' + esc(h.anchor) + '">' + t + "</a>"
            : '<a href="' + esc(h.url) + '" target="_blank" rel="noopener">' + t + "</a>";
        })
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/~~([^~]+)~~/g, "<del>$1</del>")
        .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
    }).join("");
  }
  function cells(line){
    return line.replace(/\\\|/g, "\u0000").trim().replace(/^\|/, "").replace(/\|$/, "").split("|")
      .map(function(c){ return c.replace(/\u0000/g, "|").trim(); });
  }
  var ITEM = /^(\s*)([-*+]|\d+\.)\s+(.*)$/;
  function blocks(lines){
    var out = [], i = 0, n = lines.length;
    function isStart(l, next){ return /^(#{1,6}\s|```|>|---+\s*$)/.test(l) || ITEM.test(l) || (l.charAt(0) === "|" && /^\|?\s*:?-{3,}/.test(next || "")); }
    function list(indent){
      var m = lines[i].match(ITEM), tag = /\d/.test(m[2]) ? "ol" : "ul", html = "<" + tag + ">", open = false;
      while (i < n){
        var l = lines[i], mm = l.match(ITEM);
        if (!l.trim()){ var j = i + 1; while (j < n && !lines[j].trim()) j++; var nx = j < n && lines[j].match(ITEM); if (nx && nx[1].length >= indent){ i = j; continue; } break; }
        if (mm){
          if (mm[1].length < indent) break;
          if (mm[1].length > indent){ html += list(mm[1].length); continue; }
          html += (open ? "</li>" : "") + "<li>" + inline(mm[3]); open = true; i++;
        } else if (/^\s+/.test(l)){ html += " " + inline(l.trim()); i++; }
        else break;
      }
      return html + (open ? "</li>" : "") + "</" + tag + ">";
    }
    while (i < n){
      var l = lines[i];
      if (!l.trim()){ i++; continue; }
      if (/^```/.test(l)){ var code = []; i++; while (i < n && !/^```/.test(lines[i])) code.push(lines[i++]); i++; out.push("<pre><code>" + esc(code.join("\n")) + "</code></pre>"); continue; }
      var h = l.match(/^(#{3,6})\s+(.*)$/);
      if (h){ out.push("<h" + (h[1].length) + ">" + inline(h[2]) + "</h" + h[1].length + ">"); i++; continue; }
      if (/^---+\s*$/.test(l)){ out.push("<hr>"); i++; continue; }
      if (l.charAt(0) === "|" && /^\|?\s*:?-{3,}/.test(lines[i + 1] || "")){
        var head = cells(l), align = cells(lines[i + 1]).map(function(c){ return /-:$/.test(c) ? ' class="is-num"' : ""; }), rows = [];
        i += 2; while (i < n && lines[i].charAt(0) === "|") rows.push(cells(lines[i++]));
        out.push('<div class="rp-table"><table><thead><tr>' + head.map(function(c, k){ return "<th" + (align[k] || "") + ">" + inline(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
          rows.map(function(r){ return "<tr>" + r.map(function(c, k){ return "<td" + (align[k] || "") + ">" + inline(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>");
        continue;
      }
      if (/^>/.test(l)){ var q = []; while (i < n && /^>/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, "")); out.push("<blockquote>" + blocks(q) + "</blockquote>"); continue; }
      if (ITEM.test(l)){ out.push(list(l.match(ITEM)[1].length)); continue; }
      var p = [l.trim()]; i++;
      while (i < n && lines[i].trim() && !isStart(lines[i], lines[i + 1])) p.push(lines[i++].trim());
      out.push("<p>" + inline(p.join(" ")) + "</p>");
    }
    return out.join("");
  }
  // Doc → { intro, sections: [{ key, num, title, lines }] }
  function parse(md){
    var doc = { intro: [], sections: [] }, cur = null;
    md.replace(/\r/g, "").split("\n").forEach(function(l){
      if (/^#\s/.test(l)) return;
      var h = l.match(/^##\s+(.*)$/);
      if (h){ var m = h[1].match(/^(\d+(?:\.\d+)?)\.?\s+(.*)$/); cur = { num: m ? m[1] : null, title: m ? m[2] : h[1], lines: [] }; doc.sections.push(cur); return; }
      (cur ? cur.lines : doc.intro).push(l);
    });
    return doc;
  }
  // Linhas de tabela cujo 1º campo é um ID (C12, D40, Q9) ou uma data (02/10): é o que o TOC conta
  function items(lines){ return lines.filter(function(l){ return /^\|\s*(~~)?([CDQ]\d+|\d{2}\/\d{2})\b/.test(l); }); }

  // ---------- Números do topo ----------
  function kpis(docs){
    var road = docs.roadmap, conf = docs.conferir;
    // Inventário (§2): soma da coluna Var. ("12 / 1" = dois sets)
    var sets = 0, variants = 0;
    sec(road, function(s){ return s.num === "2"; }).lines.forEach(function(l){
      if (!/^\|/.test(l) || /^\|\s*:?-{3,}|^\|\s*(Página|Componente)\s*\|/.test(l)) return;
      var c = cells(l), v = c[c.length - 2] || "";
      v.split("/").forEach(function(x){ var n = parseInt(x, 10); if (!isNaN(n)){ variants += n; sets++; } });
    });
    var openC = conf.sections.filter(function(s){ return TYPES.indexOf(s.title) !== -1; }).reduce(function(a, s){ return a + items(s.lines).length; }, 0);
    var solved = items(sec(conf, function(s){ return s.title === "Resolvidos"; }).lines).length;
    var dec = items(sec(road, function(s){ return s.num === "4"; }).lines).length;
    var qs = items(sec(road, function(s){ return s.num === "5"; }).lines).filter(function(l){ return !/✅/.test(l); }).length;
    var pg = (CDS.playgrounds || []).filter(function(c){ return !c.resource; });
    var comps = pg.filter(function(c){ return !c.block; }).length;
    return [
      { label: "Componentes no playground", value: comps, sub: "+ " + (pg.length - comps) + " building blocks" },
      { label: "Variantes do Figma cobertas", value: variants.toLocaleString("pt-BR"), sub: "em " + sets + " sets da lib" },
      { label: "Divergências em aberto", value: openC, sub: solved + " já resolvidas" },
      { label: "Decisões registradas", value: dec, sub: qs ? qs + " dúvida(s) em aberto" : "Sem dúvidas em aberto" }
    ];
  }

  function sec(doc, test){ return doc.sections.filter(test)[0] || { title: "", lines: [] }; }
  function rows(lines){ return lines.filter(function(l){ return /^\|/.test(l) && !/^\|\s*:?-{3,}/.test(l); }).slice(1).map(cells); }
  function plain(s){ return s.replace(/\*\*|~~|`/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1"); }

  // ---------- Visão geral (dashboard) ----------
  function panel(parent, title, sub, cls){
    var p = parent.appendChild(el("section", "rp-panel" + (cls ? " " + cls : "")));
    var h = p.appendChild(el("div", "rp-panel__head"));
    h.appendChild(el("h2", "rp-panel__title", title));
    if (sub) h.appendChild(el("p", "rp-panel__sub", sub));
    return p;
  }
  function bars(parent, data, opts){
    var max = Math.max.apply(null, data.map(function(d){ return d.value; }).concat([1]));
    var ul = parent.appendChild(el("ul", "rp-bars"));
    data.forEach(function(d){
      var li = ul.appendChild(el("li"));
      var row = li.appendChild(el(d.href ? "a" : "div", "rp-bar"));
      if (d.href) row.href = d.href;
      row.appendChild(el("span", "rp-bar__label", esc(d.label)));
      var track = row.appendChild(el("span", "rp-bar__track"));
      var fill = track.appendChild(el("span", "rp-bar__fill" + (opts && opts.tone ? " is-" + opts.tone : "")));
      fill.style.width = (d.value / max * 100) + "%";
      row.appendChild(el("span", "rp-bar__value", String(d.value)));
    });
  }
  function overview(){
    var road = docs.roadmap, conf = docs.conferir;
    var grid = bodyEl.appendChild(el("div", "rp-dash"));

    // Divergências por tipo
    var open = conf.sections.filter(function(s){ return TYPES.indexOf(s.title) !== -1; });
    var total = open.reduce(function(a, s){ return a + items(s.lines).length; }, 0);
    var p2 = panel(grid, "Divergências Figma", total + " em aberto, por tipo de ajuste");
    bars(p2, open.map(function(s){ return { label: s.title, value: items(s.lines).length, href: "#/relatorio/conferir/" + slug(s.title) }; })
      .sort(function(a, b){ return b.value - a.value; }));

    // Como o código tratou
    var all = [].concat.apply([], open.map(function(s){ return rows(s.lines).filter(function(r){ return /^(~~)?C\d+/.test(r[0]); }); }));
    var kinds = { exc: 0, deb: 0, seg: 0 };
    all.forEach(function(r){ var code = r[4] || "", act = r[5] || ""; if (/débito|erro no figma/i.test(act)) kinds.deb++; else if (/exceção/i.test(code)) kinds.exc++; else kinds.seg++; });
    var p3 = panel(grid, "Como o código tratou", "Regra D40: o código segue o Figma e registra a divergência");
    var parts = [["seg", "Segue o Figma", kinds.seg], ["exc", "Exceção aprovada (web, sem especificação ou decisão)", kinds.exc], ["deb", "Débito ou erro no Figma", kinds.deb]];
    var donut = p3.appendChild(el("div", "rp-donut"));
    var acc = 0, stops = parts.map(function(pt){ var a = acc; acc += pt[2] / (all.length || 1) * 360; return "var(--rp-c-" + pt[0] + ") " + a + "deg " + acc + "deg"; });
    var ring = donut.appendChild(el("div", "rp-donut__ring", "<strong>" + all.length + "</strong><span>itens</span>"));
    ring.style.background = "conic-gradient(" + stops.join(", ") + ")";
    ring.setAttribute("role", "img"); ring.setAttribute("aria-label", parts.map(function(pt){ return pt[1] + ": " + pt[2]; }).join("; "));
    var leg = donut.appendChild(el("ul", "rp-legend"));
    parts.forEach(function(pt){ var li = leg.appendChild(el("li")); li.appendChild(el("span", "rp-legend__sw is-" + pt[0])); li.appendChild(el("span", null, esc(pt[1]))); li.appendChild(el("strong", null, String(pt[2]))); });

    // Componentes por categoria
    var pg = (CDS.playgrounds || []).filter(function(c){ return !c.resource && !c.block; }), cats = {};
    pg.forEach(function(c){ var k = c.category || "Outros"; cats[k] = (cats[k] || 0) + 1; });
    var p4 = panel(grid, "Componentes por página do Figma", pg.length + " componentes em " + Object.keys(cats).length + " páginas");
    var cl = Object.keys(cats).map(function(k){ return { label: k, value: cats[k] }; }).sort(function(a, b){ return b.value - a.value || a.label.localeCompare(b.label, "pt-BR"); });
    var rest = cl.length > 8 ? cl.splice(8) : []; // painel curto: as 8 maiores; o resto vira uma linha de texto
    bars(p4, cl, { tone: "neutral" });
    if (rest.length) p4.appendChild(el("p", "rp-panel__foot", "+ " + rest.length + " páginas com até " + rest[0].value + " componente(s): " + esc(rest.map(function(d){ return d.label; }).join(", "))));

    // Pendências: abertas primeiro; as já resolvidas nos registros (✅ ou riscadas) vão riscadas para o fim
    var p5 = panel(grid, "Pendências", "O que depende de decisão ou de ajuste no Figma");
    var pend = [];
    function isDone(r){ return /✅|~~/.test(r.join(" ")); }
    rows(sec(road, function(s){ return s.num === "5"; }).lines).forEach(function(r){
      var d = isDone(r), q = plain(r[1]), k = q.indexOf("?") + 1; // resolvida: "pergunta? resposta" → pergunta riscada + resposta na nota
      pend.push({ tag: "Dúvida", id: r[0], text: d && k ? q.slice(0, k) : q, note: d ? "Resolvida: " + (k ? q.slice(k).trim() : plain(r[2] || "")) : plain(r[2] || ""), done: d });
    });
    rows(sec(road, function(s){ return s.num === "5.2"; }).lines).forEach(function(r){ pend.push({ tag: "Débito de design", id: r[0].split(" ")[0], text: plain(r[1]), note: plain(r[0].split("·")[1] || "").trim(), done: isDone(r) }); });
    rows(sec(road, function(s){ return s.num === "5.1"; }).lines).forEach(function(r){
      var d = isDone(r); pend.push({ tag: "Débito de export", id: "", text: plain(r[0]).replace(/\s*✅/, ""), note: (d ? "Resolvido: " : "Hoje: ") + plain(r[3] || "").split(/[.;(]/)[0], done: d });
    });
    pend.sort(function(a, b){ return a.done - b.done; });
    if (!pend.some(function(x){ return !x.done; })) pend.unshift({ tag: "", text: "Nada em aberto.", done: false });
    var pl = p5.appendChild(el("ul", "rp-list"));
    pend.forEach(function(x){
      var li = pl.appendChild(el("li", x.done ? "is-done" : null));
      if (x.tag) li.appendChild(el("span", "rp-tag", esc(x.done ? "Resolvido · " + x.tag : x.tag)));
      var body = (x.id ? "<strong>" + esc(x.id) + "</strong> · " : "") + esc(x.text);
      li.appendChild(el("p", "rp-list__text", x.done ? "<del>" + body + "</del>" : body));
      if (x.note) li.appendChild(el("p", "rp-list__note", esc(x.note)));
    });

    // Últimas decisões
    var dec = rows(sec(road, function(s){ return s.num === "4"; }).lines).filter(function(r){ return /^D\d+/.test(r[0]); })
      .sort(function(a, b){ return parseInt(a[0].slice(1), 10) - parseInt(b[0].slice(1), 10); });
    var p6 = panel(grid, "Últimas decisões", dec.length + " registradas · ver todas no Roadmap", "rp-panel--wide");
    var dl = p6.appendChild(el("ul", "rp-list rp-list--cols"));
    dec.slice(-6).reverse().forEach(function(r){
      var li = dl.appendChild(el("li"));
      li.appendChild(el("p", "rp-list__text", "<strong>" + esc(r[0]) + "</strong> · " + esc(plain(r[1]).replace(/^(.{180}).+$/, "$1…"))));
      if (r[2]) li.appendChild(el("p", "rp-list__note", esc(plain(r[2]))));
    });
    var more = p6.appendChild(el("a", "rp-more", "Ver decisões")); more.href = "#/relatorio/roadmap/" + slug(sec(road, function(s){ return s.num === "4"; }).title);
  }
  function goTo(section){
    if (!section) return;
    var t = [].slice.call(bodyEl.querySelectorAll("section[data-slug]")).filter(function(s){ return s.dataset.slug === decodeURIComponent(section); })[0];
    if (t) t.scrollIntoView({ block: "start" });
  }

  // ---------- View ----------
  var el = function(tag, cls, html){ var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  var root, kpiEl, tabsEl, bodyEl, searchEl, current = null, docs = null;

  function build(){
    root = document.getElementById("report");
    root.innerHTML = "";
    var head = root.appendChild(el("div", "rp-head"));
    var t = head.appendChild(el("div"));
    t.appendChild(el("h1", "rp-title", "Relatório do projeto"));
    t.appendChild(el("p", "rp-meta", "Castanha DS · implementação da lib <em>[CastanhaDS] Components</em> no playground. Atualizado direto dos registros do repositório."));
    searchEl = head.appendChild(el("input", "pg-search rp-search"));
    searchEl.type = "search"; searchEl.placeholder = "Buscar no relatório"; searchEl.setAttribute("aria-label", "Buscar no relatório");
    searchEl.addEventListener("input", filter);
    kpiEl = root.appendChild(el("div", "rp-kpis"));
    tabsEl = root.appendChild(el("div", "pg-tabs rp-tabs"));
    tabsEl.setAttribute("role", "tablist"); tabsEl.setAttribute("aria-label", "Registros");
    TABS.forEach(function(tab){
      var b = tabsEl.appendChild(el("button", "pg-tab", tab.title));
      b.type = "button"; b.setAttribute("role", "tab"); b.id = "rp-tab-" + tab.id; b.dataset.tab = tab.id;
      b.addEventListener("click", function(){ location.hash = "#/relatorio/" + tab.id; });
    });
    tabsEl.addEventListener("keydown", function(e){
      var bs = [].slice.call(tabsEl.children), i = bs.indexOf(document.activeElement); if (i < 0) return;
      var j = e.key === "ArrowRight" ? (i + 1) % bs.length : e.key === "ArrowLeft" ? (i - 1 + bs.length) % bs.length : e.key === "Home" ? 0 : e.key === "End" ? bs.length - 1 : -1;
      if (j < 0) return; e.preventDefault(); bs[j].focus(); bs[j].click();
    });
    bodyEl = root.appendChild(el("div", "rp-body"));
    bodyEl.setAttribute("role", "tabpanel");
    root.addEventListener("click", function(e){
      var a = e.target.closest("a[data-anchor], a[data-section]"); if (!a) return;
      e.preventDefault();
      var target = a.dataset.section ? document.getElementById(a.dataset.section) : [].slice.call(bodyEl.querySelectorAll("section[data-slug]")).filter(function(s){ return s.dataset.slug === a.dataset.anchor; })[0];
      if (target) target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" });
    });
  }

  function renderTab(id){
    var tab = TABS.filter(function(t){ return t.id === id; })[0], doc = docs[id];
    [].forEach.call(tabsEl.children, function(b){ var on = b.dataset.tab === id; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; });
    bodyEl.setAttribute("aria-labelledby", "rp-tab-" + id);
    bodyEl.innerHTML = "";
    bodyEl.classList.toggle("is-dash", !tab.file);
    searchEl.hidden = !tab.file;
    if (!tab.file){ overview(); return; }
    var toc = bodyEl.appendChild(el("nav", "rp-toc")); toc.setAttribute("aria-label", "Seções");
    var content = bodyEl.appendChild(el("div", "rp-content"));
    var intro = blocks(doc.intro);
    if (intro){ var s0 = content.appendChild(el("section", "rp-section rp-intro", intro)); s0.id = "rp-" + id + "-sobre"; }
    var used = [];
    var groups = tab.groups.map(function(g){
      var secs = g[1].map(function(k){ return doc.sections.filter(function(s){ return (s.num || s.title) === k; })[0]; }).filter(Boolean);
      used = used.concat(secs); return { title: g[0], secs: secs };
    });
    var rest = doc.sections.filter(function(s){ return used.indexOf(s) === -1 && (tab.hide || []).indexOf(s.num || s.title) === -1; });
    if (rest.length) groups[groups.length - 1].secs = groups[groups.length - 1].secs.concat(rest);
    groups.forEach(function(g){
      if (!g.secs.length) return;
      toc.appendChild(el("p", "rp-toc__group", g.title));
      var ul = toc.appendChild(el("ul"));
      content.appendChild(el("h2", "rp-group", g.title));
      g.secs.forEach(function(s){
        var sid = "rp-" + id + "-" + slug(s.title), count = items(s.lines).length;
        var li = ul.appendChild(el("li")), a = li.appendChild(el("a", null, inline(s.title)));
        a.href = "#" + sid; a.dataset.section = sid;
        if (count) a.appendChild(el("span", "rp-count", String(count)));
        var sec = content.appendChild(el("section", "rp-section"));
        sec.id = sid; sec.dataset.slug = slug(s.title);
        var h = sec.appendChild(el("h3", "rp-section__title", inline(s.title)));
        if (count) h.appendChild(el("span", "rp-count", String(count)));
        sec.appendChild(el("div", "rp-md", blocks(s.lines)));
      });
    });
    var src = toc.appendChild(el("a", "rp-src", "Ver no GitHub"));
    src.href = REPO + tab.file; src.target = "_blank"; src.rel = "noopener";
    filter();
  }

  // Busca: esconde linhas de tabela, itens de lista e seções sem o termo
  function filter(){
    if (!bodyEl) return;
    var q = (searchEl.value || "").trim().toLowerCase();
    [].forEach.call(bodyEl.querySelectorAll(".rp-section"), function(sec){
      var hit = !q || sec.querySelector(".rp-section__title") && sec.querySelector(".rp-section__title").textContent.toLowerCase().indexOf(q) !== -1;
      var any = false;
      [].forEach.call(sec.querySelectorAll("tbody tr, .rp-md > ul > li, .rp-md > ol > li, .rp-md > p"), function(r){
        var ok = !q || hit || r.textContent.toLowerCase().indexOf(q) !== -1; r.hidden = !ok; if (ok) any = true;
      });
      sec.hidden = !(hit || any);
    });
    [].forEach.call(bodyEl.querySelectorAll(".rp-group"), function(g){
      var n = g.nextElementSibling, vis = false;
      while (n && !n.classList.contains("rp-group")){ if (!n.hidden) vis = true; n = n.nextElementSibling; }
      g.hidden = !vis;
    });
  }

  CDS.report = {
    tabs: TABS.map(function(t){ return t.id; }),
    show: function(tabId, section){
      if (!root) build();
      var id = TABS.some(function(t){ return t.id === tabId; }) ? tabId : TABS[0].id;
      document.title = "Relatório — Castanha DS";
      if (docs){ if (current !== id){ current = id; renderTab(id); window.scrollTo(0, 0); } goTo(section); return; }
      bodyEl.innerHTML = '<p class="rp-meta">Carregando registros…</p>';
      Promise.all(DOCS.map(function(t){ return load(t.file); })).then(function(texts){
        docs = {}; DOCS.forEach(function(t, i){ docs[t.id] = parse(texts[i]); });
        kpiEl.innerHTML = "";
        kpis(docs).forEach(function(k){
          var c = kpiEl.appendChild(el("div", "rp-kpi"));
          c.appendChild(el("p", "rp-kpi__label", k.label));
          c.appendChild(el("p", "rp-kpi__value", String(k.value)));
          c.appendChild(el("p", "rp-kpi__sub", k.sub));
        });
        current = id; renderTab(id); goTo(section);
      }).catch(function(err){ bodyEl.innerHTML = '<p class="rp-meta">Não foi possível ler os registros (' + esc(String(err.message || err)) + ").</p>"; });
    }
  };
})();
