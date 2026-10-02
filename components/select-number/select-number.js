/**
 * @deps icon popover selection-list-item
 * <cds-select-number> — .Select Number (Pagination) · .Building Blocks · set 13408:1596 (State × Is Active)
 * Pílula Surface/default · pad 4 8 · gap 4 · número (Caption/Regular Text/intense) + dropdown-open-line ↔ dropdown-close-line.
 * Hovered: Neutral/Solid/semi-soft + Text/medium · Pressed: semi-soft + Caption/Medium Text/intense · Disabled: Opacity/light + Text/medium.
 * Is Active=True: Popover (84 de largura) com Selection List Items (32 de altura) dos números.
 * Atributos: value ("10") · options ("10,20,30,40,50") · disabled · label (nome acessível · "Selecionar número")
 * Acessibilidade: botão com aria-haspopup="listbox"; ao abrir, o foco vai para a opção atual; setas, Home/End, Enter e Esc.
 * Evento: cds-change { value }
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsSelectNumber extends CDS.Element {
    static get observedAttributes(){ return ["value","options","disabled","label"]; }
    get options(){ return (this.getAttribute("options") || "10,20,30,40,50").split(",").map(function(s){ return s.trim(); }).filter(Boolean); }
    get value(){ return this.text("value", "10"); }
    get isOpen(){ return !!this.pop && this.pop.matches(":popover-open"); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._id = "cds-sn-" + (++uid); this.innerHTML = "";
        var b = this.btn = this.appendChild(CDS.create("button", { type: "button", "aria-haspopup": "listbox", "aria-expanded": "false" }, "cds-sn"));
        this.valEl = b.appendChild(CDS.create("span", null, "cds-sn__value"));
        this.iconEl = b.appendChild(CDS.create("cds-icon", { size: "small", appearance: "neutral", icon: "dropdown-open-line", "aria-hidden": "true" }));
        // a lista entra antes de o Popover conectar: no connect ele move os filhos para o Slot
        var pop = this.pop = CDS.create("cds-popover", { placement: "bottom-start", label: "Opções" }, "cds-sn__popover");
        this.list = pop.appendChild(CDS.create("div", { role: "listbox", id: this._id + "-list", tabindex: "-1" }, "cds-sn__list"));
        this.appendChild(pop);
        pop._trigger = b;
        b.addEventListener("click", function(){ if (self.hasAttribute("disabled")) return; if (self.isOpen) self.pop.hide(); else self.open(); });
        b.addEventListener("keydown", function(e){ if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !self.isOpen){ e.preventDefault(); self.open(); } });
        pop.addEventListener("cds-toggle", function(e){
          e.stopPropagation();
          var o = e.detail.open; b.setAttribute("aria-expanded", String(o)); CDS.attr(self.iconEl, "icon", o ? "dropdown-close-line" : "dropdown-open-line");
          self.classList.toggle("is-open", o);
          if (!o && self.contains(document.activeElement) && document.activeElement !== b) b.focus();
        });
        this.list.addEventListener("click", function(e){ var it = e.target.closest("cds-selection-list-item"); if (it) self.choose(it.dataset.value); });
        this.list.addEventListener("keydown", function(e){ self.onKey(e); });
      }
      this.valEl.textContent = this.value;
      this.btn.disabled = this.hasAttribute("disabled");
      CDS.attr(this.btn, "aria-label", (this.getAttribute("label") || "Selecionar número") + ": " + this.value);
      CDS.attr(this.btn, "aria-controls", this.list.id);
    }
    open(){
      var self = this, L = this.list; L.innerHTML = "";
      this.options.forEach(function(v, i){
        var n = CDS.create("cds-selection-list-item", { option: "", "trailing-item": "none", "show-lead-item": "false", "show-divider": "false", "show-description": "false", label: v, "is-active": v === self.value ? "" : null }, "cds-sn__opt");
        n.id = self._id + "-o" + i; n.dataset.value = v; L.appendChild(n);
        if (n.row) n.row.tabIndex = -1;
      });
      this.pop.style.width = "84px";
      this.pop.show(); this.pop.place();
      var cur = L.querySelector("[is-active]") || L.firstElementChild; if (cur && cur.row) cur.row.focus();
    }
    onKey(e){
      var opts = [].slice.call(this.list.children), i = opts.findIndex(function(o){ return o.contains(document.activeElement); });
      var k = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: opts.length - 1 }[e.key];
      if (k != null){ e.preventDefault(); k = Math.min(Math.max(0, k), opts.length - 1); if (opts[k].row) opts[k].row.focus(); return; }
      if ((e.key === "Enter" || e.key === " ") && i >= 0){ e.preventDefault(); this.choose(opts[i].dataset.value); }
      if (e.key === "Tab") this.pop.hide();
    }
    choose(v){
      this.pop.hide(); this.btn.focus();
      if (v === this.value) return;
      this.setAttribute("value", v);
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: v }, bubbles: true }));
    }
  }
  CdsSelectNumber.define("cds-select-number");
})();
