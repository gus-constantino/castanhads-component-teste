/* Playground — Password Input */
CDS.register({
  id: "password-input", name: "Password Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5798-2677",
  mount: function(ctx){
    var kit = ctx.kit;
    var p = kit.textField(ctx, {
      tag: "cds-password-input",
      attrs: { label: "Senha", supporting: "Supporting Message", error: "Error Message" },
      variants: function(panel, p, set){
        kit.toggle(panel, { label: "Show Content", onChange: function(on){ set("show-content", on ? "true" : null); } });
      },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-lead-icon","Show Lead Icon"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"]],
      texts: [["label","Text Label","Senha"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],["placeholder","Placeholder Content",""],["value","Value (prefill)",""]],
      leadIcon: "placeholder-line",
      nested: function(p){ return [
        { title: "Visibility Action · Icon Button", exposed: false, note: "Ghost · Neutral · Small. hide-line com o conteúdo visível, hide-off-line mascarado. Sem valor fica indisponível.",
          props: function(){ var b = p.visBtn; return b ? [["Icon", b.getAttribute("icon")], ["State", b.hasAttribute("disabled") ? "Disabled" : "Enabled"], ["aria-label", b.getAttribute("label")], ["aria-pressed", b.getAttribute("pressed")]] : []; } }
      ]; }
    });
    p.addEventListener("cds-visibility-change", function(e){ ctx.readout(e.detail.visible ? "conteúdo visível" : "conteúdo oculto", false); });
  }
});
