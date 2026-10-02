/* Playground — Backdrop */
CDS.register({
  id: "backdrop", name: "Backdrop", category: "Overlays", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13784-3271",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var box = kit.el("div", { style: "position:relative;width:300px;height:300px;max-width:100%;display:grid;place-items:center;border-radius:var(--common-border-radius-medium);overflow:hidden;background:var(--common-colors-decorative-01);font:var(--text-style-body-bold);color:var(--common-colors-text-intense)" }, ["Conteúdo da tela"]);
    var p = kit.el("cds-backdrop", {}); box.appendChild(p); ctx.preview.appendChild(box);
    kit.hint(panel, "Surface/inversed com Opacity/medium (0.4). Modal, Drawer e Bottom Sheet usam o mesmo visual no <code>::backdrop</code> do dialog; o Banner Image usa o elemento.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Mostrar", checked: true, onChange: function(on){ p.hidden = !on; } });
  }
});
