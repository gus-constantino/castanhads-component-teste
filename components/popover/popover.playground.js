/* Playground — Popover (aberto por um Drop Button, D41) */
CDS.register({
  id: "popover", name: "Popover", category: "Overlays", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2270-102",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:flex;flex-direction:column;align-items:flex-start;gap:var(--common-sizes-16)" });
    var trig = kit.el("cds-drop-button", { id: "pg-pop-trigger", label: "Opções", appearance: "neutral" });
    function content(){ return [
      kit.el("strong", { text: "Popover", style: "font:var(--text-style-body-bold);padding:var(--common-sizes-8)" }),
      kit.el("span", { text: "Conteúdo contextual ancorado no gatilho. Esc ou clique fora fecham.", style: "font:var(--text-style-caption-regular);color:var(--common-colors-text-medium);padding:0 var(--common-sizes-8) var(--common-sizes-8)" })
    ]; }
    var spec = kit.el("cds-popover", { inline: true, label: "Specimen do Popover", style: "width:220px" }, content());
    var pop = kit.el("cds-popover", { "for": "pg-pop-trigger", label: "Opções", style: "width:220px" }, content());
    stage.appendChild(spec); stage.appendChild(trig); stage.appendChild(pop); ctx.preview.appendChild(stage);
    pop.addEventListener("cds-toggle", function(e){ ctx.readout(e.detail.open ? "aberto" : "fechado", false); });
    kit.hint(panel, "Em cima, o specimen (como no Figma). Embaixo, o Popover de verdade: clique no Drop Button; o chevron (Is Active) acompanha.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Placement", value: "bottom-start", options: [["bottom-start","Bottom start"],["bottom","Bottom"],["bottom-end","Bottom end"],["top","Top"]], hint: "Adaptação para web: sem espaço, inverte para cima ou para baixo.", onChange: function(v){ kit.attr(pop, "placement", v === "bottom-start" ? null : v); } });
  }
});
