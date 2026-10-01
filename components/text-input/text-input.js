/**
 * @deps text-field
 * <cds-text-input> — Text Input · Text Fields · set 5743:325
 * Campo de texto da família. Usa o .Text Content Mask (10155:1525) para máscaras de formato.
 *
 * Atributos: os da família (CDS.TextField) +
 *   mask  text | cpf | cnpj | cnpj-new | telefone | celular | cep | date | currency · padrão text
 *         (Mask do .Text Content Mask; o valor guardado é só o dado, sem pontuação)
 *   type  text | email | url | tel · padrão text (só sem máscara)
 */
(function(){
  "use strict";
  class CdsTextInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["mask", "type"]); }
    get mask(){ return CDS.TextField.masks[this.getAttribute("mask")] || null; }
    get fallbackName(){ return "Campo de texto"; }
    update(){
      var t = this.getAttribute("type");
      this.control.type = !this.mask && /^(email|url|tel)$/.test(t) ? t : "text";
      super.update();
    }
    attributeChangedCallback(name){
      if (name === "mask") this._value = null; // troca de máscara: relê o valor pelo novo formato
      super.attributeChangedCallback(name);
    }
  }
  CdsTextInput.define("cds-text-input");
})();
