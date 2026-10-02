/* Playground — .Item Nav Control (building block) */
CDS.register({
  id: "nav-control-item", name: ".Item Nav Control", category: "Navigation", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=19188-379",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, wrap = kit.el("div", { style: "padding:8px;border-radius:var(--common-border-radius-small)" });
    var p = kit.el("cds-nav-control-item", {}); wrap.appendChild(p); ctx.preview.appendChild(wrap);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["inversed","Inversed"]], onChange: function(v){ kit.attr(p, "appearance", v === "accent" ? null : v); wrap.style.background = v === "inversed" ? "var(--common-colors-surface-inversed)" : ""; } });
    kit.toggle(panel, { label: "Is Active", checked: false, onChange: function(on){ kit.attr(p, "is-active", on); } });
  }
});
