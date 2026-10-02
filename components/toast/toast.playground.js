/* Playground — Toast */
CDS.register({
  id: "toast", name: "Toast", category: "Feedback", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5234-516",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p;
    var attrs = { text: "A descrição web ou mobile deve ter no máximo 2 linhas" };
    function make(){ p = kit.el("cds-toast", attrs); p.addEventListener("cds-close", function(){ ctx.readout("fechado — clique em Mostrar de novo", false); }); ctx.preview.innerHTML = ""; ctx.preview.appendChild(p); }
    function set(k, v){ if (v == null) delete attrs[k]; else attrs[k] = v; kit.attr(p, k, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "positive", options: [["positive","Positive"],["warning","Warning"]], hint: "Positive usa role=status; Warning usa role=alert.", onChange: function(v){ set("appearance", v === "positive" ? null : v); } });
    kit.hint(panel, "Use o seletor de Viewport (360) para ver o layout mobile do Figma.");
    kit.button(panel, { label: "Mostrar de novo", onClick: function(){ make(); ctx.readout("", false); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Trailing Item", checked: true, onChange: function(on){ set("show-trailing-item", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Description", value: attrs.text, hint: "Até 2 linhas; o excedente é cortado.", onInput: function(v){ set("text", v); } });
    kit.section(panel, "Nested instances");
    var ref = kit.nested(panel, { title: ".Close Toast", exposed: true, note: "Building block. Clique fecha (cds-close, cancelável).", props: function(){ var c = p && p.closeEl; return c ? [["Show", String(!c.hidden)], ["State", c.hasAttribute("disabled") ? "Disabled" : "Enabled"]] : []; } });
    make(); kit.watch(ctx.preview, ref);
  }
});
