/**
 * @deps shaped-icon
 * <cds-confirmation-message> — Confirmation Message · Content · set 16359:1803
 * Shaped Icon Large (56) · Title (Title/Medium) · Description (Body/Regular), centralizados.
 * No Figma só Appearance é prop; título e descrição são texto fixo da amostra (expostos aqui como atributos).
 * Atributos: appearance (neutral|positive|warning) · icon (padrão placeholder-line, como no Figma) · title · description
 */
(function(){
  "use strict";
  class CdsConfirmationMessage extends CDS.Element {
    static get observedAttributes(){ return ["appearance", "icon", "title", "description"]; }
    render(){
      var a = /^(positive|warning)$/.test(this.getAttribute("appearance")) ? this.getAttribute("appearance") : "neutral";
      this.innerHTML = "";
      this.iconEl = this.appendChild(CDS.create("cds-shaped-icon", { size: "large", appearance: a, icon: this.getAttribute("icon") || "placeholder-line" }));
      var tc = this.appendChild(CDS.create("div", null, "cds-cm__text"));
      tc.appendChild(CDS.create("p", null, "cds-cm__title")).textContent = this.text("title", "Title");
      tc.appendChild(CDS.create("p", null, "cds-cm__desc")).textContent = this.text("description", "Unleash your potential! Our tools are here to help you transform your ideas into reality with simplicity and flair.");
    }
  }
  CdsConfirmationMessage.define("cds-confirmation-message");
})();
