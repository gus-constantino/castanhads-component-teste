/**
 * @deps list-item trailing-item
 * <cds-selection-list-item> — Selection List Item · Lists · set 5488:812 (96 variantes)
 * Item selecionável: Kind (Default|Card) × State × Is Active × Trailing Item (Checkbox|Radio Button|Switch|Tag|Icon|None).
 * Is Active=True: fundo Accent/Solid/soft (Card: stroke Accent/Solid/semi-soft) e o controle do trailing Selected.
 *
 * Atributos: os de CDS.ListItem · is-active · trailing-item (chechbox|checkbox|radio-button|switch|tag|icon|none ·
 *   padrão checkbox; o Figma escreve "Chechbox", C25) · trailing-icon · tag-label · name · value
 * Comportamento: Checkbox/Switch/None/Tag/Icon alternam Is Active no clique; Radio Button seleciona e desmarca
 *   os irmãos com o mesmo name. Com Checkbox/Radio/Switch o foco é o controle nativo, com o nome do Label;
 *   sem controle, a linha é um <button aria-pressed>.
 * Evento: cds-change { active }
 */
(function(){
  "use strict";
  var CONTROLS = { checkbox: 1, "radio-button": 1, "switch": 1 };
  class CdsSelectionListItem extends CDS.ListItem {
    static get observedAttributes(){ return CDS.ListItem.observedAttributes.concat(["trailing-item","trailing-icon","tag-label","name","value"]); }
    get trailingKind(){ var k = (this.getAttribute("trailing-item") || "checkbox").toLowerCase(); if (k === "chechbox") k = "checkbox"; return CONTROLS[k] || k === "tag" || k === "icon" || k === "none" ? k : "checkbox"; }
    get rowMode(){ return CONTROLS[this.trailingKind] ? "control" : "button"; }
    get active(){ return this.hasAttribute("is-active"); }
    set active(v){ this.toggleAttribute("is-active", !!v); }
    get controlInput(){ return this.trailEl && this.trailEl.input; }
    get defaultLeadKind(){ return "icon"; }
    buildItems(items, c){
      var self = this;
      this.trailEl = c.appendChild(CDS.create("cds-trailing-item", null, "cds-li__trail"));
      // controle nativo mudou → reflete em Is Active
      this.trailEl.addEventListener("cds-change", function(e){
        e.stopPropagation(); if (self.optionMode) return;
        self.setActive(e.detail.status === "selected");
      });
      this.row.addEventListener("click", function(e){
        if (self.optionMode || self._mode !== "button" || self.hasAttribute("disabled")) return;
        self.setActive(!self.active);
      });
    }
    setActive(on){
      if (on === this.active) return;
      this.active = on;
      if (on && this.trailingKind === "radio-button" && this.getAttribute("name") && this.parentElement){
        var n = this.getAttribute("name"), me = this;
        this.parentElement.querySelectorAll("cds-selection-list-item[name]").forEach(function(s){ if (s !== me && s.getAttribute("name") === n && s.active) s.active = false; });
      }
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { active: on }, bubbles: true }));
    }
    updateItems(){
      var k = this.trailingKind, t = this.trailEl, row = this.row, self = this;
      t.hidden = k === "none";
      CDS.attr(t, "status", this.active ? "selected" : "unselected"); // status antes de kind (ver CDS.attr)
      if (k !== "none") CDS.attr(t, "kind", k);
      if (this.hasAttribute("disabled")) CDS.attr(t, "disabled", ""); else t.removeAttribute("disabled");
      if (this.getAttribute("trailing-icon")) CDS.attr(t, "icon", this.getAttribute("trailing-icon"));
      if (this.hasAttribute("tag-label")) CDS.attr(t, "tag-label", this.getAttribute("tag-label"));
      ["name","value"].forEach(function(a){ if (self.hasAttribute(a)) CDS.attr(t, a, self.getAttribute(a)); else t.removeAttribute(a); });
      // listbox: o controle é só visual
      t.toggleAttribute("inert", this.optionMode); if (this.optionMode) CDS.attr(t, "aria-hidden", "true"); else t.removeAttribute("aria-hidden");
      if (this._mode === "button") CDS.attr(row, "aria-pressed", String(this.active));
      if (this._mode === "control"){
        var textId = this.textEl.id;
        var input = this.controlInput; if (input){ CDS.attr(input, "aria-labelledby", textId); input.removeAttribute("aria-label"); }
      }
    }
  }
  CdsSelectionListItem.define("cds-selection-list-item");
})();
