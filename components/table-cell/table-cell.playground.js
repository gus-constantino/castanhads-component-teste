/* Playground — .Data Cell (building block) */
CDS.register({
  id: "table-cell", name: ".Data Cell", category: "Tables", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13404-1015",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-data-cell", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.select(panel, { label: "Kind", value: "text", options: [["text","Text"],["balance","Balance"],["percentage","Percentage"],["tag","Tag"],["checkbox","Checkbox"],["link","Link"],["actions","Action Controls"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"]], onChange: function(v){ kit.attr(p, "state", v === "enabled" ? null : v); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Description", checked: true, onChange: function(on){ kit.attr(p, "show-description", on ? null : "false"); } });
  }
});
