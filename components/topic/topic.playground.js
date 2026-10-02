/* Playground — Topic */
CDS.register({
  id: "topic", name: "Topic", category: "Content", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15621-1175",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-topic", { "lead-src": "assets/brand/sample-photo.svg" }); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Orientation", value: "horizontal", options: [["horizontal","Horizontal"],["vertical","Vertical"]], onChange: function(v){ kit.attr(p, "orientation", v === "horizontal" ? null : v); } });
    kit.section(panel, "Booleans");
    [["show-lead-item","Show Lead item"],["show-title","Show Title"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Title", value: "Title", onInput: function(v){ p.setAttribute("title", v); } });
    kit.text(panel, { label: "Text Description", value: "Lorem Ipsum is simply dummy of the printing and typesetting industry lorem Ipsum has been.", onInput: function(v){ p.setAttribute("description", v); } });
    kit.section(panel, "Nested instances");
    kit.seg(panel, { label: ".Lead item · Kind", value: "shaped-icon", options: [["shaped-icon","Shaped Icon"],["image","Image"]], onChange: function(v){ kit.attr(p, "lead-kind", v === "shaped-icon" ? null : v); } });
    kit.iconSwap(panel, { label: ".Lead item · Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("lead-icon", v); } });
  }
});
