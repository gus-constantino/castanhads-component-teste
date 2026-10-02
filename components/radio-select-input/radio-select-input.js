/**
 * @deps select-field
 * <cds-radio-select-input> — Radio Select Input · Text Fields · set 11143:3056
 * Escolha única sem busca: o campo só abre a lista; opções com Trailing Item=Radio Button.
 * Popover a 4px do Text Box, como no Figma.
 */
(function(){
  "use strict";
  class CdsRadioSelectInput extends CDS.SelectField {
    get searchable(){ return false; }
    get optionTrailing(){ return "radio-button"; }
    get popoverGap(){ return 4; }
  }
  CdsRadioSelectInput.define("cds-radio-select-input");
})();
