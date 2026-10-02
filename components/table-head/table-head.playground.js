/* Playground — .Head (building block) */
CDS.register({
  id: "table-head", name: ".Head", category: "Tables", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13382-1327",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-table-head", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["multi-selection","Multi Selection"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "Sort", value: "default", options: [["default","Default"],["up","Up"],["down","Down"]], onChange: function(v){ kit.attr(p, "sort", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"]], onChange: function(v){ kit.attr(p, "state", v === "enabled" ? null : v); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Head", value: "Head", onInput: function(v){ p.setAttribute("text-head", v); } });
  }
});
