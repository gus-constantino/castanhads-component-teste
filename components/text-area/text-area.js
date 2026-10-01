/**
 * @deps text-field
 * <cds-text-area> — Text Area Input · Text Fields · set 10110:3028
 * Texto longo: Text Box com altura mínima de 72px (pad 8 16) que cresce com o conteúdo. Sem Lead Icon.
 *
 * Atributos: os da família (sem lead-icon) · rows (linhas visíveis mínimas, padrão 2) · max-rows (limite antes de rolar)
 */
(function(){
  "use strict";
  class CdsTextArea extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["rows", "max-rows"]); }
    get controlTag(){ return "textarea"; }
    get hasLeadIcon(){ return false; }
    get fallbackName(){ return "Campo de texto longo"; }
    configureControl(ctrl){ ctrl.rows = 2; }
    update(){
      this.control.rows = parseInt(this.getAttribute("rows"), 10) || 2;
      super.update(); this.grow();
    }
    afterInput(){ this.grow(); super.afterInput(); }
    // Cresce com o conteúdo até max-rows (padrão: sem limite)
    grow(){
      var c = this.control, max = parseInt(this.getAttribute("max-rows"), 10);
      c.style.height = "auto";
      var lh = parseFloat(getComputedStyle(c).lineHeight) || 24, h = c.scrollHeight;
      if (max) h = Math.min(h, lh * max);
      c.style.height = h + "px";
      c.style.overflowY = max && c.scrollHeight > h ? "auto" : "hidden";
    }
  }
  CdsTextArea.define("cds-text-area");
})();
