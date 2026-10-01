/**
 * <cds-currency-content> — .Currency Content (building block, usado em listas e tabelas)
 * Atributos (padrões do Figma):
 *   value                 · padrão "30.000,00"
 *   symbol                Currency Symbol · padrão "R$"
 *   show-negative-symbol  padrão ligado ("false" desliga)
 *   description           Text Description · padrão "Description"
 *   show-description      padrão ligado ("false" desliga)
 */
(function(){
  "use strict";
  class CdsCurrencyContent extends HTMLElement {
    static get observedAttributes(){ return ["value", "symbol", "show-negative-symbol", "description", "show-description"]; }
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    render(){
      var neg = this.getAttribute("show-negative-symbol") !== "false";
      this.innerHTML = "";
      var row = document.createElement("span"); row.className = "cds-cc2__row";
      var sym = document.createElement("span"); sym.textContent = (neg ? "-" : "") + (this.getAttribute("symbol") || "R$");
      var val = document.createElement("span"); val.textContent = this.hasAttribute("value") ? this.getAttribute("value") : "30.000,00";
      row.appendChild(sym); row.appendChild(val); this.appendChild(row);
      if (this.getAttribute("show-description") !== "false"){
        var d = document.createElement("span"); d.className = "cds-cc2__desc"; d.textContent = this.hasAttribute("description") ? this.getAttribute("description") : "Description"; this.appendChild(d);
      }
    }
  }
  if (!customElements.get("cds-currency-content")) customElements.define("cds-currency-content", CdsCurrencyContent);
})();
