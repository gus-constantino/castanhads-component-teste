/**
 * @deps accordion-item
 * <cds-accordion> — Accordion · Lists · set 24841:33746 (branch R7GDqtUKeNZZUg45M1llyr)
 * Lista de Accordion Items. Kind=Default: itens empilhados sem gap (o Divider de cada item separa) · 684 = 12 × 57.
 * Kind=Card: itens Kind=Card com gap 8 (Sizes/8) · 1240 = 12 × 96 + 11 × 8. Largura 320 (Fixed no Figma).
 *
 * Atributos: kind (default|card · repassado aos itens) · exclusive (abre um por vez; a description do item recomenda
 *   quando as seções competem pela mesma informação · não é prop do Figma) · label (nome do grupo, aria-label)
 * Filhos: <cds-accordion-item>. Sem filhos, mostra a amostra do Figma (12 itens recolhidos).
 * Evento: cds-toggle dos itens sobe normalmente (detail { collapsed }).
 */
(function(){
  "use strict";
  class CdsAccordion extends CDS.Element {
    static get observedAttributes(){ return ["kind","exclusive","label"]; }
    items(){ return [].slice.call(this.children).filter(function(c){ return c.localName === "cds-accordion-item"; }); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true;
        if (!this.items().length){
          // amostra: Item 01–12 do Figma, recolhidos (Is Collapsed=True), com um texto no Slot
          for (var i = 0; i < 12; i++){
            var it = CDS.create("cds-accordion-item", { collapsed: true });
            var p = it.appendChild(CDS.create("p", null, "cds-accordion__sample")); // filho antes de conectar: vai para o Slot no 1º render
            p.textContent = "Conteúdo do Slot. Texto, lista ou formulário curto que aparece quando o item abre.";
            this.appendChild(it);
          }
        }
        // exclusive: abrir um fecha os outros
        this.addEventListener("cds-toggle", function(e){
          if (!self.hasAttribute("exclusive") || e.detail.collapsed || e.target.parentNode !== self) return;
          self.items().forEach(function(o){ if (o !== e.target && !o.collapsed) o.collapsed = true; });
        });
      }
      var kind = this.getAttribute("kind") === "card" ? "card" : null;
      this.items().forEach(function(it){ CDS.attr(it, "kind", kind); });
      CDS.attr(this, "role", "group");
      CDS.attr(this, "aria-label", this.getAttribute("label"));
    }
  }
  CdsAccordion.define("cds-accordion");
})();
