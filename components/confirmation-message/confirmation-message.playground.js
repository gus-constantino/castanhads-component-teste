/* Playground — Confirmation Message */
CDS.register({
  id: "confirmation-message", name: "Confirmation Message", category: "Content", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16359-1803",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-confirmation-message", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["positive","Positive"],["warning","Warning"]], onChange: function(v){ kit.attr(p, "appearance", v === "neutral" ? null : v); } });
    kit.section(panel, "Texts");
    kit.hint(panel, "No Figma, título e descrição não são props (texto da amostra); aqui viram atributos.");
    kit.text(panel, { label: "Title", value: "Title", onInput: function(v){ p.setAttribute("title", v); } });
    kit.text(panel, { label: "Description", value: "Unleash your potential! Our tools are here to help you transform your ideas into reality with simplicity and flair.", onInput: function(v){ p.setAttribute("description", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon do Shaped Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
