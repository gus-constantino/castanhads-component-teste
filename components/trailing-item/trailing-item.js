/**
 * @deps checkbox radio-button switch icon tag
 * <cds-trailing-item> — .Trailing Item · .Building Blocks · set 5488:647
 * Item à direita das listas. 48×48 (Tag: tamanho do Tag).
 * Atributos: kind (checkbox|radio-button|switch|icon|tag · padrão checkbox, como no Figma)
 *   status (selected|unselected — controles) · disabled · icon (Kind=Icon · padrão placeholder-line, Accent, Large)
 *   tag-label ("Tag") · tag-appearance (neutral) · name · value
 * O controle de seleção é o nativo do Checkbox/Radio/Switch, sem rótulo visível (Show Text Label = false).
 * propriedade .control — o componente interno (cds-checkbox…) · .input — o <input> nativo
 */
(function(){
  "use strict";
  var CONTROLS = { checkbox: "cds-checkbox", "radio-button": "cds-radio-button", "switch": "cds-switch" };
  class CdsTrailingItem extends CDS.Element {
    static get observedAttributes(){ return ["kind", "status", "disabled", "icon", "tag-label", "tag-appearance", "name", "value"]; }
    get kind(){ var k = this.getAttribute("kind"); return CONTROLS[k] || k === "icon" || k === "tag" ? k : "checkbox"; }
    get isControl(){ return !!CONTROLS[this.kind]; }
    get input(){ return this.control && this.control.input; }
    render(){
      var k = this.kind;
      if (this._kind !== k){
        this._kind = k; this.innerHTML = "";
        if (CONTROLS[k]) this.control = this.appendChild(CDS.create(CONTROLS[k], { "show-text-label": "false" }));
        else if (k === "icon") this.control = this.appendChild(CDS.create("cds-icon", { size: "large", appearance: "accent", "aria-hidden": "true" }));
        else this.control = this.appendChild(CDS.create("cds-tag", {}));
      }
      var c = this.control, self = this;
      if (CONTROLS[k]){
        CDS.attr(c, "status", this.getAttribute("status") === "selected" ? "selected" : "unselected");
        if (this.hasAttribute("disabled")) CDS.attr(c, "disabled", ""); else c.removeAttribute("disabled");
        ["name", "value"].forEach(function(a){ if (self.hasAttribute(a)) CDS.attr(c, a, self.getAttribute(a)); else c.removeAttribute(a); });
      } else if (k === "icon") CDS.attr(c, "icon", this.getAttribute("icon") || "placeholder-line");
      else { CDS.attr(c, "label", this.text("tag-label", "Tag")); CDS.attr(c, "appearance", this.getAttribute("tag-appearance") || "neutral"); }
    }
  }
  CdsTrailingItem.define("cds-trailing-item");
})();
