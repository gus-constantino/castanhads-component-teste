/* Playground — Shaped Icon */
CDS.register({
  id: "shaped-icon", name: "Shaped Icon", category: "Images",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2272-146",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-shaped-icon", { icon: "placeholder-line", appearance: "neutral", size: "smallest" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["inversed","Inversed"],["accent","Accent"],["positive","Positive"],["warning","Warning"],["negative","Negative"],["informative","Informative"]], onChange: function(v){ set("appearance", v); } });
    kit.seg(panel, { label: "Size", value: "smallest", options: [["smallest","Smallest 32"],["small","Small 40"],["medium","Medium 48"],["large","Large 56"]], onChange: function(v){ set("size", v); } });

    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon", value: "placeholder-line", onChange: function(v){ set("icon", v); } });

    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, {
      title: "Icon", exposed: false, note: "Size e Appearance derivam do Shaped Icon.",
      props: function(){ var i = p.iconEl; return i ? [["Choose Icon", i.getAttribute("icon")], ["Appearance", i.getAttribute("appearance")], ["Size", i.getAttribute("size")]] : []; }
    });
    kit.watch(p, refresh);
  }
});
