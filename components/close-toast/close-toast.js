/**
 * @deps icon
 * <cds-close-toast> — .Close Toast · building block · set 5219:558
 * Botão de fechar 40×40 com close-line (20px). States Enabled/Hovered/Pressed/Disabled via interação.
 * Atributos: label (nome acessível, padrão "Fechar") · disabled · state (forçado: hovered|pressed, para specimens)
 * O click nativo sobe do <button> interno.
 */
(function(){
  "use strict";
  class CdsCloseToast extends CDS.Element {
    static get observedAttributes(){ return ["label", "disabled"]; }
    render(){
      if (!this._btn){
        this._btn = CDS.create("button", { type: "button" }, "cds-close");
        var ic = CDS.create("cds-icon", { icon: "close-line", size: "medium" }); this._btn.appendChild(ic);
        this.appendChild(this._btn);
      }
      this._btn.setAttribute("aria-label", this.getAttribute("label") || "Fechar");
      this._btn.disabled = this.hasAttribute("disabled");
    }
  }
  CdsCloseToast.define("cds-close-toast");
})();
