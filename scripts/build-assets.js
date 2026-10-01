#!/usr/bin/env node
/**
 * Indexa os assets exportados do Figma.
 *   node scripts/build-assets.js
 *
 * Entrada:
 *   assets/icons/<bucket>/<nome>.svg  ← [Caju] Icons (vi4CKuAe98zydoLAQXoibU) · 24×24 · monocromático
 *       um bucket por frame de categoria da página UI & Caju (ui-symbols, security, … , deprecated)
 *   assets/icons/catalog.json         ← ordem do Figma, nome da categoria e palavras-chave (description)
 *   assets/icons/_glyphs/<nome>.svg   ← glifos internos de componentes (não são da lib de ícones)
 *   assets/illustrations/<nome>.svg   ← [Caju] Illustrations (9l54k2iyKGMaiIbsGGmEiM) · 200×200 · colorido
 *
 * Saída:
 *   styles/icons.css            .cds-icon--<nome> { mask-image:url(…) }   (ícone herda a cor do token)
 *   scripts/assets-manifest.js  CDS.assets = { icons:[…], iconBuckets:[…], illustrations:[…] }
 *
 * Regras: nome de classe = nome do ícone (único). Se um ícone deprecated tem o mesmo nome de um ativo,
 * a classe aponta para o ativo e o deprecated fica só no manifest. Ícone em pasta sem entrada no
 * catálogo também entra (bucket "outros"), para export manual não se perder.
 *
 * Ferramenta de desenvolvimento: o site não depende de build, só dos arquivos gerados.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ICONS = path.join(ROOT, "assets/icons");
const svgs = (abs) => fs.existsSync(abs) ? fs.readdirSync(abs).filter((f) => f.toLowerCase().endsWith(".svg")).map((f) => f.slice(0, -4)) : [];
// Nomes do Figma podem ter espaço, barra ou maiúscula → classe segura
const cls = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const catalogPath = path.join(ICONS, "catalog.json");
const catalog = fs.existsSync(catalogPath) ? JSON.parse(fs.readFileSync(catalogPath, "utf8")) : { buckets: [] };

// Buckets na ordem do catálogo (= ordem das categorias no Figma); deprecated por último; glifos à parte
const dirs = fs.readdirSync(ICONS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const known = catalog.buckets.map((b) => b.id);
const buckets = catalog.buckets.filter((b) => dirs.includes(b.id)).map((b) => {
  const onDisk = new Set(svgs(path.join(ICONS, b.id)));
  const listed = b.icons.filter((i) => onDisk.has(i.name));
  const extra = [...onDisk].filter((n) => !listed.some((i) => i.name === n)).sort().map((n) => ({ name: n, keywords: [] }));
  return { id: b.id, name: b.name, deprecated: !!b.deprecated, icons: listed.concat(extra) };
});
dirs.filter((d) => !known.includes(d)).sort().forEach((d) => buckets.push({
  id: d, name: d === "_glyphs" ? "Glifos de componentes" : d, deprecated: false, glyphs: d === "_glyphs",
  icons: svgs(path.join(ICONS, d)).sort().map((n) => ({ name: n, keywords: [] })),
}));
// Legado: SVG solto na raiz de assets/icons
const loose = svgs(ICONS);
if (loose.length) buckets.push({ id: "", name: "Sem categoria", deprecated: false, icons: loose.sort().map((n) => ({ name: n, keywords: [] })) });
buckets.sort((a, b) => (a.deprecated - b.deprecated) || (!!a.glyphs - !!b.glyphs));

// Classe única por nome: o primeiro ativo vence; duplicado deprecated não gera classe
const byName = new Map(), dupes = [];
buckets.forEach((b) => b.icons.forEach((i) => {
  const c = cls(i.name), file = (b.id ? b.id + "/" : "") + i.name + ".svg";
  const entry = { name: i.name, cls: "cds-icon--" + c, bucket: b.id || null, file, keywords: i.keywords || [], deprecated: b.deprecated };
  if (byName.has(c)) { dupes.push(file); entry.cls = null; } else byName.set(c, entry);
  i.entry = entry;
}));

const all = buckets.flatMap((b) => b.icons.map((i) => i.entry));
const withClass = all.filter((e) => e.cls);
const css = `/* GERADO por scripts/build-assets.js · não editar à mão · ${withClass.length} ícones em ${buckets.length} buckets */
/* URL em longhand, sem var(): o Safari falha com var() no shorthand -webkit-mask */
${buckets.map((b) => {
  const rows = b.icons.map((i) => i.entry).filter((e) => e.cls).map((e) => {
    const url = "../assets/icons/" + e.file.split("/").map(encodeURIComponent).join("/");
    return `.${e.cls}{ -webkit-mask-image:url("${url}"); mask-image:url("${url}"); }`;
  });
  return rows.length ? `/* ${b.name}${b.deprecated ? " (deprecated)" : ""} */\n` + rows.join("\n") : "";
}).filter(Boolean).join("\n")}
`;
fs.writeFileSync(path.join(ROOT, "styles/icons.css"), css);

const illustrations = svgs(path.join(ROOT, "assets/illustrations")).sort((a, b) => a.localeCompare(b));
const manifest = `/* GERADO por scripts/build-assets.js · não editar à mão */
window.CDS = window.CDS || {};
CDS.assets = ${JSON.stringify({
  // icons: só os que têm classe (o que o iconSwap lista); iconBuckets: a organização completa
  icons: withClass.filter((e) => !e.deprecated).map((e) => ({ name: e.name, cls: e.cls, bucket: e.bucket, keywords: e.keywords })),
  iconBuckets: buckets.map((b) => ({ id: b.id, name: b.name, deprecated: b.deprecated, glyphs: !!b.glyphs, icons: b.icons.map((i) => i.entry.name) })),
  illustrations: illustrations.map((n) => ({ name: n, src: "assets/illustrations/" + encodeURIComponent(n) + ".svg" })),
})};
`;
fs.writeFileSync(path.join(ROOT, "scripts/assets-manifest.js"), manifest);

console.log(`icons.css: ${withClass.length} ícones (${buckets.map((b) => b.id || "raiz").join(", ")}) · ${dupes.length ? "sem classe (nome repetido): " + dupes.join(", ") + " · " : ""}${illustrations.length} ilustrações`);
