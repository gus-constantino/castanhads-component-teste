/**
 * <cds-currency> — Currency · Content · set 5301:2173
 *
 * Atributos (padrões do Figma):
 *   value       valor formatado · padrão "100,00"
 *   symbol      símbolo da moeda · padrão "R$"
 *   appearance  neutral | inversed · padrão neutral
 *   size        small | medium | large | largest · padrão small
 *   show-value  "false" mascara o valor com 5 pontos (o leitor de tela ouve "valor oculto")
 */
(function(){
  "use strict";
  class CdsCurrency extends HTMLElement {
    static get observedAttributes(){ return ["value", "symbol", "show-value"]; }
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    render(){
      var symbol = this.getAttribute("symbol") || "R$", value = this.hasAttribute("value") ? this.getAttribute("value") : "100,00";
      var shown = this.getAttribute("show-value") !== "false";
      this.innerHTML = "";
      var s = document.createElement("span"); s.textContent = symbol; this.appendChild(s);
      if (shown){ var v = document.createElement("span"); v.textContent = value; this.appendChild(v); this.removeAttribute("aria-label"); this.removeAttribute("role"); }
      else {
        var d = document.createElement("span"); d.className = "cds-cur__dots"; d.setAttribute("aria-hidden", "true");
        for (var i = 0; i < 5; i++) d.appendChild(document.createElement("i"));
        this.appendChild(d);
        this.setAttribute("role", "img"); this.setAttribute("aria-label", symbol + " valor oculto");
      }
    }
  }
  if (!customElements.get("cds-currency")) customElements.define("cds-currency", CdsCurrency);
})();
