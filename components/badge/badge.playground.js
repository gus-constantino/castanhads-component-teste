/* Playground — Badge */
CDS.register({
  id: "badge", name: "Badge", category: "Status",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4835-1472",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-badge", { label: "0", appearance: "warning" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "warning", options: [["warning","Warning"],["neutral","Neutral"]], onChange: function(v){ set("appearance", v); } });
    kit.seg(panel, { label: "Viewport (collection Viewport · Specific/Badge)", value: "auto", options: [["auto","Herdar"],["desktop","Desktop"],["mobile","Mobile"]],
      hint: "<b>Herdar</b> segue o seletor de viewport do topo: 360 = Mobile (ponto de 8px).",
      onChange: function(v){ set("viewport", v === "auto" ? null : v); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label", value: "0", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
