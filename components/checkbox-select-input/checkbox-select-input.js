/**
 * @deps select-field
 * <cds-checkbox-select-input> — Checkbox Select Input · Text Fields · set 11143:4833
 * Vários valores sem busca: opções com Trailing Item=Checkbox; a lista fica aberta enquanto marca.
 * Preenchido, o campo mostra "N Selecionados" (no Figma: "$nn Selecionados"; com 1, "1 Selecionado").
 * Popover a 4px do Text Box. Hover sem transição (reaction instantânea no Figma, C42).
 * Atributo: count-text — modelo do texto, com {n} · padrão "{n} Selecionados"
 */
(function(){
  "use strict";
  class CdsCheckboxSelectInput extends CDS.SelectField {
    static get observedAttributes(){ return CDS.SelectField.observedAttributes.concat(["count-text"]); }
    get searchable(){ return false; }
    get optionTrailing(){ return "checkbox"; }
    get popoverGap(){ return 4; }
    displayText(){
      var n = this._selected.length; if (!n) return "";
      var t = this.getAttribute("count-text");
      return t ? t.replace("{n}", n) : n + (n === 1 ? " Selecionado" : " Selecionados");
    }
  }
  CdsCheckboxSelectInput.define("cds-checkbox-select-input");
})();
