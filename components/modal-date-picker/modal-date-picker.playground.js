/* Playground — Modal Date Picker */
CDS.register({
  id: "modal-date-picker", name: "Modal Date Picker", category: "Datepicker", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17560-51555",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, attrs = { month: "2026-01" };
    var spec = kit.el("cds-modal-date-picker", Object.assign({ inline: "", open: "" }, attrs)), live = kit.el("cds-modal-date-picker", attrs);
    ctx.preview.appendChild(spec); ctx.preview.appendChild(live);
    live.addEventListener("cds-change", function(e){ ctx.readout(e.detail.value || (e.detail.start + " → " + e.detail.end), true); });
    kit.button(panel, { label: "Abrir de verdade", onClick: function(){ live.show(); } });
    kit.hint(panel, "Só desktop: no 360 e no 744 o Viewport Restriction cobre o modal. A data só vale no Confirmar.");
    function set(k, v){ [spec, live].forEach(function(n){ kit.attr(n, k, v); }); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "single", options: [["single","Single Calendar"],["double","Double Calendar"]], onChange: function(v){ set("kind", v === "single" ? null : v); } });
    kit.seg(panel, { label: "Role", value: "none", options: [["none","None Selected"],["single","Single Date"],["range","Range Date"]], onChange: function(v){
      set("role-kind", v === "none" ? null : v); set("value", v === "single" ? "2026-01-13" : null); set("start", v === "range" ? "2026-01-13" : null); set("end", v === "range" ? "2026-01-24" : null);
      spec.removeAttribute("open"); spec.setAttribute("open", ""); } });
  }
});
