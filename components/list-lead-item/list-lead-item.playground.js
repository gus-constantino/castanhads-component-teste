/* Playground — .Lead Item (Lists, building block) */
CDS.register({
  id: "list-lead-item", name: ".Lead Item (Lists)", category: "Lists", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-640",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-list-lead-item", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Não é o .Lead item do Topic (mesmo nome com outra caixa, C25).");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "avatar", options: [["avatar","Avatar"],["icon","Icon"],["image","Image"]], onChange: function(v){ p.setAttribute("kind", v); } });
  }
});
