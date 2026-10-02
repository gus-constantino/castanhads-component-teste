/* Playground — Selection List */
CDS.register({
  id: "selection-list", name: "Selection List", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-1552",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-selection-list", { label: "Seleção" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.values.length + " selecionado(s)", false); });
    kit.hint(panel, "Amostra com 12 itens (Chechbox), como no Figma. Clique na linha para marcar.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.select(panel, { label: "Trailing Item (itens)", value: "checkbox", options: [["checkbox","Chechbox"],["radio-button","Radio Button"],["switch","Switch"],["none","None"]], hint: "O Figma só tem Chechbox; os outros vêm do Selection List Item.", onChange: function(v){ p.setAttribute("trailing-item", v); } });
    kit.range(panel, { label: "Itens (amostra)", min: 1, max: 12, value: 12, onInput: function(v){ p.setAttribute("count", v); } });
  }
});
