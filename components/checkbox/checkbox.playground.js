/* Playground — Checkbox */
CDS.register({
  id: "checkbox", name: "Checkbox", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4123-2560",
  mount: function(ctx){ ctx.kit.selectionControl(ctx, { tag: "cds-checkbox", statuses: [["unselected","Unselected"],["selected","Selected"],["indeterminate","Indeterminate"]] }); }
});
