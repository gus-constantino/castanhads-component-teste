/**
 * @deps icon
 * <cds-tab-item> — .Item (Tabs) · .Building Blocks · set 6498:375
 * 48 de altura · Label Content (pad 4 8 · gap 4 · raio micro) com Lead Item (Choose Icon, oculto por padrão) + Label.
 * Is Active=True: sublinhado 2px Accent/Solid/medium · Label/Medium Text/intense.
 * Hovered: sublinhado 2px Border/semi-soft + Label Content Surface/01 · Pressed: sublinhado Accent/Solid/medium + Surface/01 + Label/Medium.
 * Atributos: label ("Label") · icon (placeholder-line) · show-lead-item · is-active · disabled · controls (id do painel)
 *   state="hovered|pressed" (specimen)
 * É um <button role="tab"> (a lista cuida de aria-selected, tabindex e teclado).
 */
(function(){
  "use strict";
  class CdsTabItem extends CDS.Element {
    static get observedAttributes(){ return ["label","icon","show-lead-item","is-active","disabled","controls"]; }
    get button(){ return this.btn; }
    render(){
      if (!this.btn){
        var b = this.btn = this.appendChild(CDS.create("button", { type: "button", role: "tab" }, "cds-tab"));
        var c = b.appendChild(CDS.create("span", null, "cds-tab__content"));
        this.iconEl = c.appendChild(CDS.create("cds-icon", { size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-tab__icon"));
        this.labelEl = c.appendChild(CDS.create("span", null, "cds-tab__label"));
      }
      var on = this.hasAttribute("is-active");
      this.labelEl.textContent = this.text("label", "Label");
      CDS.attr(this.iconEl, "icon", this.getAttribute("icon") || "placeholder-line");
      this.iconEl.hidden = this.getAttribute("show-lead-item") !== "true"; // Show Lead Item: padrão False
      CDS.attr(this.btn, "aria-selected", String(on));
      // foco itinerante: dentro de uma tablist só a aba ativa entra no Tab
      this.btn.tabIndex = !this.parentElement || this.parentElement.getAttribute("role") !== "tablist" || on ? 0 : -1;
      this.btn.disabled = this.hasAttribute("disabled");
      CDS.attr(this.btn, "aria-controls", this.getAttribute("controls"));
    }
  }
  CdsTabItem.define("cds-tab-item");
})();
