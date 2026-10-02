/* Playground — .Select Number (building block) */
CDS.register({
  id: "select-number", name: ".Select Number", category: "Navigation", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13408-1596",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-select-number", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.value, false); });
    kit.hint(panel, "Clique ou seta para baixo abre; o foco vai para a opção atual.");
    kit.toggle(panel, { label: "State: Disabled", checked: false, onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.text(panel, { label: "Opções", value: "10,20,30,40,50", onInput: function(v){ p.setAttribute("options", v); } });
  }
});
