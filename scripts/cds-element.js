/**
 * CDS.Element — classe base dos custom elements do Castanha DS (light DOM).
 *
 *   class CdsTag extends CDS.Element {
 *     static get observedAttributes(){ return ["label", "icon"]; }
 *     render(){ … this.flag("show-lead-item") … this.text("label", "Tag") … }
 *   }
 *   CdsTag.define("cds-tag");
 *
 * Contrato (ver docs/ARCHITECTURE.md §3):
 *   - connectedCallback → render(); attributeChangedCallback → render() quando conectado.
 *     Componentes com estado (inputs) sobrescrevem attributeChangedCallback.
 *   - flag(name): booleans do Figma ligados por padrão — só "false" desliga.
 *   - text(name, fallback): atributo de texto com o padrão do Figma (string vazia é válida).
 *   - a11yName(label): com label → role="img" + aria-label; sem → aria-hidden (decorativo).
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};

  class CdsElement extends HTMLElement {
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    render(){}
    flag(name){ return this.getAttribute(name) !== "false"; }
    text(name, fallback){ return this.hasAttribute(name) ? this.getAttribute(name) : fallback; }
    a11yName(label){
      if (label){ this.setAttribute("role", "img"); this.setAttribute("aria-label", label); this.removeAttribute("aria-hidden"); }
      else { this.removeAttribute("role"); this.removeAttribute("aria-label"); this.setAttribute("aria-hidden", "true"); }
    }
    static define(tag){ if (!customElements.get(tag)) customElements.define(tag, this); return this; }
  }

  /** Cria um elemento com atributos (string vazia = boolean ligado; null/false = omitido). */
  CDS.create = function(tag, attrs, cls){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) Object.keys(attrs).forEach(function(k){ var v = attrs[k]; if (v != null && v !== false) n.setAttribute(k, v === true ? "" : v); });
    return n;
  };

  CDS.Element = CdsElement;
})();
