/**
 * @deps text-field
 * <cds-search-input> — Search Input · Text Fields · set 14880:3404
 * Lead Icon fixo (search-line). Com valor, mostra o Clear Button (Icon Button · Ghost · Neutral · Small · close-line).
 *
 * Atributos: os da família (sem lead-icon/show-lead-icon: a lupa é fixa) ·
 *   clear-label — nome acessível do Clear Button · padrão "Limpar busca"
 * Eventos: cds-change { value } · cds-clear · cds-search { value } (Enter)
 */
(function(){
  "use strict";
  var el = CDS.TextField.el;
  class CdsSearchInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["clear-label"]); }
    get defaultLeadIcon(){ return "search-line"; }
    get defaultPlaceholder(){ return "Buscar"; }
    get fallbackName(){ return "Buscar"; }
    configureControl(ctrl){
      var self = this;
      ctrl.type = "search"; ctrl.setAttribute("enterkeyhint", "search");
      ctrl.addEventListener("keydown", function(e){
        if (e.key === "Enter") self.dispatchEvent(new CustomEvent("cds-search", { detail: { value: self.value }, bubbles: true }));
        if (e.key === "Escape" && self.value){ e.preventDefault(); self.clear(); }
      });
    }
    buildTrailing(box){
      var self = this, b = this.clearBtn = document.createElement("cds-icon-button");
      b.className = "cds-tf__action";
      b.setAttribute("kind", "ghost"); b.setAttribute("appearance", "neutral"); b.setAttribute("size", "small"); b.setAttribute("icon", "close-line");
      b.addEventListener("click", function(){ self.clear(); });
      box.appendChild(b);
    }
    clear(){
      this._setValue("", true);
      this.dispatchEvent(new CustomEvent("cds-clear", { bubbles: true }));
      this.control.focus();
    }
    updateTrailing(){
      if (!this.clearBtn) return;
      this.clearBtn.hidden = !(this.value && this.flag("show-trailing-item"));
      this.clearBtn.setAttribute("label", this.getAttribute("clear-label") || "Limpar busca");
      if (this.disabled) this.clearBtn.setAttribute("disabled", ""); else this.clearBtn.removeAttribute("disabled");
    }
    update(){ super.update(); if (this.leadEl) this.leadEl.hidden = false; } // a lupa é parte do Search
  }
  CdsSearchInput.define("cds-search-input");
})();
