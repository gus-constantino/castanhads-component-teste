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
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "components");

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
    .map((id) => `<link rel="stylesheet" href="${prefix}components/${id}/${id}.css" />`).join("\n");
  const js = order.map((id) => {
    const lines = [`<script src="${prefix}components/${id}/${id}.js"></script>`];
    if (fs.existsSync(path.join(DIR, id, id + ".playground.js"))) lines.push(`<script src="${prefix}components/${id}/${id}.playground.js"></script>`);
    return lines.join("\n");
  }).join("\n");
  return { css, js };
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
  fs.writeFileSync(abs, html);
  return true;
}

rewrite("index.html", "");
const smoke = rewrite("tests/smoke.html", ""); // smoke.html usa <base href="../">
console.log(`${order.length} componentes em ordem de dependência → index.html${smoke ? " + tests/smoke.html" : ""}`);
console.log(order.map((id) => deps[id].length ? `${id} ← ${deps[id].join(", ")}` : id).join("\n"));
