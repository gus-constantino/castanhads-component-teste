/* Playground — Accordion */
CDS.register({
  id: "accordion", name: "Accordion", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/R7GDqtUKeNZZUg45M1llyr/-CastanhaDS--Components?node-id=24841-33746",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-accordion", {});
    ctx.preview.appendChild(p);
    kit.hint(panel, "Componente novo, na branch do Figma. Amostra do Figma: 12 Accordion Items recolhidos.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.section(panel, "Comportamento");
    kit.toggle(panel, { label: "Um aberto por vez (exclusive)", checked: false, onChange: function(on){ kit.attr(p, "exclusive", on); } });
    kit.hint(panel, "Não é prop do Figma: segue a boa prática da description do Accordion Item (abrir um item por vez quando as seções competem).");
  }
});
