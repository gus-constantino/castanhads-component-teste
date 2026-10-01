/* Recurso de suporte — Caju Theme (Zx9KwwRFqZrOfeuXpYZiTx): tokens Common/*, text styles, elevations e Motion Styles. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/Zx9KwwRFqZrOfeuXpYZiTx/";
  CDS.register({ id: "caju-theme", name: "Caju Theme (tokens)", resource: true, order: 3, status: "250", figma: FIGMA });
  CDS.docs["caju-theme"] = {
    source: FIGMA, sourceLabel: "Abrir o Caju Theme no Figma",
    tabs: [
      { id: "visao-geral", title: "Visão geral", blocks: [
        { h2: "Caju Theme" },
        { p: "Fonte dos tokens que todos os componentes usam: cores, tamanhos, raios, tipografia, elevações e motion, em light e dark." },
        { specs: [
          { title: "Conteúdo", rows: [["Tokens", "250 `Common/*` (89 com valor dark)"], ["Text styles", "34, incluindo Decorative em Work Sans"], ["Elevations", "3 (`Elevation/level 1–3`)"], ["Motion Styles", "15 variáveis `.Motion Styles` (modo Normal)"]] },
          { title: "No repo", rows: [["Snapshot", "`tokens/figma-snapshot.json`"], ["Gerado", "`styles/tokens.css`"], ["Tema", "`html[data-theme=\"dark\"]`"]] },
          { title: "Atualizar", rows: [["1", "Atualizar o snapshot a partir do Figma"], ["2", "`node scripts/build-tokens.js`"]] }
        ] },
        { h3: "Nomenclatura no código" },
        { ul: [
          "`Common/Colors/Text/intense` → `--common-colors-text-intense`",
          "`Label/Medium Label` → `--text-style-label-medium` (shorthand `font`)",
          "`Hover In/01/Timing` → `--motion-hover-in-01-timing`, apontando para o primitivo `Common/Motion/*`"
        ] }
      ] }
    ]
  };
})();
