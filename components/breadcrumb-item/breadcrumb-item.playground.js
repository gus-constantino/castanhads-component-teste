/* Playground — .Item (Breadcrumb, building block) */
CDS.register({
  id: "breadcrumb-item", name: ".Item (Breadcrumb)", category: "Navigation", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6713-3",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-breadcrumb-item", { "is-active": "", href: "#" }); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["truncate","Truncate"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enable", options: [["enable","Enable"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"]], hint: "O Figma escreve “Enable” (C25).", onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.toggle(panel, { label: "Is Active", checked: true, onChange: function(on){ kit.attr(p, "is-active", on); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Has Separator", checked: true, onChange: function(on){ kit.attr(p, "has-separator", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
