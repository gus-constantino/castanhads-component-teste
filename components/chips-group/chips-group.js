/**
 * @deps input-chip filter-chip
 * <cds-chips-group> — Chips Group · Selection Controls · set 12457:3664
 * Container de chips (filhos diretos = Slot do Figma).
 *
 * Atributos (padrões do Figma):
 *   kind       input | filter · padrão input — informativo (o tipo vem dos filhos)
 *   role-kind  multiple (Multiple Rows Chip, quebra) | single (Single Rows Chips, rolagem) · padrão single
 *              ("role" é reservado no HTML, por isso role-kind)
 *   label      nome acessível do grupo
 */
(function(){
  "use strict";
  class CdsChipsGroup extends CDS.Element {
    static get observedAttributes(){ return ["label", "role-kind"]; }
    render(){
      if (!this.hasAttribute("role-kind")) this.setAttribute("role-kind", "single");
      this.setAttribute("role", "group");
      if (this.getAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label")); else this.removeAttribute("aria-label");
    }
  }
  CdsChipsGroup.define("cds-chips-group");
})();
