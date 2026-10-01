/**
 * @deps —
 * <cds-icon> — Icon · Images · set 2261:1126
 *
 * Atributos (padrões do Figma):
 *   icon        nome do ícone em assets/icons (Choose Icon) · padrão "placeholder-line"
 *   appearance  accent | neutral | positive | warning | negative | informative | inversed · padrão accent
 *   size        small (16) | medium (20) | large (24) · padrão small
 *   label       nome acessível. Sem label o ícone é decorativo (aria-hidden)
 */
(function(){
  "use strict";
  function slug(n){ return String(n || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  class CdsIcon extends CDS.Element {
    static get observedAttributes(){ return ["icon", "label"]; }
    get icon(){ return this.getAttribute("icon") || "placeholder-line"; }
    render(){
      var label = this.getAttribute("label");
      if (!this._glyph){ this._glyph = document.createElement("span"); this.appendChild(this._glyph); }
      this._glyph.className = "cds-icon cds-icon--" + slug(this.icon);
      this._glyph.setAttribute("aria-hidden", "true");
      this.a11yName(label);
    }
  }
  CdsIcon.define("cds-icon");
})();
