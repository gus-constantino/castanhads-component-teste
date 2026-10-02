/**
 * @deps breadcrumb-item popover
 * <cds-breadcrumb> — Breadcrumb · Navigation · set 6792:24
 * Caminho de páginas: <nav aria-label="Breadcrumb"><ol> com um .Item por nível.
 * Como no Figma: o 1º item é Truncate (…), que abre um Popover com os níveis escondidos (Show Popover).
 *
 * Uso: filhos <a href="…">Nível</a> (o último é a página atual: aria-current) ou nada (amostra do Figma).
 *   collapse — quantos níveis iniciais ficam no Popover do "…" · padrão 1 com filhos; "0" desliga o Truncate
 * Atributos da amostra: show-item03…show-item06 (showItem03–06 no Figma, C25) · show-popover · label ("Breadcrumb")
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsBreadcrumb extends CDS.Element {
    static get observedAttributes(){ return ["collapse","show-item03","show-item04","show-item05","show-item06","show-popover","label"]; }
    render(){
      var self = this;
      if (this._sync && this._built) return; // só refletindo o estado do Popover no atributo
      if (!this._built){
        this._built = true; this._id = "cds-bcr-" + (++uid);
        this._links = [].slice.call(this.querySelectorAll(":scope > a")).map(function(a){ return { label: a.textContent.trim(), href: a.getAttribute("href"), active: a.hasAttribute("aria-current") }; });
        this.innerHTML = "";
        this.navEl = this.appendChild(CDS.create("nav", null, "cds-bcr"));
        this.listEl = this.navEl.appendChild(CDS.create("ol", null, "cds-bcr__list"));
        // a lista entra antes de o Popover conectar: no connect ele move os filhos para o Slot
        this.pop = CDS.create("cds-popover", { placement: "bottom-start", label: "Níveis anteriores" }, "cds-bcr__popover");
        this.popList = this.pop.appendChild(CDS.create("ul", null, "cds-bcr__poplist"));
        this.appendChild(this.pop);
        this.pop.addEventListener("cds-toggle", function(e){
          e.stopPropagation();
          var b = self.truncEl && self.truncEl.control; if (b) b.setAttribute("aria-expanded", String(e.detail.open));
          self._sync = true; self.toggleAttribute("show-popover", e.detail.open); self._sync = false;
        });
      }
      this.navEl.setAttribute("aria-label", this.getAttribute("label") || "Breadcrumb");
      var items = this.model(), list = this.listEl, pl = this.popList;
      list.innerHTML = ""; pl.innerHTML = "";
      items.visible.forEach(function(it, i){
        var li = list.appendChild(CDS.create("li", null, "cds-bcr__li"));
        var n = CDS.create("cds-breadcrumb-item", { kind: it.truncate ? "truncate" : null, label: it.label, href: it.href, "is-active": it.active ? "" : null, current: it.current ? "" : null, "has-separator": i === 0 ? "false" : null });
        if (it.hidden) li.hidden = true;
        li.appendChild(n);
        if (it.truncate) self.truncEl = n;
      });
      items.collapsed.forEach(function(it){
        var li = pl.appendChild(CDS.create("li"));
        li.appendChild(CDS.create("cds-breadcrumb-item", { label: it.label, href: it.href || "#", "has-separator": "false" }));
      });
      // o Truncate abre o Popover
      if (this.truncEl){
        var t = this.truncEl;
        var b = t.control;
        if (b){ if ("popoverTargetElement" in b) b.popoverTargetElement = this.pop; b.setAttribute("aria-haspopup", "true"); b.setAttribute("aria-expanded", String(this.pop.matches(":popover-open"))); b.setAttribute("aria-controls", this.pop.id || (this.pop.id = this._id + "-pop")); }
        this.pop._trigger = t;
      }
      var want = this.hasAttribute("show-popover") && !!this.truncEl;
      if (!this._sync && this.pop.isConnected){
        if (want && !this.pop.matches(":popover-open")){ this.pop.show(); this.pop.place(); } else if (!want && this.pop.matches(":popover-open")) this.pop.hide();
      }
    }
    model(){
      var links = this._links, visible = [], collapsed = [];
      if (links.length){
        var k = this.hasAttribute("collapse") ? Math.max(0, parseInt(this.getAttribute("collapse"), 10) || 0) : (links.length > 2 ? 1 : 0);
        k = Math.min(k, links.length - 1);
        if (k) visible.push({ truncate: true });
        collapsed = links.slice(0, k);
        links.slice(k).forEach(function(l, i, arr){ var last = i === arr.length - 1; visible.push({ label: l.label, href: last ? null : l.href, current: last, active: last || l.active }); });
      } else {
        // amostra do Figma: Item 1 Truncate · Item 2 e Item 6 Is Active · Items 3–6 controlados por showItem03–06
        visible.push({ truncate: true });
        for (var i = 2; i <= 6; i++) visible.push({ label: "Label", href: "#", active: i === 2 || i === 6, hidden: i >= 3 && !this.flag("show-item0" + i) });
        collapsed = [{ label: "Label" }, { label: "Label" }];
      }
      return { visible: visible, collapsed: collapsed };
    }
  }
  CdsBreadcrumb.define("cds-breadcrumb");
})();
