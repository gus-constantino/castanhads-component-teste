/* Playground — .Toolbar (building block) */
CDS.register({
  id: "table-toolbar", name: ".Toolbar", category: "Tables", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13438-14337",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-table-toolbar", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Slot: os filhos de quem usa. Amostra com 3 Icon Buttons Ghost Neutral Small.");
  }
});
