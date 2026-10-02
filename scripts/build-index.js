#!/usr/bin/env node
/**
 * Gera os blocos de componentes do index.html (e do tests/smoke.html) em ordem de dependência.
 *   node scripts/build-index.js
 *
 * Cada components/<id>/<id>.js declara as dependências no JSDoc do topo:
 *    * @deps icon badge        (ids de outras pastas em components/; "—" = nenhuma)
 * O script faz a ordenação topológica (desempate alfabético) e reescreve o conteúdo entre:
 *    <!-- @components:css --> … <!-- /@components:css -->
 *    <!-- @components:js -->  … <!-- /@components:js -->
 * Falha se houver dependência inexistente ou ciclo.
 *
 * Cache-busting: todo .js/.css local citado entre aspas no HTML (inclusive o tests/smoke.js carregado
 * por script) recebe ?v=<8 primeiros do sha1 do conteúdo>. Só a URL do arquivo que mudou muda.
 *
 * Recursos de suporte (resources/<id>/<id>.js + .css opcional) entram depois dos componentes:
 * são páginas de doc das libs de apoio ([Caju] Icons, Illustrations…), sem dependências.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "components");
const RES = path.join(ROOT, "resources");
const resources = fs.existsSync(RES) ? fs.readdirSync(RES).filter((d) => fs.existsSync(path.join(RES, d, d + ".js"))).sort() : [];

const comps = fs.readdirSync(DIR).filter((d) => fs.existsSync(path.join(DIR, d, d + ".js"))).sort();
const deps = {};
for (const id of comps){
  const src = fs.readFileSync(path.join(DIR, id, id + ".js"), "utf8");
  const m = src.match(/@deps\s+([^\n*]+)/);
  if (!m) throw new Error(`components/${id}/${id}.js sem @deps no JSDoc`);
  deps[id] = m[1].trim() === "—" ? [] : m[1].trim().split(/\s+/);
  for (const d of deps[id]) if (!comps.includes(d)) throw new Error(`${id} depende de "${d}", que não existe em components/`);
}

// Ordenação topológica (Kahn) com desempate alfabético → saída estável
const order = [], indeg = {}, users = {};
comps.forEach((c) => { indeg[c] = deps[c].length; users[c] = []; });
comps.forEach((c) => deps[c].forEach((d) => users[d].push(c)));
const ready = comps.filter((c) => indeg[c] === 0);
while (ready.length){
  ready.sort();
  const c = ready.shift(); order.push(c);
  users[c].forEach((u) => { if (--indeg[u] === 0) ready.push(u); });
}
if (order.length !== comps.length) throw new Error("ciclo de dependências entre: " + comps.filter((c) => !order.includes(c)).join(", "));

function blocks(prefix){
  const css = order.filter((id) => fs.existsSync(path.join(DIR, id, id + ".css")))
    .map((id) => `<link rel="stylesheet" href="${prefix}components/${id}/${id}.css" />`)
    .concat(resources.filter((id) => fs.existsSync(path.join(RES, id, id + ".css"))).map((id) => `<link rel="stylesheet" href="${prefix}resources/${id}/${id}.css" />`))
    .join("\n");
  const js = order.map((id) => {
    const lines = [`<script src="${prefix}components/${id}/${id}.js"></script>`];
    if (fs.existsSync(path.join(DIR, id, id + ".playground.js"))) lines.push(`<script src="${prefix}components/${id}/${id}.playground.js"></script>`);
    if (fs.existsSync(path.join(DIR, id, id + ".docs.js"))) lines.push(`<script src="${prefix}components/${id}/${id}.docs.js"></script>`);
    return lines.join("\n");
  }).concat(resources.map((id) => `<script src="${prefix}resources/${id}/${id}.js"></script>`)).join("\n");
  return { css, js };
}

// ?v=hash em todo .js/.css local (caminhos relativos à raiz; o smoke.html usa <base href="../">)
const hashes = {};
function hashOf(rel){
  if (!(rel in hashes)){
    const f = path.join(ROOT, rel);
    hashes[rel] = fs.existsSync(f) ? crypto.createHash("sha1").update(fs.readFileSync(f)).digest("hex").slice(0, 8) : null;
  }
  return hashes[rel];
}
function stamp(html){
  return html.replace(/(["'])([\w./-]+\.(?:js|css))(?:\?v=[0-9a-f]+)?\1/g, (m, q, rel) => {
    const h = hashOf(rel);
    return h ? `${q}${rel}?v=${h}${q}` : m;
  });
}

function rewrite(file, prefix){
  const abs = path.join(ROOT, file);
  if (!fs.existsSync(abs)) return false;
  let html = fs.readFileSync(abs, "utf8");
  const b = blocks(prefix);
  const put = (name, body) => {
    const re = new RegExp(`(<!-- @components:${name} -->)[\\s\\S]*?(<!-- /@components:${name} -->)`);
    if (!re.test(html)) throw new Error(`${file} sem os marcadores @components:${name}`);
    html = html.replace(re, `$1\n${body}\n$2`);
  };
  put("css", b.css); put("js", b.js);
  html = stamp(html);
  fs.writeFileSync(abs, html);
  return true;
}

rewrite("index.html", "");
const smoke = rewrite("tests/smoke.html", ""); // smoke.html usa <base href="../">
console.log(`${order.length} componentes em ordem de dependência → index.html${smoke ? " + tests/smoke.html" : ""}`);
console.log(order.map((id) => deps[id].length ? `${id} ← ${deps[id].join(", ")}` : id).join("\n"));
