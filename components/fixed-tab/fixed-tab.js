/**
 * @deps tab-list
 * <cds-fixed-tab> — Fixed Tab · Navigation · set 6500:6958 (Active Item 1|2|3)
 * Abas com a largura dividida igualmente (os .Item em Fill). Amostra: 3 abas.
 */
(function(){
  "use strict";
  class CdsFixedTab extends CDS.TabList { get sampleCount(){ return 3; } }
  CdsFixedTab.define("cds-fixed-tab");
})();
