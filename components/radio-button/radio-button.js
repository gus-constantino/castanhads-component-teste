/**
 * @deps selection-control
 * <cds-radio-button> — Radio Button · Selection Controls · set 4429:10437
 * Atributos: label · show-text-label · status (unselected | selected) · disabled · name · value
 * Exclusividade pelo `name` nativo; ao selecionar, os irmãos de mesmo name voltam para unselected.
 */
(function(){
  "use strict";
  class CdsRadioButton extends CDS.SelectionControl {
    static get inputType(){ return "radio"; }
    buildBox(box){ box.appendChild(CDS.create("span", null, "cds-rb__dot")); }
    onInputChange(){
      var name = this.getAttribute("name"), self = this;
      if (name){
        var scope = this.closest("cds-radio-button-group") || document;
        scope.querySelectorAll('cds-radio-button[name="' + name.replace(/"/g, '\\"') + '"]').forEach(function(r){ if (r !== self && r.status === "selected") r.status = "unselected"; });
      }
      this.status = "selected";
      this.emit();
    }
  }
  CdsRadioButton.define("cds-radio-button");
})();
