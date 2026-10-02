/**
 * @deps selection-list-item
 * <cds-selection-list> — Selection List · Lists · set 5488:1552 (Kind Default|Card)
 * Pilha de Selection List Items (Trailing Item=Chechbox, Show Divider ligado). Kind=Default: sem gap · Card: gap 8.
 * Uso: filhos <cds-selection-list-item> (a lista repassa kind) ou nada (amostra: 12 itens).
 * Atributos: kind · label (nome do grupo) · count (12) · trailing-item (repassado aos itens da amostra)
 * Acessibilidade: role="group" com o label; cada item é um controle nativo nomeado pela linha.
 * Evento: cds-change { values } — rótulos (ou value) dos itens ativos, a cada mudança
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsSelectionList extends CDS.Element {
    static get observedAttributes(){ return ["kind", "label", "count", "trailing-item"]; }
    get items(){ return [].slice.call(this.querySelectorAll(":scope > cds-selection-list-item")); }
    get values(){ return this.items.filter(function(i){ return i.active; }).map(function(i){ return i.getAttribute("value") || i.getAttribute("label") || "Label"; }); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.setAttribute("role", "group");
        if (!this.items.length){ this._sample = true; this._name = "cds-sl-" + (++uid); }
        this.addEventListener("cds-change", function(e){ if (e.target === self) return; e.stopImmediatePropagation(); self.dispatchEvent(new CustomEvent("cds-change", { detail: { values: self.values }, bubbles: true })); });
      }
      var kind = this.getAttribute("kind") === "card" ? "card" : null;
      if (this._sample){
        var n = Math.max(1, parseInt(this.getAttribute("count"), 10) || 12);
        while (this.items.length < n) this.appendChild(CDS.create("cds-selection-list-item", { name: this._name }));
        while (this.items.length > n) this.lastElementChild.remove();
        var t = this.getAttribute("trailing-item"); this.items.forEach(function(c){ CDS.attr(c, "trailing-item", t); });
      }
      CDS.attr(this, "aria-label", this.getAttribute("label") || "Seleção");
      this.items.forEach(function(c){ CDS.attr(c, "kind", kind); });
    }
  }
  CdsSelectionList.define("cds-selection-list");
})();
