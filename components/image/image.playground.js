/* Playground — Image */
CDS.register({
  id: "image", name: "Image", category: "Images",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2273-320",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var SAMPLE = "assets/brand/sample-photo.svg";
    var p = kit.el("cds-image", { src: SAMPLE, alt: "Exemplo", "aspect-ratio": "none", style: "width:200px" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Aspect Ratio", value: "none", options: [["none","None"],["1:1","1:1"],["3:2","3:2"]], onChange: function(v){ set("aspect-ratio", v); } });
    kit.section(panel, "Conteúdo");
    kit.text(panel, { label: "src", value: SAMPLE, hint: "Vazio mostra o placeholder (Surface/01).", onInput: function(v){ set("src", v); } });
    kit.text(panel, { label: "alt", value: "Exemplo", hint: "Vazio = decorativa.", onInput: function(v){ p.setAttribute("alt", v); } });
  }
});
