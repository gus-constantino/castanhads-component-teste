/**
 * @deps icon
 * <cds-shaped-icon> — Shaped Icon · Images · set 2272:146
 * Compõe um <cds-icon> (nested instance), como no Figma.
 *
 * Atributos (padrões do Figma):
 *   icon        nome do ícone (Icon swap) · padrão "placeholder-line"
 *   appearance  neutral | inversed | accent | positive | warning | negative | informative · padrão neutral
 *   size        smallest (32) | small (40) | medium (48) | large (56) · padrão smallest
 *   label       nome acessível; sem label é decorativo
 */
(function(){
  "use strict";
  // Size do container → Size do Icon aninhado
  var ICON_SIZE = { smallest: "small", small: "small", medium: "medium", large: "large" };
  // Appearance do container → Appearance do Icon (Inversed usa ícone intense sobre Surface/default)
  var ICON_APPEARANCE = { neutral: "neutral", inversed: "neutral", accent: "accent", positive: "positive", warning: "warning", negative: "negative", informative: "informative" };

  class CdsShapedIcon extends CDS.Element {
    static get observedAttributes(){ return ["icon", "appearance", "size", "label"]; }
    get size(){ var s = this.getAttribute("size"); return ICON_SIZE[s] ? s : "smallest"; }
    get appearance(){ var a = this.getAttribute("appearance"); return ICON_APPEARANCE[a] ? a : "neutral"; }
    render(){
      if (!this.iconEl){ this.iconEl = document.createElement("cds-icon"); this.appendChild(this.iconEl); }
      this.iconEl.setAttribute("icon", this.getAttribute("icon") || "placeholder-line");
      this.iconEl.setAttribute("size", ICON_SIZE[this.size]);
      this.iconEl.setAttribute("appearance", ICON_APPEARANCE[this.appearance]);
      var label = this.getAttribute("label");
      this.a11yName(label);
    }
  }
  CdsShapedIcon.define("cds-shaped-icon");
})();
