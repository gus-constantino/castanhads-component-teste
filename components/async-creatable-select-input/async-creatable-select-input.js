/**
 * @deps select-field
 * <cds-async-creatable-select-input> — Async creatable Select Input · Text Fields · set 11018:5694
 * Como o Async, e quando o texto digitado não existe nas opções, a primeira opção é um Content List Item
 * "Adicionar “…”" (Lead Item Icon plus-line). Escolher cria a opção e seleciona (evento cds-create { label }).
 * Popover: no Figma sobrepõe 4px o Text Box (y 68 × box até 72); aqui fica a 4px (CONFERIR C43).
 */
(function(){
  "use strict";
  class CdsAsyncCreatableSelectInput extends CDS.SelectField {
    get creatable(){ return true; }
    get popoverGap(){ return 4; }
  }
  CdsAsyncCreatableSelectInput.define("cds-async-creatable-select-input");
})();
