/**
 * Smoke test — monta cada playground registrado (CDS.playgrounds) e verifica:
 *   1. o mount não lança erro;
 *   2. o primeiro <cds-*> do preview é um custom element definido;
 *   3. o tamanho bate com tests/expected.js (±1px), quando houver referência.
 * Resultado na tabela e em window.CDS_SMOKE = { pass, fail, rows } (para automação).
 */
(function(){
  "use strict";
  var TOL = 1;
  var rows = [], pass = 0, fail = 0;
  var stage = document.getElementById("stage"), out = document.getElementById("out");
  var exp = window.CDS_EXPECTED || {};

  CDS.playgrounds.slice().sort(function(a, b){ return a.id.localeCompare(b.id); }).forEach(function(def){
    var frame = document.createElement("div"); frame.className = "frame"; frame.dataset.viewport = "desktop";
    var preview = document.createElement("div"), panel = document.createElement("div");
    frame.appendChild(preview); stage.appendChild(frame);
    var r = { id: def.id, name: def.name, errors: [], size: "—", expected: "—" };
    try { def.mount({ preview: preview, panel: panel, kit: CDS.kit, readout: function(){} }); }
    catch (e){ r.errors.push("mount: " + e.message); }
    var el = Array.prototype.find.call(preview.querySelectorAll("*"), function(n){ return n.tagName.indexOf("CDS-") === 0; });
    if (!el) r.errors.push("nenhum <cds-*> no preview");
    else if (!customElements.get(el.tagName.toLowerCase())) r.errors.push(el.tagName.toLowerCase() + " não definido");
    else {
      var b = el.getBoundingClientRect(), w = Math.round(b.width), h = Math.round(b.height);
      r.size = w + "×" + h;
      var e = exp[def.id];
      if (e){
        r.expected = (e.w != null ? e.w : (e.minW != null ? "≥" + e.minW : "*")) + "×" + (e.h != null ? e.h : "*");
        if (e.w != null && Math.abs(w - e.w) > TOL) r.errors.push("largura " + w + " ≠ " + e.w);
        if (e.minW != null && w + TOL < e.minW) r.errors.push("largura " + w + " < " + e.minW);
        if (e.h != null && Math.abs(h - e.h) > TOL) r.errors.push("altura " + h + " ≠ " + e.h);
      } else r.errors.push("sem referência em tests/expected.js");
    }
    r.ok = r.errors.length === 0;
    if (r.ok) pass++; else fail++;
    rows.push(r);
  });

  out.innerHTML = '<p class="sum ' + (fail ? "bad" : "good") + '">' + pass + " ok · " + fail + " com problema · " + rows.length + " componentes</p>" +
    "<table><thead><tr><th></th><th>id</th><th>medido</th><th>esperado (Figma)</th><th>observação</th></tr></thead><tbody>" +
    rows.map(function(r){ return "<tr class=\"" + (r.ok ? "ok" : "ko") + "\"><td>" + (r.ok ? "✅" : "❌") + "</td><td>" + r.id + "</td><td>" + r.size + "</td><td>" + r.expected + "</td><td>" + r.errors.join(" · ") + "</td></tr>"; }).join("") +
    "</tbody></table>";
  document.title = (fail ? "❌ " : "✅ ") + pass + "/" + rows.length + " — smoke";
  window.CDS_SMOKE = { pass: pass, fail: fail, rows: rows };
})();
