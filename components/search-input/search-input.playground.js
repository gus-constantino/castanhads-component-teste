/* Playground — Search Input */
CDS.register({
  id: "search-input", name: "Search Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=14880-3404",
  mount: function(ctx){
    var kit = ctx.kit;
    var p = kit.textField(ctx, {
      tag: "cds-search-input",
      attrs: { label: "Label", supporting: "Supporting Message", error: "Error Message" },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"]],
      texts: [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],["placeholder","Placeholder",""],["value","Value (prefill)",""]],
      nested: function(p){ return [
        { title: "Lead Icon", exposed: false, note: "Fixo: search-line.", props: function(){ return [["Lead Icon", "search-line"]]; } },
        { title: "Clear Button · Icon Button", exposed: false, note: "Ghost · Neutral · Small · close-line. Aparece com valor (Is Filled) e Show Trailing Item; Esc também limpa.",
          props: function(){ var b = p.clearBtn; return [["Visível", String(!!b && !b.hidden)], ["aria-label", b ? b.getAttribute("label") : ""]]; } }
      ]; }
    });
    p.addEventListener("cds-clear", function(){ ctx.readout("busca limpa", false); });
    p.addEventListener("cds-search", function(e){ ctx.readout("buscar: " + e.detail.value, true); });
  }
});
