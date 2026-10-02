/**
 * @deps list-lead-item text-content divider
 * CDS.ListItem — base de Selection List Item e Content List Item (não é um elemento registrado).
 *
 * Anatomia comum (Lists): Container (H · gap 12 · min 44) [.Lead Item] Items(.Text Content …) [trailing] + Divider (Soft).
 * A linha é um elemento interno (.cds-li): <a> com href, <button>, <div> que repassa o clique ao controle do
 * .Trailing Item, ou role="option" quando está num listbox (Select Inputs).
 *
 * Atributos comuns (padrões do Figma):
 *   kind (default|card) · disabled · show-lead-item · show-divider
 *   label ("Label") · description ("Description") · show-description
 *   lead-kind (avatar|icon|image · padrão icon, como nas listas) · lead-icon · lead-label · lead-src
 *   option — modo listbox: role=option, aria-selected = is-active; o controle do trailing vira só visual
 *   state="hovered|pressed" — estados forçados para specimens (só CSS)
 * Subclasse: buildItems(items, container) · updateItems() · get rowMode() → "control" | "button" | "link" | "static"
 */
(function(){
  "use strict";
  var uid = 0;
  class ListItem extends CDS.Element {
    static get observedAttributes(){ return ["kind","disabled","show-lead-item","show-divider","label","description","show-description","lead-kind","lead-icon","lead-label","lead-src","option","href","is-active"]; }
    constructor(){ super(); this._uid = "cds-li-" + (++uid); }
    get rowMode(){ return "static"; }
    get optionMode(){ return this.hasAttribute("option"); }
    buildItems(items, container){}
    updateItems(){}
    rowTag(mode){ return this.optionMode ? "div" : mode === "link" ? "a" : mode === "button" ? "button" : "div"; }

    render(){
      var mode = this.optionMode ? "option" : this.rowMode;
      if (this._mode !== mode){ this._mode = mode; this.build(mode); }
      this.update();
    }
    build(mode){
      var self = this;
      this.innerHTML = "";
      var row = this.row = CDS.create(this.rowTag(mode), null, "cds-li");
      if (row.tagName === "BUTTON") row.type = "button";
      var c = this.container = row.appendChild(CDS.create("div", null, "cds-li__container"));
      this.leadEl = c.appendChild(CDS.create("cds-list-lead-item", null, "cds-li__lead"));
      var items = this.itemsEl = c.appendChild(CDS.create("div", null, "cds-li__items"));
      this.textEl = items.appendChild(CDS.create("cds-text-content", { id: this._uid + "-text" }, "cds-li__text"));
      this.buildItems(items, c);
      this.divEl = row.appendChild(CDS.create("cds-divider", { intensity: "soft" }, "cds-li__divider"));
      this.appendChild(row);
      if (mode === "control"){
        // A linha inteira aciona o controle nativo do .Trailing Item (sem <label> aninhado)
        row.addEventListener("click", function(e){
          var input = self.controlInput; if (!input || self.hasAttribute("disabled")) return;
          if (e.target === input || (e.target.closest && e.target.closest(".cds-sc"))) return; // o próprio controle já trata
          input.click();
        });
      }
    }
    get controlInput(){ return null; }
    update(){
      var row = this.row, kind = this.getAttribute("kind") === "card" ? "card" : "default", dis = this.hasAttribute("disabled");
      if (this.getAttribute("kind") !== kind && this.hasAttribute("kind")) CDS.attr(this, "kind", kind);
      CDS.attr(this.textEl, "label", this.text("label", "Label"));
      CDS.attr(this.textEl, "description", this.text("description", "Description"));
      CDS.attr(this.textEl, "show-description", String(this.flag("show-description")));
      var lk = this.getAttribute("lead-kind") || this.defaultLeadKind;
      CDS.attr(this.leadEl, "kind", lk);
      [["lead-icon","icon"],["lead-label","label"],["lead-src","src"]].forEach(function(p){ var v = this.getAttribute(p[0]); if (v != null) CDS.attr(this.leadEl, p[1], v); else this.leadEl.removeAttribute(p[1]); }, this);
      this.leadEl.hidden = !this.flag("show-lead-item");
      this.divEl.hidden = kind === "card" || !this.flag("show-divider"); // Card não tem Divider
      if (this._mode === "option"){
        CDS.attr(row, "role", "option"); row.id = this.id ? this.id + "-opt" : this._uid;
        CDS.attr(row, "aria-selected", String(this.hasAttribute("is-active")));
        if (dis) CDS.attr(row, "aria-disabled", "true"); else row.removeAttribute("aria-disabled");
        CDS.attr(row, "aria-labelledby", this.textEl.id);
      } else if (row.tagName === "A"){
        if (dis){ row.removeAttribute("href"); CDS.attr(row, "aria-disabled", "true"); } else { CDS.attr(row, "href", this.getAttribute("href")); row.removeAttribute("aria-disabled"); }
      } else if (row.tagName === "BUTTON") row.disabled = dis;
      this.updateItems();
    }
    get defaultLeadKind(){ return "icon"; }
  }
  CDS.ListItem = ListItem;
})();
