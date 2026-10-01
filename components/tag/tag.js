/**
 * @deps icon
 * <cds-tag> — Tag · Status · set 4475:114
 * Compõe um <cds-icon size="small" appearance="neutral"> (nested instance) com override de cor.
 *
 * Atributos (padrões do Figma):
 *   label          Text Label · padrão "Tag"
 *   appearance     neutral | positive | warning | negative | informative | accent | inversed · padrão neutral
 *   icon           Choose Icon do Icon aninhado · padrão "placeholder-line"
 *   show-lead-item "false" esconde o ícone · padrão ligado
 */
(function(){
  "use strict";
  class CdsTag extends CDS.Element {
    static get observedAttributes(){ return ["label", "icon", "show-lead-item"]; }
    render(){
      this.innerHTML = "";
      this.iconEl = null;
      if (this.flag("show-lead-item")){
        this.iconEl = document.createElement("cds-icon");
        this.iconEl.setAttribute("icon", this.getAttribute("icon") || "placeholder-line");
        this.iconEl.setAttribute("size", "small");
        this.iconEl.setAttribute("appearance", "neutral");
        this.appendChild(this.iconEl);
      }
      var t = document.createElement("span");
      t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Tag";
      this.appendChild(t);
    }
  }
  CdsTag.define("cds-tag");
})();
