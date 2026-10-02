/**
 * @deps list-item trailing-item tag icon shaped-icon currency-content transaction-status-icon
 * <cds-content-list-item> — Content List Item · Lists · set 5488:675 (20 variantes)
 * Kind (Default|Card) × Intent × State.
 *   Intent=Default:     .Lead Item + .Text Content + .Trailing Item (padrão Checkbox)
 *   Intent=Navigation:  .Lead Item + .Text Content + Tag (Warning) + navigation-right-line
 *   Intent=Transaction: Shaped Icon (Neutral, Small) + .Text Content + .Currency Content + navigation-right-line
 * Container: Kind=Default pad 8 4 · Kind=Card pad 16 16 16 24 (como no Figma, C41).
 *
 * Atributos: os de CDS.ListItem · intent · show-trailing-item · show-navigation-indicator · show-tag
 *   trailing-item (kind do .Trailing Item · checkbox) · status (do controle) · tag-label ("Tag") · tag-appearance (warning)
 *   shaped-icon (placeholder-line) · transaction-status (status do .Transaction Status Icon: troca appearance e ícone) · value ("30.000,00") · symbol ("R$") · show-negative-symbol · value-description
 *   href — a linha vira <a>
 * A linha é <a> com href, <div> que repassa o clique ao controle (Intent=Default com controle), senão <button>.
 * Eventos: cds-change { status } (controle) · click
 */
(function(){
  "use strict";
  var CONTROLS = { checkbox: 1, "radio-button": 1, "switch": 1 };
  class CdsContentListItem extends CDS.ListItem {
    static get observedAttributes(){ return CDS.ListItem.observedAttributes.concat(["intent","transaction-status","show-trailing-item","show-navigation-indicator","show-tag","trailing-item","status","tag-label","tag-appearance","shaped-icon","value","symbol","show-negative-symbol","value-description"]); }
    get intent(){ var i = this.getAttribute("intent"); return i === "navigation" || i === "transaction" ? i : "default"; }
    get trailingKind(){ var k = (this.getAttribute("trailing-item") || "checkbox").toLowerCase(); return k === "chechbox" ? "checkbox" : k; }
    get hasControl(){ return this.intent === "default" && this.flag("show-trailing-item") && !!CONTROLS[this.trailingKind]; }
    get rowMode(){ return this.hasAttribute("href") ? "link" : this.hasControl ? "control" : "button"; }
    get controlInput(){ return this.trailEl && this.trailEl.input; }
    get defaultLeadKind(){ return "icon"; }
    buildItems(items, c){
      this.shapedEl = CDS.create("cds-shaped-icon", { size: "small", appearance: "neutral" }, "cds-li__shaped");
      c.insertBefore(this.shapedEl, this.leadEl.nextSibling);
      this.currencyEl = items.appendChild(CDS.create("cds-currency-content", null, "cds-li__currency"));
      this.trailEl = c.appendChild(CDS.create("cds-trailing-item", null, "cds-li__trail"));
      this.tagEl = c.appendChild(CDS.create("cds-tag", null, "cds-li__tag"));
      this.navEl = c.appendChild(CDS.create("cds-icon", { icon: "navigation-right-line", size: "medium", appearance: "neutral", "aria-hidden": "true" }, "cds-li__nav"));
      var self = this;
      this.trailEl.addEventListener("cds-change", function(e){ e.stopPropagation(); CDS.attr(self, "status", e.detail.status); self.dispatchEvent(new CustomEvent("cds-change", { detail: { status: e.detail.status }, bubbles: true })); });
    }
    updateItems(){
      var i = this.intent, self = this;
      this.leadEl.hidden = i === "transaction" || !this.flag("show-lead-item");
      this.shapedEl.hidden = i !== "transaction" || !this.flag("show-lead-item");
      var ts = this.getAttribute("transaction-status"), M = CDS.TransactionStatus, st = ts && M && M[ts];
      CDS.attr(this.shapedEl, "icon", st ? st[1] : this.getAttribute("shaped-icon") || "placeholder-line");
      CDS.attr(this.shapedEl, "appearance", st ? st[0] : "neutral");
      this.currencyEl.hidden = i !== "transaction";
      if (i === "transaction"){
        var cc = this.currencyEl;
        CDS.attr(cc, "value", this.text("value", "30.000,00")); CDS.attr(cc, "symbol", this.text("symbol", "R$"));
        CDS.attr(cc, "show-negative-symbol", String(this.flag("show-negative-symbol")));
        CDS.attr(cc, "description", this.text("value-description", "Description"));
      }
      var t = this.trailEl;
      t.hidden = i !== "default" || !this.flag("show-trailing-item");
      CDS.attr(t, "status", this.getAttribute("status") === "selected" ? "selected" : "unselected"); CDS.attr(t, "kind", this.trailingKind);
      if (this.hasAttribute("disabled")) CDS.attr(t, "disabled", ""); else t.removeAttribute("disabled");
      t.toggleAttribute("inert", this.optionMode);
      this.tagEl.hidden = i !== "navigation" || !this.flag("show-tag");
      CDS.attr(this.tagEl, "label", this.text("tag-label", "Tag")); CDS.attr(this.tagEl, "appearance", this.getAttribute("tag-appearance") || "warning");
      this.navEl.hidden = i === "default" || !this.flag("show-navigation-indicator");
      var input = this.controlInput; if (this._mode === "control" && input){ CDS.attr(input, "aria-labelledby", this.textEl.id); input.removeAttribute("aria-label"); }
    }
  }
  CdsContentListItem.define("cds-content-list-item");
})();
