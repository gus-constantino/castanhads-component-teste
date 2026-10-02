/* Playground — .Navigation Control (Datepicker, building block) */
CDS.register({
  id: "date-navigation", name: ".Navigation Control (Datepicker)", category: "Datepicker", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17465-384",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-date-navigation", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Não é o Nav Control do carrossel (Navigation). Os botões emitem cds-prev, cds-next, cds-month e cds-year.");
    kit.section(panel, "Booleans");
    [["show-left-control","Show Left Control"],["show-first-month","Show First Month"],["show-year","Show Year"],["show-trailing-month","Show Trailing Month"],["show-right-control","Show Right Control"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
  }
});
