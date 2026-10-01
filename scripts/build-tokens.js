#!/usr/bin/env node
/**
 * Gera styles/tokens.css a partir de tokens/figma-snapshot.json.
 *   node scripts/build-tokens.js
 *
 * Nomenclatura: Common/Colors/Text/intense → --common-colors-text-intense (1:1 com o Figma).
 * Text styles:  Label/Medium Label        → --text-style-label-medium (shorthand `font`)
 * Elevations:   Common/Elevations/Level 1 → --common-elevation-level-1 (box-shadow pronto)
 * Motion Styles: Hover In/01/Timing       → --motion-hover-in-timing
 *
 * Ferramenta de desenvolvimento: o site não depende de build, só do CSS gerado.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const snap = JSON.parse(fs.readFileSync(path.join(ROOT, "tokens/figma-snapshot.json"), "utf8"));

const slug = (s) => s.replace(/^Common\//, "common/").toLowerCase().replace(/[^a-z0-9/]+/g, "-").replace(/\//g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
const num = (n) => +(+n).toFixed(4);
const bezier = (b) => `cubic-bezier(${b.map(num).join(", ")})`;

function value(name, type, v){
  if (type === "C") return v;
  if (type === "S") return `"${v}"`;
  if (type === "E") return bezier(v);
  if (type === "T") return `${Math.round(v * 1000)}ms`;
  // floats
  if (/\/Opacity\//.test(name) || /^Common\/Opacity/.test(name)) return String(num(v / 100));
  if (/Font\/Weight/.test(name)) return String(v);
  if (/Font\/Line Height/.test(name)) return String(num(v / 100));
  if (/Motion\/Delay|\/Delay$/.test(name)) return `${v}ms`;
  return `${num(v)}px`;
}

const light = [], dark = [];
function push(name, type, l, d){
  const prop = "--" + slug(name);
  light.push(`  ${prop}:${value(name, type, l)};`);
  if (d !== undefined && d !== l) dark.push(`  ${prop}:${value(name, type, d)};`);
}

snap.brand.forEach((r) => push(r[0], r[1], r[2], r[3]));
snap.motion.forEach((r) => push("Motion/" + r[0].replace("/01/", "/"), r[1], r[2], r[3]));

// Elevations prontas para box-shadow
const elevations = snap.elevations.map(([, lvl]) => {
  const k = slug("Common/Elevations/" + lvl);
  return `  --common-elevation-${lvl.toLowerCase().replace(/\s+/g, "-")}:var(${"--" + k}-x) var(${"--" + k}-y) var(${"--" + k}-blur) var(${"--" + k}-spread) var(${"--" + k}-color);`;
});

// Text styles → shorthand `font` (+ decoration para Link)
const WEIGHT = { Regular: 400, Medium: 500, Bold: 700, Light: 300 };
const texts = snap.textStyles.map(([name, family, style, size, lh, deco]) => {
  const [group, raw] = name.split("/");
  const variant = raw.replace(new RegExp(`\\s*${group}\\s*`, "i"), " ").trim() || raw;
  const prop = `--text-style-${slug(group)}-${slug(variant)}`;
  const fallback = family === "Work Sans" ? `"Work Sans", Roboto, Arial, sans-serif` : `Roboto, Arial, sans-serif`;
  let line = `  ${prop}:${WEIGHT[style] || 400} ${size}px/${num(lh / 100)} ${fallback};`;
  if (deco === "UNDERLINE") line += `\n  ${prop}-decoration:underline;`;
  return line;
});

const out = `/* =====================================================================
   Tokens — Castanha DS · GERADO por scripts/build-tokens.js · não editar à mão
   Fonte: tokens/figma-snapshot.json (${snap._source})
   ===================================================================== */
:root{
${light.join("\n")}

  /* Elevations (effect styles Elevation/level 1–3) */
${elevations.join("\n")}

  /* Text styles */
${texts.join("\n")}

  /* Aliases usados pelos componentes (Motion Styles por interação) */
  --motion-hover-duration:var(--motion-hover-in-timing);     --motion-hover-easing:var(--motion-hover-in-easing);
  --motion-press-duration:var(--motion-pressed-timing);      --motion-press-easing:var(--motion-pressed-easing);
  --motion-active-duration:var(--motion-selected-in-timing); --motion-active-easing:var(--motion-selected-in-easing);
  /* Icon Button Enabled → Hovered: reaction 300ms ease-out (não é Motion Style) */
  --motion-icon-button-duration:300ms; --motion-icon-button-easing:ease-out;
}
html[data-theme="dark"]{
${dark.join("\n")}
}
`;
fs.writeFileSync(path.join(ROOT, "styles/tokens.css"), out);
console.log(`styles/tokens.css: ${light.length} tokens (${dark.length} com valor dark), ${texts.length} text styles, ${elevations.length} elevations`);
