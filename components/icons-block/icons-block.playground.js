/* Playground — .Icons */
CDS.register({
  id: "icons-block", name: ".Icons", category: "Building Blocks", block: true,
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5218-1271",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-icons", { kind: "default" });
    ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default (filter-line)"],["date","Date (calendar-line)"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.hint(panel, "Usado pelo Filter button. A cor vem do componente pai.");
  }
});
