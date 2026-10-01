/**
 * <cds-spinner> — Spinner · Loaders · set 4333:3181
 * Geometria da variante Size=Large (32px): anel r=14.22 · espessura 3.56 (= 32/9) · arco de 90° no quadrante superior esquerdo.
 * "Spinner Position" (0–3) é a animação de protótipo — no código vira rotação contínua em 4 passos.
 *
 * Atributos (padrões do Figma):
 *   appearance  neutral | accent | inversed · padrão neutral
 *   size        small (16) | medium (24) | large (32) · padrão small
 *   label       texto anunciado · padrão "Carregando"
 */
(function(){
  "use strict";
  var SVG = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">' +
            '<circle class="cds-spin__track" cx="16" cy="16" r="14.2222" stroke-width="3.5556"/>' +
            '<path class="cds-spin__arc" d="M1.7778 16A14.2222 14.2222 0 0 1 16 1.7778" stroke-width="3.5556" stroke-linecap="round"/>' +
            '</svg>';
  class CdsSpinner extends HTMLElement {
    static get observedAttributes(){ return ["label"]; }
    connectedCallback(){ if (!this.firstChild) this.innerHTML = SVG; this.update(); }
    attributeChangedCallback(){ if (this.isConnected) this.update(); }
    update(){
      this.setAttribute("role", "status");
      this.setAttribute("aria-label", this.getAttribute("label") || "Carregando");
    }
  }
  if (!customElements.get("cds-spinner")) customElements.define("cds-spinner", CdsSpinner);
})();
