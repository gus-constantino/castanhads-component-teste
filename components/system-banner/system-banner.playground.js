/* Playground — System Banner */
CDS.register({
  id: "system-banner", name: "System Banner", category: "Feedback", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=18432-2090",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p, rich = false;
    var attrs = { label: "Label" };
    function make(){
      p = kit.el("cds-system-banner", attrs);
      if (rich) p.innerHTML = 'A message about the system here! You can turn words <b>bold</b> also add a <a href="#">link</a>.';
      p.addEventListener("cds-close", function(){ ctx.readout("fechado — clique em Mostrar de novo", false); });
      ctx.preview.innerHTML = ""; ctx.preview.appendChild(p);
    }
    function set(k, v){ if (v == null) delete attrs[k]; else attrs[k] = v; kit.attr(p, k, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "positive", options: [["positive","Positive"],["warning","Warning"],["informative","Informative"]], hint: "Warning usa role=alert; os outros, role=status.", onChange: function(v){ set("appearance", v === "positive" ? null : v); } });
    var again = kit.el("button", { type: "button", "class": "pg-text", text: "Mostrar de novo" }); again.addEventListener("click", function(){ make(); ctx.readout("", false); }); panel.appendChild(again);
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Label", checked: true, onChange: function(on){ set("show-label", on ? null : "false"); } });
    kit.toggle(panel, { label: "Show Close Button", checked: true, onChange: function(on){ set("show-close-button", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "Text Content", value: "A message about the system here! You can turn words bold also add a link.", onInput: function(v){ rich = false; set("text", v); } });
    kit.toggle(panel, { label: "Conteúdo rico (negrito e link como filhos)", onChange: function(on){ rich = on; make(); } });
    kit.section(panel, "Nested instances");
    var refs = [
      kit.nested(panel, { title: "Shaped Icon", exposed: false, note: "Small (40). Ícone e cor seguem o Appearance.", props: function(){ var s = p && p.iconEl; return s ? [["Appearance", s.getAttribute("appearance")], ["Icon", s.getAttribute("icon")], ["Size", "Small"]] : []; } }),
      kit.nested(panel, { title: ".Close Alert", exposed: true, note: "Building block. Clique fecha (cds-close, cancelável).", props: function(){ var c = p && p.closeEl; return c ? [["Show", String(!c.hidden)]] : []; } })
    ];
    make(); kit.watch(ctx.preview, function(){ refs.forEach(function(f){ f(); }); });
  }
});
