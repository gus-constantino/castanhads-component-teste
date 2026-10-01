/* Recurso de suporte — [Caju] Icons (vi4CKuAe98zydoLAQXoibU)
   Lib de apoio, não é componente: o componente Icon (components/icon) consome estes arquivos.
   A galeria lê CDS.assets, gerado por scripts/build-assets.js a partir de assets/icons/<bucket>/. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/vi4CKuAe98zydoLAQXoibU/-Caju--Icons?node-id=0-1";
  // só a lib: sem deprecated e sem os glifos internos de componentes
  var n = ((window.CDS.assets || {}).iconBuckets || []).filter(function(b){ return !b.deprecated && !b.glyphs; }).reduce(function(t, b){ return t + b.icons.length; }, 0);
  CDS.register({ id: "caju-icons", name: "[Caju] Icons", resource: true, order: 1, status: String(n), figma: FIGMA });
  CDS.docs["caju-icons"] = {
    source: FIGMA, sourceLabel: "Abrir o [Caju] Icons no Figma",
    tabs: [
      { id: "biblioteca", title: "Biblioteca", blocks: [
        { h2: "Biblioteca de ícones" },
        { p: "Ícones do [Caju] Icons, na ordem e nas categorias do Figma. Cada um tem 24px, um vetor só e cor herdada do token (`Icons/*`)." },
        { iconGallery: {} }
      ] },
      { id: "deprecated", title: "Deprecated", blocks: [
        { h2: "Deprecated" },
        { p: "Ícones do frame [Deprecated] do Figma. Os arquivos continuam no repo, mas não aparecem no instance swap dos componentes." },
        { iconGallery: { only: "deprecated" } }
      ] },
      { id: "uso", title: "Como usar", blocks: [
        { h2: "Lib de apoio × componente" },
        { p: "O [Caju] Icons é a fonte dos desenhos. O componente Icon (`<cds-icon>`) é quem aplica tamanho, Appearance e cor. Os componentes usam o Icon e escolhem o desenho pelo nome." },
        { specs: [
          { title: "No componente", rows: [["Tag", "`<cds-icon icon=\"credit-card-line\">`"], ["Swap", "Instance swap agrupado por categoria"]] },
          { title: "No repo", rows: [["Arquivos", "`assets/icons/<categoria>/<nome>.svg`"], ["Catálogo", "`assets/icons/catalog.json`"], ["Gerado", "`styles/icons.css` · `scripts/assets-manifest.js`"]] },
          { title: "Atualizar", rows: [["1", "Exportar do Figma (receita em `docs/ARCHITECTURE.md` §8)"], ["2", "`node scripts/build-assets.js`"]] }
        ] },
        { h3: "Categorias" },
        { p: "Cada frame de categoria do Figma é uma pasta (bucket): UI Symbols, Security, Social, Mobility & Transit, Images, Documents, Communicate, Charts, Caju Benefícios, Business & Payments, Brands e Deprecated." },
        { note: "Glifos internos de componentes (ex.: o check do Checkbox) não são da lib: ficam em `assets/icons/_glyphs/`." }
      ] }
    ]
  };
})();
