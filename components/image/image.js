/**
 * <cds-image> — Image · Images · set 2273:320
 * Atributos: src · alt (obrigatório quando a imagem informa; vazio = decorativa)
 *            aspect-ratio none | 1:1 | 3:2 · padrão none (proporção natural)
 * Sem src mostra a superfície de placeholder (Surface/01).
 */
(function(){
  "use strict";
  class CdsImage extends HTMLElement {
    static get observedAttributes(){ return ["src", "alt"]; }
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    render(){
      var src = this.getAttribute("src");
      if (!src){ this.innerHTML = ""; this.img = null; return; }
      if (!this.img){ this.img = document.createElement("img"); this.img.decoding = "async"; this.img.loading = "lazy"; this.appendChild(this.img); }
      this.img.src = src;
      this.img.alt = this.getAttribute("alt") || "";
    }
  }
  if (!customElements.get("cds-image")) customElements.define("cds-image", CdsImage);
})();
