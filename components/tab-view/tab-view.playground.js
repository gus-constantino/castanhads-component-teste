/* Playground — Tab View */
CDS.register({
  id: "tab-view", name: "Tab View", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15713-2488",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-tab-view", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout("Active Option: " + e.detail.option, false); });
    kit.hint(panel, "Troca a visualização (lista × grade). Setas alternam; é um radiogroup.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Active Option", value: "first", options: [["first","First"],["second","Second"]], onChange: function(v){ p.setAttribute("active-option", v); } });
    kit.toggle(panel, { label: "State: Disabled", checked: false, onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "First Icon", value: "view-list-line", onChange: function(v){ p.setAttribute("first-icon", v); } });
    kit.iconSwap(panel, { label: "Second Icon", value: "view-module-line", onChange: function(v){ p.setAttribute("second-icon", v); } });
  }
});
