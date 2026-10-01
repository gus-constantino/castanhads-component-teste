/* Playground — Text Input */
CDS.register({
  id: "text-input", name: "Text Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5743-325",
  mount: function(ctx){
    var kit = ctx.kit;
    kit.textField(ctx, {
      tag: "cds-text-input",
      attrs: { label: "Label", supporting: "Supporting Message", error: "Error Message", maxlength: "100" },
      variants: function(panel, p, set){
        kit.select(panel, { label: "Mask (.Text Content Mask)", value: "text",
          options: [["text","Text"],["cpf","CPF"],["cnpj","CNPJ"],["cnpj-new","CNPJ New"],["telefone","Telefone"],["celular","Celular"],["cep","CEP"],["date","Date"],["currency","Currency"]],
          hint: "O valor guardado é só o dado; a pontuação vem da máscara. Currency digita da direita (centavos).",
          onChange: function(v){ set("mask", v === "text" ? null : v); } });
      },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-lead-icon","Show Lead Icon"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"]],
      texts: [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],
        ["placeholder","Placeholder","",""],["maxlength","Limite (contador n/max)","100","","Com limite, o Character Counter mostra n/max."],["value","Value (prefill)",""]],
      leadIcon: "placeholder-line",
      nested: function(p){ return [
        { title: ".Text Content Mask", exposed: true, note: "Building block compartilhado da família. <code>Mask</code> define o formato e o placeholder.",
          props: function(){ return [["Mask", p.getAttribute("mask") || "text"], ["Placeholder", p.input ? p.input.placeholder : ""], ["Is Filled", String(!!p.value)]]; } },
        { title: "Lead Icon", exposed: true, note: "Instance swap (16×16).", props: function(){ return [["Show Lead Icon", String(!(p.leadEl && p.leadEl.hidden))], ["Lead Icon", p.getAttribute("lead-icon") || "placeholder-line"]]; } },
        { title: "Trailing Icon", exposed: false, note: "warning-line, só no Warning (Show Trailing Item).", props: function(){ return [["Visível", String(!(p.warnEl && p.warnEl.hidden))]]; } }
      ]; }
    });
  }
});
