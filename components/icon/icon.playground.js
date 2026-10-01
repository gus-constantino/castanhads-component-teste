/* Playground — Icon */
CDS.register({
  id: "icon", name: "Icon", category: "Images",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2261-1126",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-icon", { icon: "placeholder-line", appearance: "accent", size: "small" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["neutral","Neutral"],["positive","Positive"],["warning","Warning"],["negative","Negative"],["informative","Informative"],["inversed","Inversed"]],
      hint: "Inversed é para fundo escuro — no preview o ícone some sobre o fundo claro.", onChange: function(v){ set("appearance", v); } });
    kit.seg(panel, { label: "Size", value: "small", options: [["small","Small 16"],["medium","Medium 20"],["large","Large 24"]], onChange: function(v){ set("size", v); } });

    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Choose Icon", value: "placeholder-line", onChange: function(v){ set("icon", v); } });

    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "label (nome acessível)", placeholder: "vazio = decorativo (aria-hidden)", onInput: function(v){ set("label", v); } });
  }
});
