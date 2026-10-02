/* Playground — .Week (building block) */
CDS.register({
  id: "calendar-week", name: ".Week", category: "Datepicker", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17465-280",
  mount: function(ctx){ ctx.preview.appendChild(ctx.kit.el("cds-calendar-week", {})); ctx.kit.hint(ctx.panel, "7 .Day lado a lado. No Date Picker cada semana é uma linha da grade."); }
});
