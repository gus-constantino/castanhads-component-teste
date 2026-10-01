/**
 * <cds-drop-button> — Drop Button · Buttons · set 6955:6985
 * Botão que abre um menu/popover. O clique alterna Is Active (aria-expanded) e o chevron.
 * O conteúdo aberto é de quem implementa: escute o evento cds-toggle {active}.
 *
 * Atributos (padrões do Figma):
 *   label · kind · appearance · size · disabled · lead-icon · show-lead-icon (como o Main Button)
 *   active   Is Active — presente = aberto (dropdown-close-line)
 */
(function(){
  "use strict";
  function icon(name){ var i = document.createElement("cds-icon"); i.setAttribute("icon", name); i.setAttribute("size", "medium"); i.setAttribute("appearance", "neutral"); return i; }
  class CdsDropButton extends HTMLElement {
    static get observedAttributes(){ return ["label", "disabled", "lead-icon", "show-lead-icon", "active"]; }
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    get button(){ return this._btn; }
    focus(o){ if (this._btn) this._btn.focus(o); }
    render(){
      var self = this, first = !this._btn;
      var b = this._btn || document.createElement("button");
      b.className = "cds-btn"; b.type = "button"; b.disabled = this.hasAttribute("disabled");
      var active = this.hasAttribute("active");
      b.setAttribute("aria-expanded", String(active)); b.setAttribute("aria-haspopup", "true");
      b.innerHTML = "";
      this.leadEl = null;
      if (this.getAttribute("show-lead-icon") !== "false"){ this.leadEl = icon(this.getAttribute("lead-icon") || "placeholder-line"); b.appendChild(this.leadEl); }
      var t = document.createElement("span"); t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Label"; b.appendChild(t);
      this.trailEl = icon(active ? "dropdown-close-line" : "dropdown-open-line"); b.appendChild(this.trailEl);
      if (first){
        this._btn = b; this.appendChild(b);
        b.addEventListener("click", function(){
          self.toggleAttribute("active");
          self.dispatchEvent(new CustomEvent("cds-toggle", { detail: { active: self.hasAttribute("active") }, bubbles: true }));
        });
      }
    }
  }
  if (!customElements.get("cds-drop-button")) customElements.define("cds-drop-button", CdsDropButton);
})();
