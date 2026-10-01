/**
 * <cds-main-button> — Main Button · Buttons · set 4464:427
 * Renderiza um <button class="cds-btn"> com <cds-icon> leading e trailing (nested instances, 20px).
 *
 * Atributos (padrões do Figma):
 *   label               Text Label · padrão "Label"
 *   kind                default | ghost · padrão default
 *   appearance          accent | neutral | inversed · padrão accent
 *   size                medium (48) | small (40) · padrão medium
 *   disabled
 *   lead-icon           Lead Icon (swap) · padrão "placeholder-line"
 *   show-lead-icon      "false" esconde · padrão ligado
 *   trailing-icon       Choose Icon do Icon trailing (nested) · padrão "placeholder-line"
 *   show-trailing-icon  "false" esconde · padrão ligado
 *   type                button | submit | reset · padrão button
 */
(function(){
  "use strict";
  function icon(name){ var i = document.createElement("cds-icon"); i.setAttribute("icon", name); i.setAttribute("size", "medium"); i.setAttribute("appearance", "neutral"); return i; }
  class CdsMainButton extends HTMLElement {
    static get observedAttributes(){ return ["label", "disabled", "lead-icon", "show-lead-icon", "trailing-icon", "show-trailing-icon", "type"]; }
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    get button(){ return this._btn; }
    focus(o){ if (this._btn) this._btn.focus(o); }
    render(){
      var b = this._btn || document.createElement("button");
      b.className = "cds-btn"; b.type = this.getAttribute("type") || "button"; b.disabled = this.hasAttribute("disabled");
      b.innerHTML = "";
      this.leadEl = this.trailEl = null;
      if (this.getAttribute("show-lead-icon") !== "false"){ this.leadEl = icon(this.getAttribute("lead-icon") || "placeholder-line"); b.appendChild(this.leadEl); }
      var t = document.createElement("span"); t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Label"; b.appendChild(t);
      if (this.getAttribute("show-trailing-icon") !== "false"){ this.trailEl = icon(this.getAttribute("trailing-icon") || "placeholder-line"); b.appendChild(this.trailEl); }
      if (!this._btn){ this._btn = b; this.appendChild(b); }
    }
  }
  if (!customElements.get("cds-main-button")) customElements.define("cds-main-button", CdsMainButton);
})();
