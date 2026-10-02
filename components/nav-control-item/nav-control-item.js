/**
 * @deps —
 * <cds-nav-control-item> — .Item Nav Control · .Building Blocks · set 19188:379
 * Indicador de posição: pad 4 · Indicator pill 6×6 (Is Active: 16×6).
 * Accent: Neutral/Solid/semi-intense · ativo Accent/Solid/medium · Inversed: Neutral/Opacity/Soft/semi-opaque · ativo Neutral/Solid/soft.
 * Atributos: appearance (accent|inversed · padrão accent) · is-active. Decorativo (aria-hidden): o Nav Control anuncia a posição.
 */
(function(){
  "use strict";
  class CdsNavControlItem extends CDS.Element {
    render(){ if (!this.firstChild) this.appendChild(CDS.create("span", null, "cds-nci__dot")); this.setAttribute("aria-hidden", "true"); }
  }
  CdsNavControlItem.define("cds-nav-control-item");
})();
