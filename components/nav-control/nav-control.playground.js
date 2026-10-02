/* Playground — Nav Control */
CDS.register({
  id: "nav-control", name: "Nav Control", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=19560-3280",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, wrap = kit.el("div", { style: "padding:16px;border-radius:var(--common-border-radius-medium)" });
    var p = kit.el("cds-nav-control", {}); wrap.appendChild(p); ctx.preview.appendChild(wrap);
    p.addEventListener("cds-change", function(e){ ctx.readout("Item " + e.detail.current + " (" + e.detail.direction + ")", false); });
    kit.hint(panel, "Só leitura: os indicadores não são clicáveis. No desktop as setas avançam em círculo. Viewport 360 = só indicadores; 744 = nada aparece (Is Mobile e Is Desktop falsos no Figma, C46).");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["inversed","Inversed"]], hint: "Inversed vai sobre Surface/accent ou Surface/inversed (description).", onChange: function(v){ kit.attr(p, "appearance", v === "accent" ? null : v); wrap.style.background = v === "inversed" ? "var(--common-colors-surface-inversed)" : ""; } });
    kit.range(panel, { label: "Total", min: 2, max: 10, value: 10, onInput: function(v){ p.setAttribute("total", v); } });
  }
});
