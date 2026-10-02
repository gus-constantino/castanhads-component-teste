/* Playground — Async Select Input */
CDS.register({
  id: "async-select-input", name: "Async Select Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11030-7644",
  mount: function(ctx){ ctx.kit.selectField(ctx, { tag: "cds-async-select-input", async: true, note: "Escolha única com busca. Digite para filtrar; setas, Enter e Esc funcionam no campo." }); }
});
