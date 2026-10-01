/**
 * @deps selection-control
 * <cds-checkbox> — Checkbox · Selection Controls · set 4123:2560
 * Atributos: label · show-text-label · status (unselected | selected | indeterminate) · disabled · name · value
 * Clique: unselected → selected → unselected; indeterminate → selected (o Figma não tem reaction a partir do indeterminate).
 */
(function(){
  "use strict";
  class CdsCheckbox extends CDS.SelectionControl {
    static get inputType(){ return "checkbox"; }
    buildBox(box){
      box.appendChild(CDS.create("span", null, "cds-icon cds-icon--checkbox-check cds-sc__glyph cds-sc__glyph--check"));
      box.appendChild(CDS.create("span", null, "cds-icon cds-icon--checkbox-indeterminate cds-sc__glyph cds-sc__glyph--indeterminate"));
    }
    applyStatus(input, status){ input.checked = status === "selected"; input.indeterminate = status === "indeterminate"; }
  }
  CdsCheckbox.define("cds-checkbox");
})();
