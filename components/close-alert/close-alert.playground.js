/* Playground — .Close Alert (building block) */
CDS.register({
  id: "close-alert", name: ".Close Alert", category: "Feedback", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11830-5584",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-close-alert", { label: "Fechar aviso" }); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "Hovered e Pressed são interação (fundo escuro + ícone inversed).");
    kit.section(panel, "Texts");
    kit.text(panel, { label: "label (nome acessível)", value: "Fechar aviso", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
