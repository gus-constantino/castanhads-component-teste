/**
 * @deps —
 * <cds-tooltip> — Tooltip · Tooltips · componente 11211:416
 * Caixa flutuante com informação sobre algum aspecto da interface (description do Figma).
 * Surface/inversed · raio extra-small · Elevation/level 2 · Label (Caption/Bold) + conteúdo (Caption/Regular) · máx. 240.
 *
 * Atributos: label (Text Label) · text (Text Content) · show-label
 *   for — id do elemento que dispara: o tooltip aparece no hover e no foco dele, some com Esc e ao sair.
 *         Sem for, fica sempre visível (specimen).
 *   placement — top | bottom (padrão top)
 * A11y: role="tooltip"; o gatilho recebe aria-describedby.
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsTooltip extends CDS.Element {
    static get observedAttributes(){ return ["label", "text", "show-label", "for", "placement"]; }
    render(){
      if (!this.id) this.id = "cds-tooltip-" + (++uid);
      this.setAttribute("role", "tooltip");
      this.innerHTML = "";
      if (this.flag("show-label")) this.appendChild(CDS.create("p", null, "cds-tooltip__label")).textContent = this.text("label", "Label");
      this.appendChild(CDS.create("p", null, "cds-tooltip__text")).textContent = this.text("text", "Find out how this Caju product can benefit your business today.");
      this.bind();
    }
    bind(){
      var self = this, id = this.getAttribute("for");
      if (this._trigger && this._trigger.id !== id) this.unbind();
      if (!id){ this.classList.remove("is-floating"); this.hidden = false; return; }
      var t = document.getElementById(id); if (!t || t === this._trigger) return;
      this._trigger = t; this.classList.add("is-floating"); this.hidden = true;
      var desc = (t.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
      if (desc.indexOf(this.id) < 0){ desc.push(this.id); t.setAttribute("aria-describedby", desc.join(" ")); }
      var show = function(){ self.show(); }, hide = function(){ self.hidden = true; };
      var esc = function(e){ if (e.key === "Escape") hide(); };
      this._off = function(){ ["mouseenter","focusin"].forEach(function(e){ t.removeEventListener(e, show); }); ["mouseleave","focusout"].forEach(function(e){ t.removeEventListener(e, hide); }); t.removeEventListener("keydown", esc); };
      ["mouseenter","focusin"].forEach(function(e){ t.addEventListener(e, show); });
      ["mouseleave","focusout"].forEach(function(e){ t.addEventListener(e, hide); });
      t.addEventListener("keydown", esc);
    }
    unbind(){ if (this._off) this._off(); this._trigger = null; }
    disconnectedCallback(){ this.unbind(); }
    show(){
      var t = this._trigger; if (!t) return;
      this.hidden = false;
      var r = t.getBoundingClientRect(), me = this.getBoundingClientRect(), gap = 8;
      var below = this.getAttribute("placement") === "bottom" || r.top - me.height - gap < 0;
      var left = Math.min(Math.max(8, r.left + r.width / 2 - me.width / 2), window.innerWidth - me.width - 8);
      this.style.left = left + "px";
      this.style.top = (below ? r.bottom + gap : r.top - me.height - gap) + "px";
    }
  }
  CdsTooltip.define("cds-tooltip");
})();
