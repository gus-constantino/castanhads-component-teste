/* Playground — Currency */
CDS.register({
  id: "currency", name: "Currency", category: "Content",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5301-2173",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16); border-radius:var(--common-border-radius-medium);" });
    var p = kit.el("cds-currency", { value: "100,00", symbol: "R$", appearance: "neutral", size: "small" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v); stage.style.background = v === "inversed" ? "var(--common-colors-surface-inversed)" : ""; } });
    kit.seg(panel, { label: "Size", value: "small", options: [["small","Small"],["medium","Medium"],["large","Large"],["largest","Largest"]], onChange: function(v){ set("size", v); } });
    kit.toggle(panel, { label: "Show Value", checked: true, onChange: function(on){ set("show-value", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Valor", value: "100,00", onInput: function(v){ p.setAttribute("value", v); } });
    kit.text(panel, { label: "Símbolo", value: "R$", onInput: function(v){ p.setAttribute("symbol", v); } });
  }
});
