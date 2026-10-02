/**
 * @deps overlay header footer
 * <cds-modal> — Modal · Modals · componente 16362:3267
 * .Header (sem Divider) + Slot + .Footer Horizontal (sem Divider). Surface/default · raio medium · Elevation/level 2.
 * Largura: 320 (FIXED no Figma); a description pede adaptar ao conteúdo de 320 a 512 (min 272) → --cds-modal-width. Sempre com o Backdrop (::backdrop do <dialog>).
 * Padrão Dialog (description do Figma): show-close-button="false" + dismissible="false" — só fecha por uma ação.
 *
 * Atributos: open · inline · dismissible · text-title ("Title") · show-header · show-footer · show-close-button
 *   show-header-divider · show-footer-divider (desligados por padrão, como no Figma; liga só se precisar · C37)
 *   primary-label · secondary-label · show-secondary-action-button · label
 * Os filhos são o Slot. Eventos: cds-open · cds-close · cds-action { action }
 */
(function(){
  "use strict";
  class CdsModal extends CDS.Overlay {
    static get observedAttributes(){ return CDS.Overlay.observedAttributes.concat(["text-title","show-header","show-footer","show-close-button","primary-label","secondary-label","show-secondary-action-button","show-header-divider","show-footer-divider"]); }
    get panelClass(){ return "cds-modal"; }
    buildPanel(dlg, slot){
      this.headerEl = dlg.appendChild(CDS.create("cds-header", { "show-divider": "false" }));
      dlg.appendChild(slot);
      this.footerEl = dlg.appendChild(CDS.create("cds-footer", { kind: "horizontal", "show-divider": "false" }));
    }
    get titleText(){ return this.flag("show-header") ? this.text("text-title", "Title") : null; }
    updatePanel(){
      var h = this.headerEl, f = this.footerEl, self = this;
      h.hidden = !this.flag("show-header"); h.setAttribute("text-title", this.text("text-title", "Title"));
      h.setAttribute("show-close-button", String(this.flag("show-close-button")));
      f.hidden = !this.flag("show-footer");
      h.setAttribute("show-divider", String(this.hasAttribute("show-header-divider") && this.getAttribute("show-header-divider") !== "false"));
      f.setAttribute("show-divider", String(this.hasAttribute("show-footer-divider") && this.getAttribute("show-footer-divider") !== "false"));
      ["primary-label","secondary-label","show-secondary-action-button"].forEach(function(a){ if (self.hasAttribute(a)) f.setAttribute(a, self.getAttribute(a)); else f.removeAttribute(a); });
    }
  }
  CdsModal.define("cds-modal");
})();
