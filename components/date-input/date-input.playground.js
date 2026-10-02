/* Playground — Date Input */
CDS.register({
  id: "date-input", name: "Date Input", category: "Datepicker", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17962-70687",
  mount: function(ctx){
    var kit = ctx.kit;
    var p = kit.textField(ctx, {
      tag: "cds-date-input",
      attrs: { label: "Label", supporting: "Supporting Message", error: "Error Message" },
      variants: function(panel, p, set){
        kit.seg(panel, { label: "Kind", value: "single", options: [["single","Single Calendar"],["double","Double Calendar"]], hint: "Kind define o calendário do Popover (um ou dois meses).", onChange: function(v){ set("kind", v === "single" ? null : v); } });
      },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"]],
      texts: [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],["character-counter","Character Counter Value","-0000","","No Figma o padrão é “-0000” (C57)."],["value","Value (prefill)",""]],
      nested: function(p){ return [
        { title: ".Text Content Mask", exposed: true, note: "Mask=Date · placeholder dd/mm/aaaa.", props: function(){ return [["Date (ISO)", p.date || "—"]]; } },
        { title: "Calendar Button", exposed: false, note: "Icon Button Ghost Neutral Small · calendar-line. Abre o Popover com o Date Picker.", props: function(){ return [["Aberto", String(p.isOpen)]]; } }
      ]; }
    });
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.date || e.detail.formatted || "—", !!e.detail.date); });
  }
});
