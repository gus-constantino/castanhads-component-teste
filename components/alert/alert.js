/**
 * @deps shaped-icon close-alert
 * <cds-alert> — Alert · Feedback · set 11864:12559
 * Shaped Icon (Small, ícone por Appearance) · Text Content (Label + mensagem) · .Close Alert.
 * A mensagem aceita conteúdo rico ("You can turn words bold also add a link"): filhos do elemento viram o Text Content.
 *
 * Atributos: appearance (positive|warning|informative) · label (Text Label) · text (Text Content, se não houver filhos)
 *   show-label · show-close-button · close-label
 * Eventos: cds-close (cancelável). Sem preventDefault(), some do DOM.
 * A11y: role="alert" no Warning, role="status" nos outros.
 */
(function(){
  "use strict";
  var ICON = { positive: "positive-line", warning: "warning-line", informative: "information-line" };
  class CdsAlert extends CDS.Element {
    static get observedAttributes(){ return ["appearance", "label", "text", "show-label", "show-close-button", "close-label"]; }
    get appearance(){ var a = this.getAttribute("appearance"); return ICON[a] ? a : "positive"; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true;
        var slot = [].slice.call(this.childNodes); // conteúdo rico vindo de quem usa
        this.innerHTML = "";
        this.iconEl = this.appendChild(CDS.create("cds-shaped-icon", { size: "small" }));
        var tc = this.appendChild(CDS.create("div", null, "cds-alert__text"));
        this.labelEl = tc.appendChild(CDS.create("p", null, "cds-alert__label"));
        this.msgEl = tc.appendChild(CDS.create("p", null, "cds-alert__msg"));
        this.hasSlot = slot.some(function(n){ return n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()); });
        if (this.hasSlot) slot.forEach(function(n){ self.msgEl.appendChild(n); });
        this.closeEl = this.appendChild(CDS.create("cds-close-alert"));
        this.closeEl.addEventListener("click", function(){ self.close(); });
      }
      var a = this.appearance;
      this.setAttribute("role", a === "warning" ? "alert" : "status");
      this.iconEl.setAttribute("appearance", a); this.iconEl.setAttribute("icon", ICON[a]);
      this.labelEl.textContent = this.text("label", "Label"); this.labelEl.hidden = !this.flag("show-label");
      if (!this.hasSlot) this.msgEl.textContent = this.text("text", "A message about the system here! You can turn words bold also add a link.");
      this.closeEl.hidden = !this.flag("show-close-button");
      this.closeEl.setAttribute("label", this.getAttribute("close-label") || "Fechar aviso");
    }
    close(){ if (this.dispatchEvent(new CustomEvent("cds-close", { bubbles: true, cancelable: true }))) this.remove(); }
  }
  CDS.Alert = CdsAlert;
  CdsAlert.define("cds-alert");
})();
