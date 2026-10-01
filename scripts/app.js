/**
 * Shell do playground: side menu, roteamento por hash (#/id), tema e viewport.
 * Os componentes se registram via CDS.register() nos seus *.playground.js.
 */
(function(){
  "use strict";
  var CDS = window.CDS, kit = CDS.kit;
  var JIRA = "https://caju746.atlassian.net/browse/";
  var $ = function(id){ return document.getElementById(id); };
  var nav = $("nav"), search = $("search"), title = $("cmp-title"), links = $("cmp-links");
  var preview = $("preview"), panel = $("panel"), frame = $("frame");
  var rval = $("rval"), rdone = $("rdone"), vpOut = $("vp-readout");
  var tabsEl = $("tabs"), docsEl = $("docs"), stage = $("stage"), shell = document.querySelector(".pg-shell");
  var list = CDS.playgrounds.slice().sort(function(a, b){ return a.name.localeCompare(b.name, "pt-BR"); });
  // rota padrão = primeiro componente (não building block)

  // ---------- Side menu ----------
  // Grupos na ordem das páginas do [CastanhaDS] Components; building blocks numa seção recolhida no fim.
  var PAGES = ["Actions","Banner","Breadcrumbs","Buttons","Caju Card","Containers","Content","Datepicker","Dividers","Feedback","File Upload","Fixed Bar","Flags","Images","Lists","Loaders","Navigation","Pagination","Popovers","Progress Indicators","Rating Score","Selection Controls","Slider","Status","Tabs","Tab View","Tables","Text Fields","Tooltips","Utilities"];
  var blocksOpen = false;
  function link(c){
    return kit.el("li", null, [kit.el("a", { href: "#/" + c.id }, [c.name, kit.el("small", { text: c.task || "" })])]);
  }
  function buildNav(filter){
    var q = (filter || "").trim().toLowerCase();
    nav.innerHTML = "";
    var shown = list.filter(function(c){ return !q || (c.name + " " + (c.task || "") + " " + (c.category || "")).toLowerCase().indexOf(q) !== -1; });
    var comps = shown.filter(function(c){ return !c.block; }), blocks = shown.filter(function(c){ return c.block; });
    var cats = PAGES.concat(comps.map(function(c){ return c.category || "Outros"; }).filter(function(x, i, a){ return PAGES.indexOf(x) === -1 && a.indexOf(x) === i; }));
    cats.forEach(function(cat){
      var items = comps.filter(function(c){ return (c.category || "Outros") === cat; });
      if (!items.length) return;
      nav.appendChild(kit.el("li", { "class": "pg-nav-group", text: cat }));
      items.forEach(function(c){ nav.appendChild(link(c)); });
    });
    if (blocks.length){
      var det = kit.el("details", { "class": "pg-nav-blocks" });
      if (blocksOpen || q || blocks.some(function(c){ return c.id === currentId(); })) det.open = true;
      det.addEventListener("toggle", function(){ blocksOpen = det.open; });
      det.appendChild(kit.el("summary", { text: "Building blocks (" + blocks.length + ")" }));
      var ul = kit.el("ul", { "class": "pg-nav" });
      blocks.forEach(function(c){ ul.appendChild(link(c)); });
      det.appendChild(ul);
      nav.appendChild(kit.el("li", null, [det]));
    }
    if (!shown.length) nav.appendChild(kit.el("li", { "class": "pg-nav-empty", text: "Nenhum componente encontrado." }));
    markCurrent();
  }
  function markCurrent(){
    var cur = currentId();
    nav.querySelectorAll("a").forEach(function(a){
      if (a.getAttribute("href") === "#/" + cur) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  search.addEventListener("input", function(){ buildNav(search.value); });

  // ---------- Roteamento: #/<id> ou #/<id>/<tab> ----------
  function route(){ return (location.hash || "").replace(/^#\/?/, "").split("/"); }
  function currentId(){
    var id = route()[0];
    return list.some(function(c){ return c.id === id; }) ? id : (list.filter(function(c){ return !c.block; })[0] || list[0]).id;
  }
  function currentTab(){
    var doc = CDS.docs && CDS.docs[currentId()], t = route()[1];
    return doc && doc.tabs.some(function(x){ return x.id === t; }) ? t : "playground";
  }

  // ---------- Tabs (só quando o componente tem *.docs.js) ----------
  function buildTabs(id){
    var doc = CDS.docs && CDS.docs[id];
    tabsEl.innerHTML = "";
    tabsEl.hidden = !doc || !CDS.renderDoc;
    if (tabsEl.hidden) return;
    [{ id: "playground", title: "Playground" }].concat(doc.tabs).forEach(function(t){
      var b = kit.el("button", { type: "button", role: "tab", "class": "pg-tab", id: "tab-" + t.id, "data-tab": t.id, text: t.title });
      b.addEventListener("click", function(){ location.hash = "#/" + id + (t.id === "playground" ? "" : "/" + t.id); });
      tabsEl.appendChild(b);
    });
  }
  // Setas/Home/End movem entre as tabs (padrão WAI-ARIA, ativação automática)
  tabsEl.addEventListener("keydown", function(e){
    var tabs = Array.prototype.slice.call(tabsEl.querySelectorAll('[role="tab"]')), i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    var j = e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : -1;
    if (j < 0) return;
    e.preventDefault(); tabs[j].focus(); tabs[j].click();
  });
  function applyTab(){
    var id = currentId(), tab = currentTab(), doc = CDS.docs && CDS.docs[id];
    var isDoc = !tabsEl.hidden && tab !== "playground";
    tabsEl.querySelectorAll('[role="tab"]').forEach(function(b){
      var on = b.dataset.tab === tab;
      b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1;
    });
    if (tabsEl.hidden){ stage.removeAttribute("role"); stage.removeAttribute("aria-labelledby"); }
    else { stage.setAttribute("role", "tabpanel"); stage.setAttribute("aria-labelledby", "tab-playground"); }
    shell.classList.toggle("is-doc", isDoc);
    docsEl.hidden = !isDoc;
    if (isDoc){ docsEl.setAttribute("aria-labelledby", "tab-" + tab); CDS.renderDoc(doc, tab, docsEl); docsEl.scrollTop = 0; }
    else docsEl.innerHTML = "";
  }

  var mountedId = null;
  function onRoute(){
    var id = currentId();
    if (id !== mountedId){ mount(); mountedId = id; }
    applyTab();
  }
  function mount(){
    var def = list.filter(function(c){ return c.id === currentId(); })[0];
    buildTabs(def.id);
    preview.innerHTML = ""; panel.innerHTML = "";
    title.textContent = def.name;
    document.title = def.name + " — Castanha DS";
    links.innerHTML = "";
    if (def.task) links.appendChild(kit.el("a", { href: JIRA + def.task, target: "_blank", rel: "noopener", text: def.task }));
    if (def.figma) links.appendChild(kit.el("a", { href: def.figma, target: "_blank", rel: "noopener", text: "Figma" }));
    if (def.zeroheight) links.appendChild(kit.el("a", { href: def.zeroheight, target: "_blank", rel: "noopener", text: "Zeroheight" }));
    readout("", false);
    def.mount({ preview: preview, panel: panel, kit: kit, readout: readout });
    markCurrent();
  }
  window.addEventListener("hashchange", onRoute);

  function readout(value, done){ rval.textContent = value || "—"; rdone.textContent = done ? "✓ completo" : ""; }

  // ---------- Viewport (global) ----------
  // data-viewport espelha a collection Viewport do Figma (Desktop/Tablet/Mobile); componentes leem via CSS
  function setViewport(w){
    frame.dataset.viewport = w === "360" ? "mobile" : w === "744" ? "tablet" : "desktop";
    if (w === "fluid"){ frame.style.width = "100%"; frame.style.maxWidth = "600px"; vpOut.textContent = "fluido"; }
    else { frame.style.width = w + "px"; frame.style.maxWidth = "none"; vpOut.textContent = w + "px"; }
  }
  kit.seg($("viewport"), { label: "Viewport", value: "fluid", options: [["360","360"],["744","744"],["1366","1366"],["fluid","Fluido"]], onChange: setViewport });

  // ---------- Tema — light padrão, dark opcional ----------
  var root = document.documentElement, tbtn = $("theme"), ticon = $("theme-icon");
  var SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  function paintTheme(){
    var dark = root.getAttribute("data-theme") === "dark";
    ticon.innerHTML = dark ? MOON : SUN;
    tbtn.setAttribute("aria-pressed", String(dark));
    tbtn.setAttribute("aria-label", dark ? "Ativar tema claro" : "Ativar tema escuro");
  }
  tbtn.addEventListener("click", function(){
    root.setAttribute("data-theme", root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    paintTheme();
  });

  paintTheme(); buildNav(); setViewport("fluid"); onRoute();
})();
