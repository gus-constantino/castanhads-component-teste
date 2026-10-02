/* Playground — Progress Tracker */
CDS.register({
  id: "progress-tracker", name: "Progress Tracker", category: "Progress Indicators", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=14524-1024",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-progress-tracker", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Amostra do Figma (Completed · Current · Pending). Com <code>current</code>, a lista calcula os status.");
    kit.range(panel, { label: "Etapa atual (current)", min: 1, max: 3, value: 2, onInput: function(v){ p.setAttribute("current", v); } });
  }
});
