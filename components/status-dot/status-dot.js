/**
 * @deps —
 * <cds-status-dot> — Status Dot · Status · set 21745:69
 * O rótulo carrega a informação; o ponto é reforço visual (aria-hidden) — description do set.
 *
 * Atributos (padrões do Figma):
 *   label       Text Label · padrão "Label"
 *   appearance  neutral | positive | warning | informative | negative · padrão neutral
 *   size        small | medium | large · padrão small
 */
(function(){
  "use strict";
  class CdsStatusDot extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    render(){
      if (!this._t){
        var d = document.createElement("span"); d.className = "cds-sd__dot"; d.setAttribute("aria-hidden", "true");
        this._t = document.createElement("span");
        this.appendChild(d); this.appendChild(this._t);
      }
      this._t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Label";
    }
  }
  CdsStatusDot.define("cds-status-dot");
})();
