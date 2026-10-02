/* Playground — Slider */
CDS.register({
  id: "slider", name: "Slider", category: "Slider", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20056-11908",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-slider", { value: "0", style: "margin-top:var(--common-sizes-32)" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.value != null ? String(e.detail.value) : e.detail.start + " a " + e.detail.end, false); });
    kit.hint(panel, "Arraste, clique na trilha ou use setas, PageUp/PageDown, Home/End. O Value do Figma é só prototipação (description); aqui o valor é numérico.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "single", options: [["single","Single"],["range","Range"]], onChange: function(v){
      if (v === "range"){ p.setAttribute("kind", "range"); p.setAttribute("min", "-50"); p.setAttribute("max", "50"); p.setAttribute("start", "-20"); p.setAttribute("end", "20"); }
      else { ["kind","min","max","start","end"].forEach(function(a){ p.removeAttribute(a); }); p.setAttribute("value", "0"); } } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["dragged","Dragged"],["disabled","Disabled"]], onChange: function(v){ kit.attr(p, "state", /hovered|pressed|dragged/.test(v) ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.section(panel, "Booleans");
    [["show-stops","Show Stops"],["show-value-indicator","Show Value Indicator"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Valores");
    kit.text(panel, { label: "Step", value: "10", onInput: function(v){ p.setAttribute("step", v); } });
  }
});
