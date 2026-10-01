#!/usr/bin/env node
/**
 * Indexa os assets exportados do Figma.
 *   node scripts/build-assets.js
 *
 * Entrada (exportar do Figma como SVG, nome = nome do componente):
 *   assets/icons/<nome>.svg           ← [Caju] Icons  (vi4CKuAe98zydoLAQXoibU) · 24×24 · monocromático
 *   assets/illustrations/<nome>.svg   ← [Caju] Illustrations (9l54k2iyKGMaiIbsGGmEiM) · 200×200 · colorido
 *
 * Saída:
 *   styles/icons.css            .cds-icon--<nome> { mask-image:url(…) }   (ícone herda a cor do token)
 *   scripts/assets-manifest.js  CDS.assets = { icons:[…], illustrations:[…] }  (para os swaps no playground)
 *
 * Ferramenta de desenvolvimento: o site não depende de build, só dos arquivos gerados.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const list = (dir) => {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs).filter((f) => f.toLowerCase().endsWith(".svg")).map((f) => f.slice(0, -4)).sort((a, b) => a.localeCompare(b));
};
// Nomes do Figma podem ter espaço, barra ou maiúscula → classe segura
const cls = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const icons = list("assets/icons");
const illustrations = list("assets/illustrations");

const css = `/* GERADO por scripts/build-assets.js · não editar à mão · ${icons.length} ícones */
/* URL em longhand, sem var(): o Safari falha com var() no shorthand -webkit-mask */
${icons.map((n) => {
  const url = `../assets/icons/${encodeURIComponent(n)}.svg`;
  return `.cds-icon--${cls(n)}{ -webkit-mask-image:url("${url}"); mask-image:url("${url}"); }`;
}).join("\n")}
`;
fs.writeFileSync(path.join(ROOT, "styles/icons.css"), css);

const manifest = `/* GERADO por scripts/build-assets.js · não editar à mão */
window.CDS = window.CDS || {};
CDS.assets = ${JSON.stringify({
  icons: icons.map((n) => ({ name: n, cls: "cds-icon--" + cls(n) })),
  illustrations: illustrations.map((n) => ({ name: n, src: "assets/illustrations/" + encodeURIComponent(n) + ".svg" })),
}, null, 2)};
`;
fs.writeFileSync(path.join(ROOT, "scripts/assets-manifest.js"), manifest);

console.log(`icons.css: ${icons.length} ícones · manifest: ${illustrations.length} ilustrações`);
