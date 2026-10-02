/**
 * @deps icon
 * <cds-csat-item> — .CSAT Item · .Building Blocks · set 10100:1155 (State × Is Active)
 * Coluna gap 8 · pad 4 0 · Item 48 (raio medium) com rate-line / rate-filled (32): Surface/02 inativo · Decorative/02 ativo.
 * Hovered: Item Surface/01 · Pressed: Accent/Solid/soft + stroke Accent/Solid/medium · Label: Disclaimer/Medium Text/medium.
 * Motion: 150ms (reaction ON_HOVER). É um <label> com <input type="radio"> nativo (o CSAT Score faz o grupo).
 * Atributos: label ("Label") · show-label-content · active (Is Active) · selected (a opção marcada) · value · name · disabled · state
 */
(function(){
  "use strict";
  class CdsCsatItem extends CDS.Element {
    static get observedAttributes(){ return ["label","show-label-content","active","selected","value","name","disabled"]; }
    get input(){ return this._in; }
    render(){
      if (!this._in){
        var l = this.appendChild(CDS.create("label", null, "cds-csi"));
        this._in = l.appendChild(CDS.create("input", { type: "radio" }, "cds-csi__input"));
        var box = l.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-csi__item"));
        this._ic = box.appendChild(CDS.create("cds-icon", { size: "large" }, "cds-csi__icon"));
        this._lb = l.appendChild(CDS.create("span", null, "cds-csi__label"));
        var self = this; this._in.addEventListener("change", function(){ self.dispatchEvent(new CustomEvent("cds-change", { detail: { value: self._in.value }, bubbles: true })); });
      }
      CDS.attr(this._ic, "icon", this.hasAttribute("active") ? "rate-filled" : "rate-line");
      this._lb.textContent = this.text("label", "Label"); this._lb.hidden = !this.flag("show-label-content");
      if (!this.flag("show-label-content")) this._in.setAttribute("aria-label", this.text("label", "Label")); else this._in.removeAttribute("aria-label");
      this._in.value = this.getAttribute("value") || ""; this._in.checked = this.hasAttribute("selected"); this._in.disabled = this.hasAttribute("disabled");
      if (this.getAttribute("name")) this._in.name = this.getAttribute("name");
    }
  }
  CdsCsatItem.define("cds-csat-item");
})();
