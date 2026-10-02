/**
 * @deps main-button divider
 * <cds-footer> — .Footer (Modal / Bottom Sheet) · building block · set 16359:1792
 * Divider + Actions: Main Button Neutral (secundária) e Accent (primária).
 * Kind=Horizontal: lado a lado, largura do conteúdo · Kind=Pilled: empilhados, largura total.
 * Atributos: kind (horizontal|pilled · padrão pilled, como no Figma) · show-divider · show-secondary-action-button
 *   primary-label · secondary-label ("Label") · show-lead-icon (Lead Icon dos botões, ligado como no Figma)
 *   primary-icon · secondary-icon
 * Eventos: cds-action { action: "primary" | "secondary" }
 */
(function(){
  "use strict";
  class CdsFooter extends CDS.Element {
    static get observedAttributes(){ return ["kind","show-divider","show-secondary-action-button","show-secondary-action","primary-label","secondary-label","show-lead-icon","primary-icon","secondary-icon"]; }
    get secondaryFlag(){ return this.flag("show-secondary-action-button") && this.flag("show-secondary-action"); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.divEl = this.appendChild(CDS.create("cds-divider", { intensity: "soft" }));
        var a = this.actionsEl = this.appendChild(CDS.create("div", null, "cds-footer__actions"));
        this.secEl = a.appendChild(CDS.create("cds-main-button", { appearance: "neutral", "show-trailing-icon": "false" }));
        this.priEl = a.appendChild(CDS.create("cds-main-button", { appearance: "accent", "show-trailing-icon": "false" }));
        this.secEl.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-action", { detail: { action: "secondary" }, bubbles: true })); });
        this.priEl.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-action", { detail: { action: "primary" }, bubbles: true })); });
      }
      if (!this.hasAttribute("kind")) this.setAttribute("kind", this.defaultKind);
      this.divEl.hidden = !this.flag("show-divider");
      this.secEl.hidden = !this.secondaryFlag;
      var lead = this.flag("show-lead-icon") ? null : "false";
      [[this.priEl, "primary"], [this.secEl, "secondary"]].forEach(function(x){
        x[0].setAttribute("label", self.text(x[1] + "-label", "Label"));
        if (lead) x[0].setAttribute("show-lead-icon", lead); else x[0].removeAttribute("show-lead-icon");
        x[0].setAttribute("lead-icon", self.getAttribute(x[1] + "-icon") || "placeholder-line");
      });
    }
    get defaultKind(){ return "pilled"; }
  }
  CDS.Footer = CdsFooter;
  CdsFooter.define("cds-footer");
})();
