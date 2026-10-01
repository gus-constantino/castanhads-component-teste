/* Playground — Tag */
CDS.register({
  id: "tag", name: "Tag", category: "Status",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4475-114",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-tag", { label: "Tag", appearance: "neutral" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["positive","Positive"],["warning","Warning"],["negative","Negative"],["informative","Informative"],["accent","Accent"],["inversed","Inversed"]], onChange: function(v){ set("appearance", v); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Lead Item", checked: true, onChange: function(on){ set("show-lead-item", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Tag", onInput: function(v){ p.setAttribute("label", v); } });

    kit.section(panel, "Nested instances");
    kit.iconSwap(panel, { label: "Icon › Choose Icon", value: "placeholder-line", onChange: function(v){ set("icon", v); } });
    var refresh = kit.nested(panel, {
      title: "Icon", exposed: false, note: "Size Small e Appearance Neutral fixos; a cor é override que acompanha o texto da Tag.",
      props: function(){ var i = p.iconEl; return i ? [["Choose Icon", i.getAttribute("icon")], ["Appearance", "neutral (override de cor)"], ["Size", "small"]] : [["Show Lead Item", "false"]]; }
    });
    kit.watch(p, refresh);
  }
});
