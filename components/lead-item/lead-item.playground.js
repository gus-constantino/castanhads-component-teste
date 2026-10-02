/* Playground — .Lead item (building block) */
CDS.register({
  id: "lead-item", name: ".Lead item", category: "Content", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15621-66",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-lead-item", { src: "assets/brand/sample-photo.svg" }); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "shaped-icon", options: [["shaped-icon","Shaped Icon"],["image","Image"]], onChange: function(v){ kit.attr(p, "kind", v === "shaped-icon" ? null : v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon (Kind=Shaped Icon)", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
