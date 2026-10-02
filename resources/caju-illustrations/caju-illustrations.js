/* Recurso de suporte — [Caju] Illustrations (9l54k2iyKGMaiIbsGGmEiM)
   Lib de apoio, não é componente: Banner (Kind=Illustration) e Table (Kind=Empty) consomem estes arquivos.
   A galeria lê CDS.assets, gerado por scripts/build-assets.js a partir de assets/illustrations/<categoria>/. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/9l54k2iyKGMaiIbsGGmEiM/-Caju--Illustrations";
  var A = window.CDS.assets || {}, n = (A.illustrations || []).length, cats = (A.illustrationBuckets || []).length;
  CDS.register({ id: "caju-illustrations", name: "[Caju] Illustrations", resource: true, order: 2, status: n ? String(n) : "pendente", figma: FIGMA });
  CDS.docs["caju-illustrations"] = {
    source: FIGMA, sourceLabel: "Abrir o [Caju] Illustrations no Figma",
    tabs: [
      { id: "biblioteca", title: "Biblioteca", blocks: [
        { h2: "Biblioteca de ilustrações" },
        { p: "Ilustrações coloridas da Caju, na ordem e nas categorias do Figma: as da página Caju UI (200×200) e as do Hero (Sponsor, Employee e Hub de Benefícios). Passe o mouse para ver o nome no Figma e o tamanho; clique para copiar o nome." },
        { illustrationGallery: {} }
      ] },
      { id: "uso", title: "Como usar", blocks: [
        { h2: "Lib de apoio × componente" },
        { p: "O [Caju] Illustrations é a fonte dos desenhos. Quem usa uma ilustração é o componente: o Banner (Kind=Illustration) recebe o nome no atributo `illustration`, e a Table (Kind=Empty) usa `notificacoes/empty-state`." },
        { specs: [
          { title: "No componente", rows: [["Tag", "`<cds-banner illustration=\"notificacoes/sino\">`"], ["Nome", "`<categoria>/<nome>`; só `<nome>` também funciona (pega a primeira categoria)"], ["Swap", "Instance swap agrupado por categoria"]] },
          { title: "No repo", rows: [["Arquivos", "`assets/illustrations/<categoria>/<nome>.svg`"], ["Catálogo", "`assets/illustrations/catalog.json`"], ["Gerado", "`CDS.assets.illustrations` (" + n + " em " + cats + " categorias)"]] },
          { title: "Atualizar", rows: [["1", "No Figma: Export → SVG das páginas Caju UI e Hero"], ["2", "`python3 scripts/dev/import-illustrations.py <pasta do export> <listing.tsv>`"], ["3", "`node scripts/build-assets.js`"]] }
        ] },
        { h3: "Fora da biblioteca" },
        { p: "A página Cartões do Figma é o componente Caju Card: as artes dele saem do próprio componente (`assets/caju-card/`, D65), não daqui." },
        { note: "Nomes repetidos no Figma (ex.: três `moeda-verde-pilha-2` em Finanças) ganharam sufixo `-1`, `-2` no repo. Estão no CONFERIR para corrigir na origem." }
      ] }
    ]
  };
})();
