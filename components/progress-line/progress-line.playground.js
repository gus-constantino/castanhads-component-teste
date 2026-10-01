/* Playground — Progress Line */
CDS.register({
  id: "progress-line", name: "Progress Line", category: "Progress Indicators",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2322-4006",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var wrap = kit.el("div", { style: "width:312px; max-width:100%;" });
    var p = kit.el("cds-progress-line", { percent: "40", label: "Carregando dados" });
    wrap.appendChild(p); ctx.preview.appendChild(wrap);
    function readout(){ ctx.readout(p.percent + "%", p.percent === 100); }

    kit.section(panel, "Variants");
    kit.range(panel, { label: "Percent", min: 0, max: 100, value: 40, onInput: function(n){ p.setAttribute("percent", String(n)); readout(); } });
    kit.hint(panel, "O Figma tem passos de 10 (0–100); o componente aceita qualquer valor.");
    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "label (role=progressbar)", value: "Carregando dados", onInput: function(v){ kit.attr(p, "label", v); } });
    readout();
  }
});
