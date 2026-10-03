/* Playground — Balance Card */
CDS.register({
  id: "balance-card", name: "Balance Card", category: "Actions", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17881-1707",
  zeroheight: "https://castanha.caju.com.br/858426090/v/latest/p/373420",
  figmaStatus: { status: "changed", checked: "02/10" }, // getPublishStatusAsync do set 17881:1707: current | changed | unpublished
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-balance-card", {}); ctx.preview.appendChild(p);
    p.addEventListener("click", function(){ ctx.readout("abrir detalhe", true); });
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "Hovered (Label mais forte) e Pressed (borda) são interação. O card inteiro é clicável. Experimente: Refeição · 320,50 · meal-line.");
    kit.section(panel, "Booleans");
    [["show-header-tag","Show Header Tag"],["show-bottom-tag","Show Bottom Tag"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.toggle(panel, { label: "Currency · Show Value", checked: true, onChange: function(on){ kit.attr(p, "show-value", on ? null : "false"); } });
    kit.section(panel, "Texts");
    [["label","Text Label","Label"],["value","Valor","100,00"],["header-tag","Header Tag","Tag"],["bottom-tag","Bottom Tag","Tag"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
