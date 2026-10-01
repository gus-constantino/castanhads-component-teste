/**
 * @deps —
 * <cds-divider> — Divider · Dividers · set 4931:207
 *
 * Atributos (padrões do Figma):
 *   kind         solid | dashed · padrão solid
 *   intensity    soft | medium | intense · padrão soft
 *   orientation  horizontal | vertical · padrão horizontal
 *   separator    presente = separa grupos com significado → role="separator" + aria-orientation.
 *                Ausente = decorativo → aria-hidden (annotation "Semântica de separador")
 */
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  class CdsDivider extends CDS.Element {
    static get observedAttributes(){ return ["kind", "orientation", "separator"]; }
    render(){
      var vertical = this.getAttribute("orientation") === "vertical";
      this.innerHTML = "";
      if (this.getAttribute("kind") === "dashed"){
        // annotation: não usar border-style:dashed — SVG com dasharray 4 4 e cap round
        var svg = document.createElementNS(NS, "svg"), line = document.createElementNS(NS, "line");
        svg.setAttribute("aria-hidden", "true"); svg.setAttribute("focusable", "false");
        line.setAttribute("x1", vertical ? "50%" : "0"); line.setAttribute("y1", vertical ? "0" : "50%");
        line.setAttribute("x2", vertical ? "50%" : "100%"); line.setAttribute("y2", vertical ? "100%" : "50%");
        line.setAttribute("stroke", "currentColor"); line.setAttribute("stroke-width", "1");
        line.setAttribute("stroke-dasharray", "4 4"); line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line); this.appendChild(svg);
      }
      if (this.hasAttribute("separator")){
        this.setAttribute("role", "separator"); this.setAttribute("aria-orientation", vertical ? "vertical" : "horizontal"); this.removeAttribute("aria-hidden");
      } else { this.removeAttribute("role"); this.removeAttribute("aria-orientation"); this.setAttribute("aria-hidden", "true"); }
    }
  }
  CdsDivider.define("cds-divider");
})();
