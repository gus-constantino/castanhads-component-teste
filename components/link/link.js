/**
 * <cds-link> — Link · Content · set 4926:213
 * Renderiza um <a> de verdade; o ícone trailing é um <cds-icon size="small"> (nested instance).
 *
 * Atributos (padrões do Figma):
 *   label               Link Content · padrão "Link content"
 *   href                destino · padrão "#"
 *   appearance          neutral | accent | inversed · padrão neutral
 *   icon                Change Icon · padrão "navigation-right-line"
 *   show-trailing-item  "false" esconde o ícone · padrão ligado
 *   disabled            State=Disabled (Opacity/light, fora da tabulação)
 */
(function(){
  "use strict";
  class CdsLink extends HTMLElement {
    static get observedAttributes(){ return ["label", "href", "icon", "show-trailing-item", "disabled", "target"]; }
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    render(){
      this.innerHTML = "";
      var a = document.createElement("a");
      var disabled = this.hasAttribute("disabled");
      if (disabled){ a.setAttribute("aria-disabled", "true"); a.tabIndex = -1; }
      else a.href = this.getAttribute("href") || "#";
      if (this.getAttribute("target")){ a.target = this.getAttribute("target"); a.rel = "noopener"; }
      var t = document.createElement("span"); t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Link content";
      a.appendChild(t);
      this.iconEl = null;
      if (this.getAttribute("show-trailing-item") !== "false"){
        this.iconEl = document.createElement("cds-icon");
        this.iconEl.setAttribute("icon", this.getAttribute("icon") || "navigation-right-line");
        this.iconEl.setAttribute("size", "small"); this.iconEl.setAttribute("appearance", "neutral");
        a.appendChild(this.iconEl);
      }
      this.appendChild(a);
      this.anchor = a;
    }
  }
  if (!customElements.get("cds-link")) customElements.define("cds-link", CdsLink);
})();
