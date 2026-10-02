/**
 * @deps —
 * <cds-nps-value-item> — .Value Item · .Building Blocks · set 10100:1137 (State × Status)
 * Pílula 24 · Caption/Bold. Unselected: Surface/01 + Text/medium · Hovered: + stroke Accent/Solid/medium ·
 * Pressed: Accent/Solid/soft + stroke · Selected: Surface/accent + Text/inversed · Selected Hovered: stroke Border/intense ·
 * Selected Pressed: Accent/Solid/soft + Text/intense. Motion: 150ms + Systemic/accelerate.
 * É um <label> com um <input type="radio"> nativo (o NPS Score faz o grupo).
 * Atributos: value ("10") · selected · disabled · name · state (specimen)
 */
(function(){
  "use strict";
  class CdsNpsValueItem extends CDS.Element {
    static get observedAttributes(){ return ["value","selected","disabled","name"]; }
    get input(){ return this._in; }
    render(){
      if (!this._in){
        var l = this.appendChild(CDS.create("label", null, "cds-nvi"));
        this._in = l.appendChild(CDS.create("input", { type: "radio" }, "cds-nvi__input"));
        this._tx = l.appendChild(CDS.create("span", null, "cds-nvi__value"));
        var self = this; this._in.addEventListener("change", function(){ self.dispatchEvent(new CustomEvent("cds-change", { detail: { value: self._in.value }, bubbles: true })); });
      }
      var v = this.text("value", "10");
      this._tx.textContent = v; this._in.value = v;
      this._in.checked = this.hasAttribute("selected"); this._in.disabled = this.hasAttribute("disabled");
      if (this.getAttribute("name")) this._in.name = this.getAttribute("name");
    }
  }
  CdsNpsValueItem.define("cds-nps-value-item");
})();
