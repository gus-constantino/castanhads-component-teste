/**
 * @deps calendar-day
 * <cds-calendar-week> — .Week · .Building Blocks · componente 17465:280
 * Linha de 7 .Day (280 × 40, raio small). No Date Picker cada semana é uma linha da grade (role="row").
 * Sem filhos, renderiza a amostra do Figma (7 dias "30").
 */
(function(){
  "use strict";
  class CdsCalendarWeek extends CDS.Element {
    render(){
      if (!this._built){ this._built = true; if (!this.children.length && !this.hasAttribute("role")) for (var i = 0; i < 7; i++) this.appendChild(CDS.create("cds-calendar-day")); }
    }
  }
  CdsCalendarWeek.define("cds-calendar-week");
})();
