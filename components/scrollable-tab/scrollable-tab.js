/**
 * @deps tab-list
 * <cds-scrollable-tab> — Scrollable Tab · Navigation · set 6646:181 (Active Item 1–6)
 * Abas no tamanho do conteúdo, com rolagem horizontal (overflow HORIZONTAL no Figma). A aba ativa rola para a vista.
 * Amostra: 6 abas.
 */
(function(){
  "use strict";
  class CdsScrollableTab extends CDS.TabList {
    get sampleCount(){ return 6; }
    afterRender(a){ var it = this.items[a - 1]; if (it && this._shown) it.scrollIntoView({ block: "nearest", inline: "nearest" }); this._shown = true; }
  }
  CdsScrollableTab.define("cds-scrollable-tab");
})();
