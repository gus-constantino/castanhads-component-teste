/**
 * <cds-text-content> — .Text Content · Content · set 5516:10455 (building block)
 * Atributos (padrões do Figma):
 *   kind              highlight-label | highlight-description · padrão highlight-label
 *   label             Label Content · padrão "Label"
 *   description       Text Description · padrão "Description"
 *   show-description  "false" esconde a descrição · padrão ligado
 */
(function(){
  "use strict";
  class CdsTextContent extends HTMLElement {
    static get observedAttributes(){ return ["label", "description", "show-description"]; }
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    render(){
      this.innerHTML = "";
      var l = document.createElement("span"); l.className = "cds-tc__label"; l.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Label"; this.appendChild(l);
      if (this.getAttribute("show-description") !== "false"){
        var d = document.createElement("span"); d.className = "cds-tc__desc"; d.textContent = this.hasAttribute("description") ? this.getAttribute("description") : "Description"; this.appendChild(d);
      }
    }
  }
  if (!customElements.get("cds-text-content")) customElements.define("cds-text-content", CdsTextContent);
})();
