/* Playground — Upload List */
CDS.register({
  id: "upload-list", name: "Upload List", category: "File Upload", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15465-1365",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-upload-list", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-remove", function(e){ e.target.remove(); ctx.readout("removido", false); });
    kit.hint(panel, "Amostra do Figma: um item de cada Status. O × remove o item (o evento é cds-remove).");
  }
});
