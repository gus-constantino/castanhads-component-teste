/* Playground — Accordion Item */
CDS.register({
  id: "accordion-item", name: "Accordion Item", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/R7GDqtUKeNZZUg45M1llyr/-CastanhaDS--Components?node-id=24673-26248",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-accordion-item", {}, [kit.el("p", { text: "Conteúdo do Slot. Use para texto, listas ou formulários curtos que a pessoa abre sob demanda.", style: "box-sizing:border-box;min-height:82px;margin:0;font:var(--text-style-caption-regular);color:var(--common-colors-text-medium)" })]);
    ctx.preview.appendChild(p);
    p.addEventListener("cds-toggle", function(e){ ctx.readout(e.detail.collapsed ? "recolhido" : "aberto", false); });
    kit.hint(panel, "Componente novo, na branch do Figma. O padrão do Figma é aberto (Is Collapsed=False). Clique no cabeçalho para abrir e fechar.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"]], onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.toggle(panel, { label: "Is Collapsed", checked: false, onChange: function(on){ kit.attr(p, "collapsed", on); } });
    kit.section(panel, "Booleans");
    [["show-lead-item","Show Lead Item"],["show-divider","Show Divider"],["show-description",".Text Content · Show Description"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["label",".Text Content · Label Content","Label"],["description",".Text Content · Text Description","Description"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Item · Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("lead-icon", v); } });
  }
});
