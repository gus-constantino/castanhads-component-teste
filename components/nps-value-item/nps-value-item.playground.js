/* Playground — .Value Item (NPS, building block) */
CDS.register({
  id: "nps-value-item", name: ".Value Item", category: "Rating Score", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10100-1137",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-nps-value-item", {}); ctx.preview.appendChild(p);
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"]], onChange: function(v){ kit.attr(p, "state", v === "enabled" ? null : v); } });
    kit.seg(panel, { label: "Status", value: "unselected", options: [["unselected","Unselected"],["selected","Selected"]], onChange: function(v){ kit.attr(p, "selected", v === "selected"); } });
  }
});
