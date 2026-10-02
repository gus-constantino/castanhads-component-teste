/**
 * @deps —
 * <cds-calendar-day> — .Day · .Building Blocks · set 17482:44817 (Role × State × Status · Is Current Day)
 * 40×40 · Value 24 (Label/Medium) · Current Day Status: ponto 4×4 Surface/accent (Support/lighter quando selecionado).
 * Role=Default (dia solto) · Start / Middle / End (intervalo): cantos arredondados só nas pontas.
 * Atributos: label (número · "30") · role-kind (default|start|middle|end — role é atributo global, como no Lote 3)
 *   selected · current (Is Current Day) · disabled · state="hovered|pressed" (specimen) · date-label (nome acessível)
 * É um <button>; o Date Picker cuida de tabindex, aria-selected e teclado.
 */
(function(){
  "use strict";
  class CdsCalendarDay extends CDS.Element {
    static get observedAttributes(){ return ["label","role-kind","selected","current","disabled","date-label"]; }
    get button(){ return this.btn; }
    render(){
      if (!this.btn){
        var b = this.btn = this.appendChild(CDS.create("button", { type: "button" }, "cds-day"));
        this.valEl = b.appendChild(CDS.create("span", null, "cds-day__value"));
        this.dotEl = b.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-day__dot"));
      }
      this.valEl.textContent = this.text("label", "30");
      this.dotEl.hidden = !this.hasAttribute("current");
      this.btn.disabled = this.hasAttribute("disabled");
      CDS.attr(this.btn, "aria-pressed", null);
      CDS.attr(this.btn, "aria-label", this.getAttribute("date-label"));
      CDS.attr(this.btn, "aria-current", this.hasAttribute("current") ? "date" : null);
    }
  }
  CdsCalendarDay.define("cds-calendar-day");
})();
