/* Playground — Spinner */
CDS.register({
  id: "spinner", name: "Spinner", category: "Loaders",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4333-3181",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-spinner", { appearance: "neutral", size: "small" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["accent","Accent"],["inversed","Inversed"]], onChange: function(v){ set("appearance", v); } });
    kit.seg(panel, { label: "Size", value: "small", options: [["small","Small 16"],["medium","Medium 24"],["large","Large 32"]], onChange: function(v){ set("size", v); } });
    kit.hint(panel, "<code>Spinner Position</code> (0–3) é a animação do protótipo: aqui vira rotação contínua em 4 passos de 200ms ease-out.");
    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "label (anunciado em role=status)", value: "Carregando", onInput: function(v){ set("label", v); } });
  }
});
