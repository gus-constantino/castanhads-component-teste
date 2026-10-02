/**
 * @deps select-number divider icon-button
 * <cds-pagination> — Pagination · Navigation · componente 13408:1416
 * Esquerda: "Itens por página:" + .Select Number + Divider | "1-10 de 250 itens".
 * Direita: .Select Number (página) + "páginas de" + "100" + Divider | ‹ › (Icon Button Ghost Neutral Medium).
 * Os textos seguem a ordem do Figma ("[n] páginas de 100", C47).
 *
 * Atributos: page (1) · per-page (10) · per-page-options ("10,20,30,40,50") · total (Items display · 250)
 *   pages (Page number · 100; sem ele, calcula de total/per-page) · items-range (texto fixo; sem ele, calcula · "1-10")
 *   show-items-per-page · show-item-display · show-rows-per-page · label ("Paginação")
 * Eventos: cds-page-change { page } · cds-per-page-change { perPage }
 */
(function(){
  "use strict";
  function num(v, d){ var n = parseInt(v, 10); return isNaN(n) ? d : n; }
  class CdsPagination extends CDS.Element {
    static get observedAttributes(){ return ["page","per-page","per-page-options","total","pages","items-range","show-items-per-page","show-item-display","show-rows-per-page","label"]; }
    get perPage(){ return Math.max(1, num(this.getAttribute("per-page"), 10)); }
    get total(){ return Math.max(0, num(this.getAttribute("total"), 250)); }
    get pages(){ return Math.max(1, this.hasAttribute("pages") ? num(this.getAttribute("pages"), 1) : (this.hasAttribute("total") ? Math.ceil(this.total / this.perPage) : 100)); }
    get page(){ return Math.min(Math.max(1, num(this.getAttribute("page"), 1)), this.pages); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        var t = function(cls, txt){ return CDS.create("span", null, cls); };
        var left = this.appendChild(CDS.create("div", null, "cds-pg__group"));
        var ipp = this.ippEl = left.appendChild(CDS.create("div", null, "cds-pg__part"));
        ipp.appendChild(CDS.create("span", null, "cds-pg__txt")).textContent = "Itens por página:";
        this.perSel = ipp.appendChild(CDS.create("cds-select-number", { label: "Itens por página" }));
        ipp.appendChild(CDS.create("cds-divider", { orientation: "vertical", intensity: "medium" }, "cds-pg__div"));
        var disp = this.dispEl = left.appendChild(CDS.create("div", { "aria-live": "polite" }, "cds-pg__part cds-pg__display"));
        this.rangeEl = disp.appendChild(t("cds-pg__strong")); disp.appendChild(t("cds-pg__strong")).textContent = "de";
        this.totalEl = disp.appendChild(t("cds-pg__strong")); disp.appendChild(t("cds-pg__strong")).textContent = "itens";
        var right = this.appendChild(CDS.create("div", null, "cds-pg__group"));
        var rpp = this.rppEl = right.appendChild(CDS.create("div", null, "cds-pg__part"));
        this.pageSel = rpp.appendChild(CDS.create("cds-select-number", { label: "Página" }));
        rpp.appendChild(CDS.create("span", null, "cds-pg__txt")).textContent = "páginas";
        rpp.appendChild(CDS.create("span", null, "cds-pg__txt")).textContent = "de";
        var tp = rpp.appendChild(CDS.create("span", null, "cds-pg__total"));
        this.pagesEl = tp.appendChild(CDS.create("span", null, "cds-pg__txt"));
        tp.appendChild(CDS.create("cds-divider", { orientation: "vertical", intensity: "medium" }, "cds-pg__div"));
        var nav = right.appendChild(CDS.create("div", null, "cds-pg__nav"));
        this.prevBtn = nav.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "medium", icon: "navigation-left-line", label: "Página anterior" }));
        this.nextBtn = nav.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "medium", icon: "navigation-right-line", label: "Próxima página" }));
        this.prevBtn.addEventListener("click", function(){ self.go(self.page - 1); });
        this.nextBtn.addEventListener("click", function(){ self.go(self.page + 1); });
        this.pageSel.addEventListener("cds-change", function(e){ e.stopPropagation(); self.go(parseInt(e.detail.value, 10)); });
        this.perSel.addEventListener("cds-change", function(e){
          e.stopPropagation(); self.setAttribute("per-page", e.detail.value); self.setAttribute("page", "1");
          self.dispatchEvent(new CustomEvent("cds-per-page-change", { detail: { perPage: parseInt(e.detail.value, 10) }, bubbles: true }));
        });
      }
      var page = this.page, per = this.perPage, total = this.total, pages = this.pages;
      this.setAttribute("role", "navigation"); CDS.attr(this, "aria-label", this.getAttribute("label") || "Paginação");
      this.ippEl.hidden = !this.flag("show-items-per-page");
      this.dispEl.hidden = !this.flag("show-item-display");
      this.rppEl.hidden = !this.flag("show-rows-per-page");
      CDS.attr(this.perSel, "value", String(per));
      CDS.attr(this.perSel, "options", this.getAttribute("per-page-options") || "10,20,30,40,50");
      CDS.attr(this.pageSel, "value", String(page));
      var opts = []; for (var i = 1; i <= pages; i++) opts.push(i); CDS.attr(this.pageSel, "options", opts.join(","));
      this.rangeEl.textContent = this.hasAttribute("items-range") ? this.getAttribute("items-range") : (total ? ((page - 1) * per + 1) + "-" + Math.min(page * per, total) : "0");
      this.totalEl.textContent = String(total);
      this.pagesEl.textContent = String(pages);
      CDS.attr(this.prevBtn, "disabled", page <= 1 ? "" : null); // nos limites: sem especificação (C52)
      CDS.attr(this.nextBtn, "disabled", page >= pages ? "" : null);
    }
    go(p){
      p = Math.min(Math.max(1, p), this.pages); if (p === this.page) return;
      this.setAttribute("page", String(p));
      this.dispatchEvent(new CustomEvent("cds-page-change", { detail: { page: p }, bubbles: true }));
    }
  }
  CdsPagination.define("cds-pagination");
})();
