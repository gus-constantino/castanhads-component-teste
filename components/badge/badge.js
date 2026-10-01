/**
 * @deps —
 * <cds-badge> — Badge · Status · set 4835:1472
 * Indica notificações ou atualizações. No Mobile vira um ponto de 8px (collection Viewport).
 *
 * Atributos (padrões do Figma):
 *   label       número/texto · padrão "0"
 *   appearance  warning | neutral · padrão warning
 *   viewport    desktop | tablet | mobile — força o modo; sem ele, herda o [data-viewport] mais próximo
 */
(function(){
  "use strict";
  class CdsBadge extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    render(){
      if (!this._t){ this._t = document.createElement("span"); this.appendChild(this._t); }
      this._t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "0";
    }
  }
  CdsBadge.define("cds-badge");
})();
