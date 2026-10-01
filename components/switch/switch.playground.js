/* Playground — Switch */
CDS.register({
  id: "switch", name: "Switch", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4895-809",
  mount: function(ctx){ ctx.kit.selectionControl(ctx, { tag: "cds-switch", statuses: [["unselected","Unselected"],["selected","Selected"]],
    extraHint: "Motion de 300ms (exceção do Switch: o toggle percorre distância)." }); }
});
