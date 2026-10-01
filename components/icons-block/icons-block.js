/**
 * @deps icon
 * <cds-icons> — .Icons (building block do Filter button)
 * Atributo: kind default (filter-line) | date (calendar-line) · padrão default
 * Compõe <cds-icon size="medium">; a cor vem de quem consome (override de --_icon-color).
 */
(function(){
  "use strict";
  var ICON = { "default": "filter-line", "date": "calendar-line" };
  class CdsIcons extends CDS.Element {
    static get observedAttributes(){ return ["kind"]; }
    render(){
      if (!this.iconEl){ this.iconEl = document.createElement("cds-icon"); this.iconEl.setAttribute("size", "medium"); this.iconEl.setAttribute("appearance", "neutral"); this.appendChild(this.iconEl); }
      this.iconEl.setAttribute("icon", ICON[this.getAttribute("kind")] || ICON["default"]);
    }
  }
  CdsIcons.define("cds-icons");
})();
