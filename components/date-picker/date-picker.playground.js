/* Playground — Date Picker */
CDS.register({
  id: "date-picker", name: "Date Picker", category: "Datepicker", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17629-24427",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-date-picker", { start: "2026-01-13", end: "2026-01-24", month: "2026-01" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.value || (e.detail.start + (e.detail.end ? " → " + e.detail.end : " → …")), false); });
    kit.hint(panel, "Amostra: 13 a 24/01/2026 (no Figma o texto é de 2023, C56). Clique no mês ou no ano para trocar de Role. Setas, Home/End e PageUp/PageDown navegam; Enter seleciona.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "single", options: [["single","Single Calendar"],["double","Double Calendar"]], onChange: function(v){ kit.attr(p, "kind", v === "single" ? null : v); } });
    kit.seg(panel, { label: "Role", value: "days", options: [["days","Days"],["month","Month"],["year","Year"]], onChange: function(v){ kit.attr(p, "view", v === "days" ? null : v); } });
    kit.seg(panel, { label: "Seleção", value: "range", options: [["range","Intervalo"],["single","Data única"]], hint: "No Figma a seleção é texto (First/Last Day Selected); aqui vem do clique.", onChange: function(v){ kit.attr(p, "mode", v === "range" ? null : v); if (v === "single"){ p.setAttribute("value", "2026-01-13"); } } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Selected Dates", checked: true, onChange: function(on){ kit.attr(p, "show-selected-dates", on ? null : "false"); } });
    [["show-first-day-selected","Show First Day Selected"],["show-last-day-selected","Show Last Day Selected"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Selected Date Label", value: "Data Selecionada", onInput: function(v){ p.setAttribute("selected-date-label", v); } });
    kit.text(panel, { label: "Mínimo (AAAA-MM-DD)", value: "", placeholder: "2026-01-05", onInput: function(v){ kit.attr(p, "min", v || null); } });
  }
});
