/* Playground — Scrollable Tab */
CDS.register({
  id: "scrollable-tab", name: "Scrollable Tab", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6646-181",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-scrollable-tab", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout("Active Item " + e.detail.index, false); seg.setValue(String(e.detail.index)); });
    kit.hint(panel, "Setas, Home e End trocam de aba (só a ativa entra no Tab). Abas no tamanho do texto, com rolagem horizontal.");
    kit.section(panel, "Variants");
    var opts = []; for (var i = 1; i <= 6; i++) opts.push([String(i), String(i)]);
    var seg = kit.seg(panel, { label: "Active Item", value: "1", options: opts, onChange: function(v){ p.setAttribute("active-item", v); } });
    kit.section(panel, "Nested instances");
    kit.toggle(panel, { label: "Show Lead Item (.Item)", checked: false, onChange: function(on){ p.querySelectorAll("cds-tab-item").forEach(function(t){ kit.attr(t, "show-lead-item", on ? "true" : null); }); } });
  }
});
