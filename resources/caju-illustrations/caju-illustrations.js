/* Recurso de suporte — [Caju] Illustrations (9l54k2iyKGMaiIbsGGmEiM). Ainda não importado (ROADMAP §5.1). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/9l54k2iyKGMaiIbsGGmEiM/-Caju--Illustrations";
  var n = ((window.CDS.assets || {}).illustrations || []).length;
  CDS.register({ id: "caju-illustrations", name: "[Caju] Illustrations", resource: true, order: 2, status: n ? String(n) : "pendente", figma: FIGMA });
  CDS.docs["caju-illustrations"] = {
    source: FIGMA, sourceLabel: "Abrir o [Caju] Illustrations no Figma",
    tabs: [
      { id: "visao-geral", title: "Visão geral", blocks: [
        { h2: "[Caju] Illustrations" },
        { p: "Ilustrações coloridas da Caju, usadas em empty states, feedbacks e banners." },
        { specs: [
          { title: "Status", rows: [["No repo", n ? n + " ilustrações" : "Nenhuma ainda"], ["Na lib", "237 + Hero + Cartões (página Caju UI)"]] },
          { title: "No repo", rows: [["Destino", "`assets/illustrations/<nome>.svg`"], ["Formato", "SVG colorido, 200×200"], ["Gerado", "`CDS.assets.illustrations`"]] },
          { title: "Atualizar", rows: [["1", "Exportar do Figma como SVG, com o nome do componente"], ["2", "`node scripts/build-assets.js`"]] }
        ] },
        { note: "Importação pendente: está no débito de export do ROADMAP (§5.1)." }
      ] }
    ]
  };
})();
