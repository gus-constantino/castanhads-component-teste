/* Playground — Text Area Input */
CDS.register({
  id: "text-area", name: "Text Area Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10110-3028",
  mount: function(ctx){
    ctx.kit.textField(ctx, {
      tag: "cds-text-area",
      attrs: { label: "Label", supporting: "Supporting Message", error: "Error Message", maxlength: "300" },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"]],
      texts: [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],
        ["placeholder","Placeholder Content",""],["maxlength","Limite (contador n/max)","300"],["max-rows","Máx. de linhas antes de rolar","","sem limite","O Text Box começa em 72px e cresce com o texto."]]
    });
  }
});
