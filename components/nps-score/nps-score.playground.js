/* Playground — NPS Score */
CDS.register({
  id: "nps-score", name: "NPS Score", category: "Rating Score", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10100-848",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-nps-score", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout("Nota " + e.detail.value, true); });
    kit.hint(panel, "Grupo de rádio nativo: Tab entra, setas trocam a nota.");
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", checked: false, onChange: function(on){ kit.attr(p, "disabled", on); } });
    var opts = [["none","None"]]; for (var i = 0; i <= 10; i++) opts.push([String(i), String(i)]);
    kit.select(panel, { label: "Selected Value", value: "none", options: opts, onChange: function(v){ kit.attr(p, "value", v === "none" ? null : v); } });
  }
});
