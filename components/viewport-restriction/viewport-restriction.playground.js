/* Playground — Viewport Restriction */
CDS.register({
  id: "viewport-restriction", name: "Viewport Restriction", category: "Utilities", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5357-3899",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-viewport-restriction", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Usado pelo Drawer (mobile e tablet) e pelo Bottom Sheet (desktop) no lugar do componente.");
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text", value: "Componente não disponível nesse viewport", onInput: function(v){ p.setAttribute("text", v); } });
  }
});
