/* Playground — .Close Toast (building block) */
CDS.register({
  id: "close-toast", name: ".Close Toast", category: "Feedback", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5219-558",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var wrap = kit.el("div", { style: "background:var(--common-colors-surface-inversed);padding:16px;border-radius:var(--common-border-radius-small)" });
    var p = kit.el("cds-close-toast", { label: "Fechar mensagem" }); wrap.appendChild(p); ctx.preview.appendChild(wrap);
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "Hovered e Pressed são interação. Mostrado sobre Surface/inversed, como dentro do Toast.");
    kit.section(panel, "Texts");
    kit.text(panel, { label: "label (nome acessível)", value: "Fechar mensagem", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
