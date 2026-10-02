/* Playground — Async creatable Select Input */
CDS.register({
  id: "async-creatable-select-input", name: "Async creatable Select Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11018-5694",
  mount: function(ctx){ ctx.kit.selectField(ctx, { tag: "cds-async-creatable-select-input", async: true, nestedOption: "Selection List Item + Content List Item", note: "Digite algo que não está na lista: a primeira opção vira <b>Adicionar “…”</b> e cria a opção." }); }
});
