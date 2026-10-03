/* Playground — .Lead item (File, building block) */
CDS.register({
  id: "file-lead-item", name: ".Lead item (File)", category: "File Upload", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15207-13262",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-file-lead-item", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Terceiro “.Lead item” da lib (C25). O ícone do hover é hide-line, como no Figma (C63).");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "view-file", options: [["view-file","View file"],["static","Static"]], onChange: function(v){ kit.attr(p, "kind", v === "view-file" ? null : v); } });
    kit.seg(panel, { label: "Appearance", value: "file", options: [["image","Image"],["file","File"]], onChange: function(v){ kit.attr(p, "appearance", v === "file" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"]], onChange: function(v){ kit.attr(p, "state", v === "enabled" ? null : v); } });
  }
});
