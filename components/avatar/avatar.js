/**
 * <cds-avatar> — Avatar · Images · set 2278:92
 * Kind=Default compõe <cds-icon icon="user-line"> (nested instance): 20px no Small/Medium, 24px no Large.
 *
 * Atributos (padrões do Figma):
 *   kind        default | initial | image · padrão default
 *   appearance  neutral | inversed · padrão neutral (Image só existe em Neutral no Figma)
 *   size        small (40) | medium (48) | large (64) · padrão small
 *   label       Text Label (iniciais) · padrão "AA"
 *   src · alt   para Kind=Image
 *   name        nome da pessoa — vira o nome acessível (role=img)
 */
(function(){
  "use strict";
  class CdsAvatar extends HTMLElement {
    static get observedAttributes(){ return ["kind", "appearance", "size", "label", "src", "alt", "name"]; }
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    render(){
      var kind = this.getAttribute("kind") || "default", size = this.getAttribute("size") || "small";
      this.innerHTML = ""; this.iconEl = null;
      if (kind === "initial"){
        var t = document.createElement("span"); t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "AA"; t.setAttribute("aria-hidden", "true"); this.appendChild(t);
      } else if (kind === "image" && this.getAttribute("src")){
        var img = document.createElement("img"); img.src = this.getAttribute("src"); img.alt = ""; this.appendChild(img);
      } else {
        this.iconEl = document.createElement("cds-icon");
        this.iconEl.setAttribute("icon", "user-line");
        this.iconEl.setAttribute("size", size === "large" ? "large" : "medium");
        this.iconEl.setAttribute("appearance", this.getAttribute("appearance") === "inversed" ? "inversed" : "neutral");
        this.appendChild(this.iconEl);
      }
      var name = this.getAttribute("name") || this.getAttribute("alt");
      if (name){ this.setAttribute("role", "img"); this.setAttribute("aria-label", name); this.removeAttribute("aria-hidden"); }
      else { this.removeAttribute("role"); this.removeAttribute("aria-label"); this.setAttribute("aria-hidden", "true"); }
    }
  }
  if (!customElements.get("cds-avatar")) customElements.define("cds-avatar", CdsAvatar);
})();
