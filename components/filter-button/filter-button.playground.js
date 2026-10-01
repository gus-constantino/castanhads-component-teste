/* Playground — Filter button */
CDS.register({
  id: "filter-button", name: "Filter button", category: "Buttons",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5099-5389",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-filter-button", {});
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.toggle(panel, { label: "Is Active (filtros aplicados)", onChange: function(on){ set("active", on); } });
    kit.seg(panel, { label: "Viewport (Specific/Buttons/Filter button)", value: "auto", options: [["auto","Herdar"],["desktop","Desktop"],["mobile","Mobile"]],
      hint: "<b>Herdar</b> segue o seletor do topo: 744 e 360 mostram só o ícone.", onChange: function(v){ set("viewport", v === "auto" ? null : v); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label", value: "Filtros", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "Contagem (Badge)", value: "1", onInput: function(v){ set("count", v); } });

    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, { title: ".Icons / Badge", exposed: false, note: "Inativo: .Icons (filter-line). Ativo: Badge Neutral com a contagem.",
      props: function(){ return p.badgeEl ? [["Badge", "neutral · " + p.badgeEl.getAttribute("label")]] : [[".Icons", "kind=default (filter-line)"]]; } });
    kit.watch(p, refresh);
  }
});
