/**
 * @deps content-list-item
 * <cds-content-list> — Content List · Lists · set 5488:1482 (Kind × Intent)
 * Pilha de Content List Items. Kind=Default: sem gap, itens com Show Divider desligado · Kind=Card: gap 8.
 * Intent da lista → Intent dos itens: Default → Default (Show Trailing Item desligado) · Navigation → Navigation ·
 *   Switch → Transaction (como no Figma, C54).
 * Uso: filhos <cds-content-list-item> (a lista repassa kind e intent) ou nada (amostra: 12 itens).
 * Atributos: kind (default|card) · intent (default|switch|navigation) · label (nome da lista) · count (itens da amostra · 12)
 */
(function(){
  "use strict";
  var INTENT = { "default": "default", "navigation": "navigation", "switch": "transaction" };
  class CdsContentList extends CDS.Element {
    static get observedAttributes(){ return ["kind", "intent", "label", "count"]; }
    get items(){ return [].slice.call(this.querySelectorAll(":scope > cds-content-list-item")); }
    render(){
      if (!this._built){
        this._built = true; this.setAttribute("role", "list");
        if (!this.items.length){ this._sample = true; }
      }
      var kind = this.getAttribute("kind") === "card" ? "card" : "default", li = this.getAttribute("intent"), it = INTENT[li] || "default";
      if (this._sample){
        var n = Math.max(1, parseInt(this.getAttribute("count"), 10) || 12);
        while (this.items.length < n) this.appendChild(CDS.create("cds-content-list-item"));
        while (this.items.length > n) this.lastElementChild.remove();
      }
      CDS.attr(this, "aria-label", this.getAttribute("label"));
      this.items.forEach(function(c){
        CDS.attr(c, "role", "listitem");
        CDS.attr(c, "kind", kind === "card" ? "card" : null);
        CDS.attr(c, "intent", it === "default" ? null : it);
        CDS.attr(c, "show-divider", kind === "card" ? null : "false");  // como nas instâncias do Figma
        if (it === "default") CDS.attr(c, "show-trailing-item", "false");
      });
    }
  }
  CdsContentList.define("cds-content-list");
})();
