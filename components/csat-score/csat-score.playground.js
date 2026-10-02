/* Playground — CSAT Score */
CDS.register({
  id: "csat-score", name: "CSAT Score", category: "Rating Score", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10100-1192",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-csat-score", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.value + " de 5", true); });
    kit.hint(panel, "A nota n preenche os n primeiros ícones. O fundo do Figma usa uma variável de fora da Common (C68).");
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", checked: false, onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.select(panel, { label: "Selected Value", value: "none", options: [["none","None"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"]], onChange: function(v){ kit.attr(p, "value", v === "none" ? null : v); } });
  }
});
