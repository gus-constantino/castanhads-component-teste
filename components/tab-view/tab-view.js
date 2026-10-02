/**
 * @deps icon-button
 * <cds-tab-view> — Tab View · Navigation · set 15713:2488 (State × Active Option)
 * Alterna a visualização (lista × grade): dois Icon Buttons Medium; o ativo é Default · Accent, o outro Ghost · Neutral.
 * Container: stroke Border/semi-soft · raio medium · pad 8 · gap 8 · Disabled: Opacity/medium.
 * Atributos: active-option (first|second · padrão first) · disabled
 *   first-icon (view-list-line) · second-icon (view-module-line) · first-label ("Lista") · second-label ("Grade") · label ("Visualização")
 * Acessibilidade: radiogroup com dois radios (setas trocam). Evento: cds-change { option }
 */
(function(){
  "use strict";
  class CdsTabView extends CDS.Element {
    static get observedAttributes(){ return ["active-option","disabled","first-icon","second-icon","first-label","second-label","label"]; }
    get option(){ return this.getAttribute("active-option") === "second" ? "second" : "first"; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.setAttribute("role", "radiogroup");
        this.btns = ["first", "second"].map(function(o){
          var b = self.appendChild(CDS.create("cds-icon-button", { size: "medium" }, "cds-tv__btn"));
          b.dataset.option = o;
          b.addEventListener("click", function(){ self.choose(o, true); });
          return b;
        });
        this.addEventListener("keydown", function(e){
          if (!/^Arrow(Left|Right|Up|Down)$/.test(e.key)) return;
          e.preventDefault(); var o = self.option === "first" ? "second" : "first"; self.choose(o, true);
          var ib = self.btns[o === "first" ? 0 : 1].querySelector("button"); if (ib) ib.focus();
        });
      }
      var cur = this.option, dis = this.hasAttribute("disabled");
      CDS.attr(this, "aria-label", this.getAttribute("label") || "Visualização");
      CDS.attr(this, "aria-disabled", dis ? "true" : null);
      this.btns.forEach(function(b){
        var o = b.dataset.option, on = o === cur;
        CDS.attr(b, "kind", on ? "default" : "ghost"); CDS.attr(b, "appearance", on ? "accent" : "neutral");
        CDS.attr(b, "icon", self.getAttribute(o + "-icon") || (o === "first" ? "view-list-line" : "view-module-line"));
        CDS.attr(b, "label", self.getAttribute(o + "-label") || (o === "first" ? "Lista" : "Grade"));
        CDS.attr(b, "disabled", dis ? "" : null);
        var ib = b.querySelector("button");
        if (ib){ ib.setAttribute("role", "radio"); ib.setAttribute("aria-checked", String(on)); ib.removeAttribute("aria-pressed"); ib.tabIndex = on ? 0 : -1; }
      });
    }
    choose(o, emit){
      if (this.hasAttribute("disabled") || o === this.option) return;
      this.setAttribute("active-option", o);
      if (emit) this.dispatchEvent(new CustomEvent("cds-change", { detail: { option: o }, bubbles: true }));
    }
  }
  CdsTabView.define("cds-tab-view");
})();
