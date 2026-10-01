/**
 * @deps selection-control
 * <cds-switch> — Switch · Selection Controls · set 4895:809
 * Atributos: label · show-text-label · status (unselected | selected) · disabled · name · value
 * <input type="checkbox" role="switch"> — o leitor de tela anuncia "ligado/desligado".
 */
(function(){
  "use strict";
  class CdsSwitch extends CDS.SelectionControl {
    static get inputType(){ return "checkbox"; }
    buildBox(box){ box.appendChild(CDS.create("span", null, "cds-sw__toggle")); }
    build(){ super.build(); this._input.setAttribute("role", "switch"); }
  }
  CdsSwitch.define("cds-switch");
})();
