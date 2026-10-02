/* Playground — Table */
CDS.register({
  id: "table", name: "Table", category: "Tables", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13472-5725",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-table", { label: "Tabela de exemplo", style: "width:1053px;max-width:none;flex:none" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-selection", function(e){ ctx.readout(e.detail.ids.length + " linha(s) selecionada(s)", false); });
    p.addEventListener("cds-sort", function(e){ ctx.readout("ordenado por " + e.detail.key + " · " + e.detail.direction, false); });
    kit.hint(panel, "1053px no Figma; o preview rola na horizontal (use 1366). Clique no .Head para ordenar; o checkbox do cabeçalho marca a página.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["empty","Empty"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.section(panel, "Booleans");
    [["show-toolbar","Show Toolbar"],["show-pagination","Show Pagination"],["selectable","Coluna Checkbox"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Dados");
    kit.toggle(panel, { label: "Usar dados de exemplo (23 linhas)", checked: false, onChange: function(on){
      if (!on){ p._columns = null; p._rows = null; p.render(); return; }
      var cat = ["Alimentação","Refeição","Mobilidade","Saúde","Cultura"], ap = ["positive","warning","neutral"];
      p.columns = [{ key: "name", label: "Colaborador", kind: "text" }, { key: "saldo", label: "Saldo", kind: "balance" }, { key: "uso", label: "Uso", kind: "percentage" }, { key: "status", label: "Status", kind: "tag" }, { key: "acoes", label: "Ações", kind: "actions", sortable: false, width: 160 }];
      var rows = []; for (var i = 1; i <= 23; i++) rows.push({ id: "c" + i, name: { text: "Pessoa " + i, description: cat[i % 5] }, saldo: ((i * 137) % 1000) + ",00", uso: ((i * 7) % 100) + ",00", status: { label: ["Ativo","Pendente","Inativo"][i % 3], appearance: ap[i % 3], showLeadItem: false }, acoes: { actions: [{ icon: "edit-line", label: "Editar", action: "edit" }, { icon: "delete-line", label: "Excluir", action: "delete" }] } });
      p.rows = rows;
    } });
  }
});
