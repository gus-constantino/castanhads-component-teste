/* Documentação — Icon: biblioteca [Caju] Icons (vi4CKuAe98zydoLAQXoibU), organizada por categoria (bucket).
   Só dados: a galeria lê CDS.assets (gerado por scripts/build-assets.js a partir de assets/icons/<bucket>/). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["icon"] = {
  tag: "cds-icon",
  source: "https://www.figma.com/design/vi4CKuAe98zydoLAQXoibU/-Caju--Icons?node-id=0-1",
  tabs: [
    { id: "biblioteca", title: "Biblioteca", blocks: [
      { h2: "Biblioteca de ícones" },
      { p: "Todos os ícones do [Caju] Icons, na ordem e nas categorias do Figma. Cada um tem 24px, um vetor só e cor herdada do token (`Icons/*`)." },
      { iconGallery: {} },
      { note: "Os arquivos ficam em `assets/icons/<categoria>/<nome>.svg`. Para atualizar, rode `node scripts/build-assets.js`." }
    ] },
    { id: "deprecated", title: "Deprecated", blocks: [
      { h2: "Deprecated" },
      { p: "Ícones marcados como [Deprecated] no Figma. Ficam disponíveis por arquivo, mas não aparecem no instance swap." },
      { iconGallery: { only: "deprecated" } }
    ] }
  ]
};
