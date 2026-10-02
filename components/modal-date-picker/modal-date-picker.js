/**
 * @deps modal date-picker viewport-restriction
 * <cds-modal-date-picker> — Modal Date Picker · Datepicker · set 17560:51555 (Kind × Role None|Single|Range Date Select)
 * Modal (.Header "Selecione uma data", sem Close Button nem Divider) + Date Picker no Slot + .Footer Horizontal
 * (Cancelar · Confirmar). Single 320 / Double 620 de largura (o Modal abraça o conteúdo).
 * Só desktop: Viewport Restriction cobre o modal com Common/Is Mobile e Common/Is Tablet (como no Figma).
 * A data só é aplicada no Confirmar; Cancelar, Esc e o Backdrop descartam.
 *
 * Atributos: open · inline · kind (single|double) · role-kind (none|single|range — Role do Figma; padrão none = range sem seleção)
 *   value / start / end (AAAA-MM-DD) · min · max · today · month · viewport
 *   text-title ("Selecione uma data") · primary-label ("Confirmar") · secondary-label ("Cancelar")
 * Métodos: show() · close()   Eventos: cds-change { value } ou { start, end } (no Confirmar) · cds-close
 */
(function(){
  "use strict";
  class CdsModalDatePicker extends CDS.Element {
    static get observedAttributes(){ return ["open","inline","kind","role-kind","value","start","end","min","max","today","month","text-title","primary-label","secondary-label"]; }
    get mode(){ return this.getAttribute("role-kind") === "single" ? "single" : "range"; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.picker = CDS.create("cds-date-picker");
        this.restrict = CDS.create("cds-viewport-restriction", null, "cds-mdp__restriction");
        this.modal = CDS.create("cds-modal", { "show-close-button": "false", "show-lead-icon": "false" }, "cds-mdp__modal"); // botões sem Lead Icon, como no Figma
        this.modal.appendChild(this.picker); this.modal.appendChild(this.restrict);
        this.appendChild(this.modal);
        this.modal.addEventListener("cds-action", function(e){
          e.stopPropagation();
          if (e.detail.action === "primary") self.confirm(); else self.close();
        });
        this.modal.addEventListener("cds-close", function(e){ if (e.target === self.modal){ e.stopPropagation(); self.removeAttribute("open"); self.dispatchEvent(new CustomEvent("cds-close", { bubbles: true })); } });
        this.picker.addEventListener("cds-change", function(e){ e.stopPropagation(); }); // só vale no Confirmar
      }
      var m = this.modal, p = this.picker, self2 = this;
      CDS.attr(m, "text-title", this.text("text-title", "Selecione uma data"));
      CDS.attr(m, "primary-label", this.text("primary-label", "Confirmar"));
      CDS.attr(m, "secondary-label", this.text("secondary-label", "Cancelar"));
      CDS.attr(m, "inline", this.hasAttribute("inline") ? "" : null);
      CDS.attr(this, "kind", this.getAttribute("kind") === "double" ? "double" : null);
      if (!this.hasAttribute("open") || !this._wasOpen){ // ao abrir, o calendário parte do valor confirmado
        CDS.attr(p, "mode", this.mode);
        ["kind","min","max","today","month","value","start","end"].forEach(function(a){ CDS.attr(p, a, self2.getAttribute(a)); });
      }
      var open = this.hasAttribute("open");
      if (open && !this._wasOpen){ this._wasOpen = true; m.show(); }
      else if (!open && this._wasOpen){ this._wasOpen = false; m.close(); }
    }
    confirm(){
      var p = this.picker, d;
      if (this.mode === "single"){ d = { value: p.getAttribute("value") || "" }; CDS.attr(this, "value", d.value || null); }
      else { d = { start: p.getAttribute("start") || "", end: p.getAttribute("end") || "" }; CDS.attr(this, "start", d.start || null); CDS.attr(this, "end", d.end || null); }
      this.dispatchEvent(new CustomEvent("cds-change", { detail: d, bubbles: true }));
      this.close();
    }
    show(){ this.setAttribute("open", ""); }
    close(){ this.removeAttribute("open"); }
  }
  CdsModalDatePicker.define("cds-modal-date-picker");
})();
