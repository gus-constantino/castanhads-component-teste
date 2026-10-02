/* Playground — Pagination */
CDS.register({
  id: "pagination", name: "Pagination", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13408-1416",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-pagination", { style: "max-width:none;flex:none" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-page-change", function(e){ ctx.readout("página " + e.detail.page, false); });
    p.addEventListener("cds-per-page-change", function(e){ ctx.readout(e.detail.perPage + " por página", false); });
    kit.hint(panel, "780px no Figma; o preview rola na horizontal. Use 1366 no viewport para ver inteiro.");
    kit.section(panel, "Booleans");
    [["show-items-per-page","Show Itens per page"],["show-item-display","Show Item display"],["show-rows-per-page","Show Rows per page"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Items range", value: "", placeholder: "calculado (1-10)", onInput: function(v){ kit.attr(p, "items-range", v || null); } });
    kit.text(panel, { label: "Items display (total)", value: "250", onInput: function(v){ p.setAttribute("total", v); } });
    kit.text(panel, { label: "Page number (páginas)", value: "100", onInput: function(v){ p.setAttribute("pages", v); } });
  }
});
