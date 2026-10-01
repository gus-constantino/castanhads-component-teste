/* Playground — Status Dot */
CDS.register({
  id: "status-dot", name: "Status Dot", category: "Status",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=21745-69",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-status-dot", { label: "Label", appearance: "neutral", size: "small" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["positive","Positive"],["warning","Warning"],["informative","Informative"],["negative","Negative"]], onChange: function(v){ set("appearance", v); } });
    kit.seg(panel, { label: "Size", value: "small", options: [["small","Small"],["medium","Medium"],["large","Large"]], onChange: function(v){ set("size", v); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", hint: "Escreva o status por extenso — o ponto é só reforço visual.", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
