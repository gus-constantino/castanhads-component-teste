/**
 * @deps —
 * <cds-progress-line> — Progress Line · Progress Indicators · set 2322:4006
 * O Figma tem Percent em passos de 10; o código aceita qualquer valor de 0 a 100.
 *
 * Atributos:
 *   percent  0–100 · padrão 0
 *   label    nome acessível (a description pede contexto: "Carregando dados…")
 */
(function(){
  "use strict";
  class CdsProgressLine extends CDS.Element {
    static get observedAttributes(){ return ["percent", "label"]; }
    connectedCallback(){ if (!this._bar){ this._bar = document.createElement("span"); this._bar.className = "cds-pl__bar"; this.appendChild(this._bar); } this.update(); }
    attributeChangedCallback(){ if (this._bar) this.update(); }
    get percent(){ var n = parseFloat(this.getAttribute("percent")); return isNaN(n) ? 0 : Math.max(0, Math.min(100, n)); }
    update(){
      this._bar.style.setProperty("--_pct", this.percent + "%");
      this.setAttribute("role", "progressbar");
      this.setAttribute("aria-valuemin", "0"); this.setAttribute("aria-valuemax", "100");
      this.setAttribute("aria-valuenow", String(this.percent));
      if (this.getAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label")); else this.removeAttribute("aria-label");
    }
  }
  CdsProgressLine.define("cds-progress-line");
})();
