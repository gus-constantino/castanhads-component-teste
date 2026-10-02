/* Playground — Breadcrumb */
CDS.register({
  id: "breadcrumb", name: "Breadcrumb", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6792-24",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-breadcrumb", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Amostra do Figma: o 1º item é Truncate (…) e abre o Popover com os níveis escondidos. No código, os filhos <code>&lt;a href&gt;</code> viram os níveis e o último é a página atual.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Popover", checked: false, onChange: function(on){ kit.attr(p, "show-popover", on); } });
    [3,4,5,6].forEach(function(i){ kit.toggle(panel, { label: "showItem0" + i, checked: true, onChange: function(on){ kit.attr(p, "show-item0" + i, on ? null : "false"); } }); });
    kit.section(panel, "Exemplo com links");
    var demo = kit.el("cds-breadcrumb", { collapse: "1", style: "margin-top:var(--common-sizes-16)" }, [kit.el("a", { href: "#", text: "Início" }), kit.el("a", { href: "#", text: "Benefícios" }), kit.el("a", { href: "#", text: "Alimentação" }), kit.el("a", { href: "#", text: "Extrato" })]);
    var t = kit.toggle(panel, { label: "Mostrar exemplo (4 níveis, collapse=1)", checked: false, onChange: function(on){ if (on) ctx.preview.appendChild(demo); else demo.remove(); } });
  }
});
