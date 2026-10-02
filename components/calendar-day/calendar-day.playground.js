/* Playground — .Day (building block) */
CDS.register({
  id: "calendar-day", name: ".Day", category: "Datepicker", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17482-44817",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-calendar-day", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Role", value: "default", options: [["default","Default"],["start","Start"],["middle","Middle"],["end","End"]], onChange: function(v){ kit.attr(p, "role-kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"]], onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.seg(panel, { label: "Status", value: "unselected", options: [["unselected","Unselected"],["selected","Selected"]], onChange: function(v){ kit.attr(p, "selected", v === "selected"); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Is Current Day", checked: false, onChange: function(on){ kit.attr(p, "current", on); } });
  }
});
