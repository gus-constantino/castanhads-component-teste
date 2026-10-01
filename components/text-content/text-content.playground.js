/* Playground — .Text Content */
CDS.register({
  id: "text-content", name: ".Text Content", category: "Content", block: true,
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5516-10455",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-text-content", { kind: "highlight-label", label: "Label", description: "Description" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "highlight-label", options: [["highlight-label","Highlight Label"],["highlight-description","Highlight Description"]], onChange: function(v){ set("kind", v); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Description", checked: true, onChange: function(on){ set("show-description", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label Content", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "Text Description", value: "Description", onInput: function(v){ p.setAttribute("description", v); } });
  }
});
