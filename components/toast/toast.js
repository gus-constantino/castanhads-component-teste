/**
 * @deps icon close-toast
 * <cds-toast> — Toast · Feedback · set 5234:516
 * Mensagem curta sobre Surface/inversed. Desktop: ícone · texto · .Close Toast em linha. Mobile (Viewport):
 * ícone e fechar no topo, texto embaixo.
 *
 * Atributos: appearance (positive|warning) · text (Text Description, até 2 linhas) · show-trailing-item (.Close Toast)
 *   close-label · viewport (desktop|tablet|mobile — força o modo)
 * Eventos: cds-close (cancelável). Sem preventDefault(), o toast se remove do DOM.
 * A11y: role="status" (Positive) ou role="alert" (Warning).
 */
(function(){
  "use strict";
  var ICON = { positive: "positive-line", warning: "warning-line" };
  class CdsToast extends CDS.Element {
    static get observedAttributes(){ return ["appearance", "text", "show-trailing-item", "close-label"]; }
    get appearance(){ return this.getAttribute("appearance") === "warning" ? "warning" : "positive"; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.iconWrap = this.appendChild(CDS.create("span", null, "cds-toast__icon"));
        this.iconEl = this.iconWrap.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-icon"));
        this.textEl = this.appendChild(CDS.create("p", null, "cds-toast__text"));
        this.closeEl = this.appendChild(CDS.create("cds-close-toast"));
        this.closeEl.addEventListener("click", function(){ self.close(); });
      }
      this.setAttribute("role", this.appearance === "warning" ? "alert" : "status");
      this.iconEl.className = "cds-icon cds-icon--" + ICON[this.appearance];
      this.textEl.textContent = this.text("text", "A descrição web ou mobile deve ter no máximo 2 linhas");
      this.closeEl.hidden = !this.flag("show-trailing-item");
      this.closeEl.setAttribute("label", this.getAttribute("close-label") || "Fechar mensagem");
    }
    close(){
      var ev = new CustomEvent("cds-close", { bubbles: true, cancelable: true });
      if (this.dispatchEvent(ev)) this.remove();
    }
  }
  CdsToast.define("cds-toast");
})();
