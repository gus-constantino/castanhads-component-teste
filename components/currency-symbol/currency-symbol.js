/**
 * <cds-currency-symbol> — .Currency Symbol (building block, usado na Table)
 * Atributo: currency (id kebab-case do Figma) · padrão brazil-real
 */
(function(){
  "use strict";
  var SYMBOLS = {
    "brazil-real": "R$", "us-dollar": "$", "euro": "€", "british-pound": "£", "japanese-yen": "¥", "chinese-yuan": "CN¥",
    "canadian-dollar": "CA$", "australian-dollar": "A$", "swiss-franc": "CHF", "indian-rupee": "₹", "south-korean-won": "₩",
    "mexican-peso": "Mex$", "russian-ruble": "₽", "south-african-rand": "R", "turkish-lira": "₺", "swedish-krona": "kr",
    "norwegian-krone": "kr", "danish-krone": "kr", "singapore-dollar": "S$", "hong-kong-dollar": "HK$"
  };
  class CdsCurrencySymbol extends HTMLElement {
    static get observedAttributes(){ return ["currency"]; }
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    render(){ this.textContent = SYMBOLS[this.getAttribute("currency")] || SYMBOLS["brazil-real"]; }
  }
  CdsCurrencySymbol.SYMBOLS = SYMBOLS;
  if (!customElements.get("cds-currency-symbol")) customElements.define("cds-currency-symbol", CdsCurrencySymbol);
})();
