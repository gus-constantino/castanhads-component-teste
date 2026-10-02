/* Playground — Multi Select Input */
CDS.register({
  id: "multi-select-input", name: "Multi Select Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13795-4984",
  mount: function(ctx){ ctx.kit.selectField(ctx, { tag: "cds-multi-select-input", async: true, note: "Cada escolha vira um Input Chip. O × do chip ou Backspace com o campo vazio removem." }); }
});
