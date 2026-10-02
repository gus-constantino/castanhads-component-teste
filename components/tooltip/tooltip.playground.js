/* Playground — Tooltip */
CDS.register({
  id: "tooltip", name: "Tooltip", category: "Tooltips", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11211-416",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var wrap = kit.el("div", { style: "display:flex;flex-direction:column;align-items:center;gap:var(--common-sizes-32)" });
    var p = kit.el("cds-tooltip", {}); wrap.appendChild(p);
    var trig = kit.el("cds-icon-button", { id: "pg-tooltip-trigger", kind: "ghost", appearance: "neutral", icon: "support-line", label: "Ajuda" });
    var t2 = kit.el("cds-tooltip", { for: "pg-tooltip-trigger", label: "Ajuda", text: "Passe o mouse ou foque o botão; Esc fecha." });
    wrap.appendChild(trig); wrap.appendChild(t2); ctx.preview.appendChild(wrap);
    function both(k, v){ [p, t2].forEach(function(x){ kit.attr(x, k, v); }); }
    kit.hint(panel, "Em cima, o specimen fixo. Embaixo, o comportamento: o tooltip aparece no hover e no foco do gatilho (atributo <code>for</code>).");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Label", checked: true, onChange: function(on){ both("show-label", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "Text Content", value: "Find out how this Caju product can benefit your business today.", onInput: function(v){ p.setAttribute("text", v); } });
  }
});
