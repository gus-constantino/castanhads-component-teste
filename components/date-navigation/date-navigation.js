/**
 * @deps icon-button main-button
 * <cds-date-navigation> — .Navigation Control (Datepicker) · .Building Blocks · componente 17465:384
 * Left Control (Icon Button Ghost Neutral Small · navigation-left-line) · First Month · Year · Trailing Month
 * (Main Button Ghost Neutral Small) · Right Control. SPACE_BETWEEN · 40 de altura.
 * Atributos: first-month ("Janeiro") · year ("2026") · trailing-month ("Fevereiro")
 *   show-left-control · show-first-month · show-year · show-trailing-month · show-right-control (todos ligados, como no Figma)
 * Eventos: cds-prev · cds-next · cds-month { which: "first"|"trailing" } · cds-year
 */
(function(){
  "use strict";
  class CdsDateNavigation extends CDS.Element {
    static get observedAttributes(){ return ["first-month","year","trailing-month","show-left-control","show-first-month","show-year","show-trailing-month","show-right-control"]; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        var fire = function(n, d){ return function(){ self.dispatchEvent(new CustomEvent(n, { detail: d || {}, bubbles: true })); }; };
        this.left = this.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: "navigation-left-line", label: "Mês anterior" }));
        this.first = this.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "neutral", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }, "cds-dn__btn"));
        this.yearBtn = this.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "neutral", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }, "cds-dn__btn"));
        this.trail = this.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "neutral", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }, "cds-dn__btn"));
        this.right = this.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: "navigation-right-line", label: "Próximo mês" }));
        this.left.addEventListener("click", fire("cds-prev")); this.right.addEventListener("click", fire("cds-next"));
        this.first.addEventListener("click", fire("cds-month", { which: "first" })); this.trail.addEventListener("click", fire("cds-month", { which: "trailing" }));
        this.yearBtn.addEventListener("click", fire("cds-year"));
      }
      CDS.attr(this.first, "label", this.text("first-month", "Janeiro"));
      CDS.attr(this.yearBtn, "label", this.text("year", "2026"));
      CDS.attr(this.trail, "label", this.text("trailing-month", "Fevereiro"));
      this.left.hidden = !this.flag("show-left-control"); this.right.hidden = !this.flag("show-right-control");
      this.first.hidden = !this.flag("show-first-month"); this.yearBtn.hidden = !this.flag("show-year"); this.trail.hidden = !this.flag("show-trailing-month");
    }
  }
  CdsDateNavigation.define("cds-date-navigation");
})();
