/* Playground — Radio Button */
CDS.register({
  id: "radio-button", name: "Radio Button", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4429-10437",
  mount: function(ctx){ ctx.kit.selectionControl(ctx, { tag: "cds-radio-button", statuses: [["unselected","Unselected"],["selected","Selected"]],
    extraHint: "Sozinho, o radio só seleciona; para desmarcar escolha outro do mesmo grupo (veja Radio Button Group)." }); }
});
