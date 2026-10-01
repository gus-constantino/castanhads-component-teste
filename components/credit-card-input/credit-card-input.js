/**
 * @deps text-field
 * <cds-credit-card-input> — Credit Card Input · CDS-1607 · branch NHkGUvBfNMNTLnsxKtAmWa · set 24614:7155
 *
 * Membro da família Text Fields (CDS.TextField): campo do número do cartão (PAN). Aceita só dígitos e agrupa
 * em blocos de 4 (#### #### #### ####), conforme o .Text Content Mask "Credit Card" do Figma.
 *
 * Atributos: os da família (appearance · disabled · value · placeholder · label · required-text · supporting · error ·
 *   show-label · show-required · show-lead-icon · show-trailing-item · show-supporting-content · state · is-active)
 *   trailing-label — nome acessível do Icon Button; o papel da ação (tooltip, navegação…) é de quem implementa
 * Específico do branch: Lead Icon de 24px (credit-card-line, decorativo, não detecta bandeira) e Label em
 *   Feedback/Warning/semi-intense no Warning.
 * Eventos: cds-change {value, formatted} · cds-complete {value} · cds-trailing-action
 */
(function(){
  "use strict";
  var MASK = CDS.TextField.patternMask("0000 0000 0000 0000", { placeholder: "1234 5678 9012 3456" });

  class CdsCreditCardInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["trailing-label"]); }
    get mask(){ return MASK; }
    get defaultLeadIcon(){ return "credit-card-line"; }
    get fallbackName(){ return "Número do cartão"; }
    configureControl(ctrl){ ctrl.inputMode = "numeric"; ctrl.autocomplete = "cc-number"; }
    buildTrailing(box){
      var self = this, act = this.action = document.createElement("cds-icon-button");
      // Nested instance: Icon Button · Ghost · Neutral · Small · support-line
      act.className = "cds-tf__action";
      act.setAttribute("kind", "ghost"); act.setAttribute("appearance", "neutral"); act.setAttribute("size", "small");
      act.setAttribute("icon", "support-line");
      act.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-trailing-action", { bubbles: true })); });
      box.appendChild(act);
    }
    updateTrailing(){
      if (!this.action) return;
      this.action.hidden = !this.flag("show-trailing-item");
      this.action.setAttribute("label", this.getAttribute("trailing-label") || "Ajuda sobre o número do cartão");
      this.action.toggleAttribute("disabled", this.disabled);
    }
    update(){
      super.update();
      // No branch, o warning-line aparece sempre no Warning (não depende de Show Trailing Item)
      this.warnEl.hidden = this.appearance !== "warning";
    }
    afterInput(){
      super.afterInput();
      if (MASK.complete(this.value)) this.dispatchEvent(new CustomEvent("cds-complete", { detail: { value: this.value }, bubbles: true }));
    }
  }
  CdsCreditCardInput.define("cds-credit-card-input");
})();
