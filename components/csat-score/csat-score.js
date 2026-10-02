/**
 * @deps csat-item
 * <cds-csat-score> — CSAT Score · Rating Score · set 10100:1192 (State Enabled|Disabled × Selected Value None|1–5)
 * 5 .CSAT Item (Muito ruim · Ruim · Médio · Bom · Muito bom) de 56 de largura · gap 8 · pad 8 0 · SPACE_BETWEEN · Surface/default.
 * Selected Value=n: os n primeiros ficam Is Active (como estrelas). Disabled: no Figma, shape/opacity/high (fora da Common, C68); aqui Opacity/medium.
 * Acessibilidade: radiogroup nativo; cada opção anunciada pelo rótulo ("Bom, 4 de 5").
 * Atributos: value (1–5 ou vazio) · disabled · label (nome do grupo · "Avaliação") · labels ("Muito ruim,Ruim,Médio,Bom,Muito bom") · name
 * Evento: cds-change { value }
 */
(function(){
  "use strict";
  var uid = 0, LABELS = ["Muito ruim", "Ruim", "Médio", "Bom", "Muito bom"];
  class CdsCsatScore extends CDS.Element {
    static get observedAttributes(){ return ["value","disabled","label","labels","name"]; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._name = "cds-csat-" + (++uid); this.innerHTML = "";
        this.setAttribute("role", "radiogroup");
        for (var i = 1; i <= 5; i++) this.appendChild(CDS.create("cds-csat-item", { value: String(i) }));
        this.addEventListener("cds-change", function(e){ if (e.target === self) return; e.stopImmediatePropagation(); self.setAttribute("value", e.detail.value); self.dispatchEvent(new CustomEvent("cds-change", { detail: { value: +e.detail.value }, bubbles: true })); });
      }
      var v = parseInt(this.getAttribute("value"), 10) || 0, dis = this.hasAttribute("disabled"), name = this.getAttribute("name") || this._name;
      var labels = this.getAttribute("labels") ? this.getAttribute("labels").split(",").map(function(s){ return s.trim(); }) : LABELS;
      CDS.attr(this, "aria-label", this.getAttribute("label") || "Avaliação");
      CDS.attr(this, "aria-disabled", dis ? "true" : null);
      [].forEach.call(this.children, function(it, i){
        CDS.attr(it, "label", labels[i] || String(i + 1)); CDS.attr(it, "active", i < v ? "" : null); CDS.attr(it, "selected", i + 1 === v ? "" : null);
        CDS.attr(it, "disabled", dis ? "" : null); CDS.attr(it, "name", name);
        if (it.input) it.input.setAttribute("aria-label", (labels[i] || "") + ", " + (i + 1) + " de 5");
      });
    }
  }
  CdsCsatScore.define("cds-csat-score");
})();
