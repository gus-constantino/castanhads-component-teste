/**
 * @deps —
 * <cds-popover> — Popover · Popovers · componente 2270:102
 * Overlay contextual ancorado num elemento (description do Figma). Surface/default · raio large · Elevation/level 3 · pad 8.
 * O conteúdo é o Slot (filhos de quem usa).
 *
 * Usa a Popover API nativa (camada de topo, Esc e clique fora fecham, foco volta ao gatilho).
 * Atributos:
 *   for        id do gatilho. Botão comum ou <cds-drop-button>/<cds-main-button>/<cds-icon-button>: o clique abre e fecha.
 *              Com Drop Button, o Is Active (chevron) acompanha o estado do popover.
 *   placement  bottom-start (padrão) | bottom-end | bottom | top
 *   inline     mostra fixo no fluxo, sem abrir/fechar (specimen)
 *   label      nome acessível do painel
 * Métodos: show() · hide() · toggle()   Eventos: cds-toggle { open }
 */
(function(){
  "use strict";
  var uid = 0;
  function innerButton(t){ return t && (t.tagName === "BUTTON" ? t : t.querySelector("button")); }
  class CdsPopover extends CDS.Element {
    static get observedAttributes(){ return ["for", "inline", "label"]; }
    render(){
      var self = this;
      if (!this.id) this.id = "cds-popover-" + (++uid);
      if (!this._built){
        this._built = true;
        var slot = CDS.create("div", null, "cds-popover__slot"); while (this.firstChild) slot.appendChild(this.firstChild); this.appendChild(slot); this.slotEl = slot;
        this.addEventListener("toggle", function(e){
          var open = e.newState === "open";
          if (open) self.place();
          var t = self._trigger;
          if (t && t.tagName === "CDS-DROP-BUTTON" && t.hasAttribute("active") !== open) t.toggleAttribute("active", open);
          var b = innerButton(t); if (b) b.setAttribute("aria-expanded", String(open));
          self.dispatchEvent(new CustomEvent("cds-toggle", { detail: { open: open }, bubbles: true }));
        });
        this._onScroll = function(){ if (self.matches(":popover-open")) self.place(); };
      }
      var inline = this.hasAttribute("inline");
      if (inline){ this.removeAttribute("popover"); } else if (this.getAttribute("popover") == null) this.setAttribute("popover", "auto");
      this.setAttribute("role", "dialog");
      if (this.getAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label"));
      this.bind();
    }
    bind(){
      var id = this.getAttribute("for"), t = id && document.getElementById(id);
      if (t === this._trigger) return;
      this._trigger = t;
      if (!t || this.hasAttribute("inline")) return;
      var self = this;
      // O próprio Drop Button já alterna o Is Active no clique; aqui só ligamos o botão interno ao popover
      // síncrono quando o botão interno já existe (gatilho antes do popover no DOM); senão, na próxima tarefa
      // (sem requestAnimationFrame: ele não roda com a aba oculta)
      function link(){
        var b = innerButton(t); if (!b) return;
        if ("popoverTargetElement" in b) b.popoverTargetElement = self;
        else b.addEventListener("click", function(){ self.toggle(); }); // fallback sem Popover API
        b.setAttribute("aria-controls", self.id); b.setAttribute("aria-haspopup", "dialog"); b.setAttribute("aria-expanded", "false");
      }
      if (innerButton(t)) link(); else setTimeout(link);
    }
    place(){ if (this._trigger) CDS.position(this._trigger, this, { placement: this.getAttribute("placement") || "bottom-start" }); }
    show(){ if (this.showPopover) this.showPopover(); }
    hide(){ if (this.hidePopover && this.matches(":popover-open")) this.hidePopover(); }
    toggle(){ if (this.togglePopover) this.togglePopover(); }
    connectedCallback(){ super.connectedCallback(); window.addEventListener("resize", this._onScroll); window.addEventListener("scroll", this._onScroll, true); }
    disconnectedCallback(){ window.removeEventListener("resize", this._onScroll); window.removeEventListener("scroll", this._onScroll, true); }
  }
  CdsPopover.define("cds-popover");
})();
