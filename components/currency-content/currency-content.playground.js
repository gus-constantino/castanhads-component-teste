/* Playground — .Currency Content */
CDS.register({
  id: "currency-content", name: ".Currency Content", category: "Building Blocks", block: true,
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-631",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-currency-content", {});
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Negative Symbol", checked: true, onChange: function(on){ set("show-negative-symbol", on ? null : "false"); } });
    kit.toggle(panel, { label: "Show Description", checked: true, onChange: function(on){ set("show-description", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Value", value: "30.000,00", onInput: function(v){ p.setAttribute("value", v); } });
    kit.text(panel, { label: "Currency Symbol", value: "R$", onInput: function(v){ p.setAttribute("symbol", v); } });
    kit.text(panel, { label: "Text Description", value: "Description", onInput: function(v){ p.setAttribute("description", v); } });
  }
});
