/**
 * @deps select-field
 * <cds-async-select-input> — Async Select Input · Text Fields · set 11030:7644
 * Escolha única com busca: digitar filtra (ou chama .loadOptions(query)). Opções sem trailing (Trailing Item=None).
 * Popover a 8px do Text Box, como no Figma. Hover: 150ms + Systemic/accelerate.
 * Atributos e eventos: ver CDS.SelectField.
 */
(function(){
  "use strict";
  class CdsAsyncSelectInput extends CDS.SelectField {}
  CdsAsyncSelectInput.define("cds-async-select-input");
})();
