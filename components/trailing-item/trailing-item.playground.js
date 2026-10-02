/* Playground — .Trailing Item (building block) */
CDS.register({
  id: "trailing-item", name: ".Trailing Item", category: "Lists", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-647",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-trailing-item", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Usado no Selection List Item e no Content List Item. O controle aparece sem rótulo (Show Text Label = false); o nome vem da linha.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "checkbox", options: [["checkbox","Checkbox"],["radio-button","Radio"],["switch","Switch"],["icon","Icon"],["tag","Tag"]], onChange: function(v){ p.setAttribute("kind", v); } });
  }
});
