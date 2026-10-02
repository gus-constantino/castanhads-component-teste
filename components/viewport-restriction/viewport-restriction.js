/**
 * @deps —
 * <cds-viewport-restriction> — Viewport Restriction · Utilities · componente 5357:3899
 * Aviso de que o componente não está disponível no viewport atual (usado pelo Drawer e pelo Bottom Sheet).
 * Atributos: text (padrão "Componente não disponível nesse viewport")
 */
(function(){
  "use strict";
  class CdsViewportRestriction extends CDS.Element {
    static get observedAttributes(){ return ["text"]; }
    render(){ this.setAttribute("role", "note"); this.textContent = this.text("text", "Componente não disponível nesse viewport"); }
  }
  CdsViewportRestriction.define("cds-viewport-restriction");
})();
