/* Playground — Divider */
CDS.register({
  id: "divider", name: "Divider", category: "Dividers",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4931-207",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    // Moldura de demonstração: o divider estica no eixo da Orientation
    var stage = kit.el("div", { style: "display:flex; align-items:center; justify-content:center; width:312px; max-width:100%; height:80px;" });
    var p = kit.el("cds-divider", { kind: "solid", intensity: "soft", orientation: "horizontal" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "solid", options: [["solid","Solid"],["dashed","Dashed"]], onChange: function(v){ set("kind", v); } });
    kit.seg(panel, { label: "Intensity", value: "soft", options: [["soft","Soft"],["medium","Medium"],["intense","Intense"]],
      hint: "Soft e Medium ficam abaixo de 3:1 por design (decorativo, isento do 1.4.11). Se o divider for o único sinal de separação, use Intense.",
      onChange: function(v){ set("intensity", v); } });
    kit.seg(panel, { label: "Orientation", value: "horizontal", options: [["horizontal","Horizontal"],["vertical","Vertical"]], onChange: function(v){ set("orientation", v); } });

    kit.section(panel, "Acessibilidade");
    kit.toggle(panel, { label: "Separador semântico (role=separator)", onChange: function(on){ set("separator", on); } });
  }
});
