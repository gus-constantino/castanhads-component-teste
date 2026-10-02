/**
 * @deps nps-value-item
 * <cds-nps-score> — NPS Score · Rating Score · set 10100:848 (State Enabled|Disabled × Selected Value None|0–10)
 * 11 .Value Item (0 a 10) em linha · gap 4 · pad 24 0 · Surface/default · Disabled: Opacity/medium.
 * Acessibilidade: radiogroup nativo (setas trocam o valor); cada opção é anunciada como "n de 10".
 * Atributos: value (0–10 ou vazio) · disabled · label (nome do grupo · "Nota de 0 a 10") · name
 * Evento: cds-change { value }
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsNpsScore extends CDS.Element {
    static get observedAttributes(){ return ["value","disabled","label","name"]; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._name = "cds-nps-" + (++uid); this.innerHTML = "";
        this.setAttribute("role", "radiogroup");
        for (var i = 0; i <= 10; i++) this.appendChild(CDS.create("cds-nps-value-item", { value: String(i) }));
        this.addEventListener("cds-change", function(e){ if (e.target === self) return; e.stopImmediatePropagation(); self.setAttribute("value", e.detail.value); self.dispatchEvent(new CustomEvent("cds-change", { detail: { value: +e.detail.value }, bubbles: true })); });
      }
      var v = this.getAttribute("value"), dis = this.hasAttribute("disabled"), name = this.getAttribute("name") || this._name;
      CDS.attr(this, "aria-label", this.getAttribute("label") || "Nota de 0 a 10");
      CDS.attr(this, "aria-disabled", dis ? "true" : null);
      [].forEach.call(this.children, function(it){
        var iv = it.getAttribute("value");
        CDS.attr(it, "selected", v !== null && v !== "" && iv === String(+v) ? "" : null); CDS.attr(it, "disabled", dis ? "" : null); CDS.attr(it, "name", name);
        if (it.input) it.input.setAttribute("aria-label", iv + " de 10");
      });
    }
  }
  CdsNpsScore.define("cds-nps-score");
})();
