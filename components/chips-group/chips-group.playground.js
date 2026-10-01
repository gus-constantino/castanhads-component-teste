/* Playground — Chips Group */
CDS.register({
  id: "chips-group", name: "Chips Group", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12457-3664",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, kind = "input";
    var g = kit.el("cds-chips-group", { "role-kind": "single", label: "Filtros" });
    ctx.preview.appendChild(g);
    var LABELS = ["Alimentação", "Refeição", "Mobilidade", "Saúde", "Educação", "Cultura", "Home office", "Auxílio"];
    function fill(){ g.innerHTML = ""; LABELS.forEach(function(l){ g.appendChild(kit.el(kind === "input" ? "cds-input-chip" : "cds-filter-chip", { label: l })); }); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "input", options: [["input","Input Chips"],["filter","Filter Chips"]], onChange: function(v){ kind = v; fill(); } });
    kit.seg(panel, { label: "Role", value: "single", options: [["single","Single Row"],["multiple","Multiple Rows"]],
      hint: "Single Row rola na horizontal; Multiple Rows quebra linha. Largura 320.", onChange: function(v){ g.setAttribute("role-kind", v); } });
    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, { title: "Chips (Slot)", exposed: true, note: "Cores e estados são dos chips; o grupo só organiza.",
      props: function(){ return [["Kind", kind === "input" ? "Input Chips" : "Filter Chips"], ["Itens", String(g.children.length)], ["Selecionados", String(g.querySelectorAll("[selected]").length)]]; } });
    kit.watch(g, refresh);
    fill();
  }
});
