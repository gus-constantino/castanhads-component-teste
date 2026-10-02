/* Playground — Selection List Item */
CDS.register({
  id: "selection-list-item", name: "Selection List Item", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-812",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-selection-list-item", { style: "width:320px" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout("Is Active: " + e.detail.active, false); });
    kit.hint(panel, "Clique na linha: alterna Is Active (Radio Button seleciona). Com controle, o foco é o controle nativo, com o nome do Label.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"]], hint: "Hovered e Pressed forçados para inspeção; no uso real vêm do mouse.", onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.toggle(panel, { label: "Is Active", checked: false, onChange: function(on){ kit.attr(p, "is-active", on); } });
    kit.select(panel, { label: "Trailing Item", value: "checkbox", options: [["checkbox","Chechbox (Checkbox)"],["radio-button","Radio Button"],["switch","Switch"],["tag","Tag"],["icon","Icon"],["none","None"]], hint: "O Figma escreve “Chechbox” (C25).", onChange: function(v){ p.setAttribute("trailing-item", v); } });
    kit.section(panel, "Booleans");
    [["show-lead-item","Show Lead Item"],["show-divider","Show Divider"],["show-description","Show Description (.Text Content)"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label Content", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "Text Description", value: "Description", onInput: function(v){ p.setAttribute("description", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Item · Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("lead-icon", v); } });
  }
});
