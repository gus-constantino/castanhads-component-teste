/* Playground — Caju Brand */
CDS.register({
  id: "caju-brand", name: "Caju Brand", category: "Images",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11271-154",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-24); border-radius:var(--common-border-radius-medium);" });
    var p = kit.el("cds-caju-brand", { kind: "default" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    // Fundo sugerido pela description: atente-se à cor do fundo
    var BG = { "default": "", "inversed": "var(--common-colors-surface-inversed)", "full-red": "", "full-white": "var(--common-colors-surface-accent)", "full-black": "" };
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["inversed","Inversed"],["full-red","Full Red"],["full-white","Full White"],["full-black","Full Black"]],
      hint: "Inversed e Full White ganham fundo escuro/vermelho no preview, como pede a description.",
      onChange: function(v){ p.setAttribute("kind", v); stage.style.background = BG[v]; } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Typography", checked: true, onChange: function(on){ kit.attr(p, "show-typography", on ? null : "false"); } });
  }
});
