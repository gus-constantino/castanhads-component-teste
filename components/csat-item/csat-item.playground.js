/* Playground — .CSAT Item (building block) */
CDS.register({
  id: "csat-item", name: ".CSAT Item", category: "Rating Score", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10100-1155",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-csat-item", { style: "width:48px;flex:none" }); ctx.preview.appendChild(p);
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"]], onChange: function(v){ kit.attr(p, "state", v === "enabled" ? null : v); } });
    kit.toggle(panel, { label: "Is Active", checked: false, onChange: function(on){ kit.attr(p, "active", on); } });
    kit.toggle(panel, { label: "Show Label Content", checked: true, onChange: function(on){ kit.attr(p, "show-label-content", on ? null : "false"); } });
    kit.text(panel, { label: "Label Content", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
