/**
 * @deps icon
 * Base interna da família Chips (sem playground). Só carrega o CSS compartilhado (.cds-chip)
 * e o helper CDS.chipIcon(); cada chip é um <button> nativo com <cds-icon size="small">.
 */
(function(){
  "use strict";
  CDS.chipIcon = function(name){ return CDS.create("cds-icon", { icon: name, size: "small", appearance: "neutral" }); };
})();
