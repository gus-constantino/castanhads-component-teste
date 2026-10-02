/* Playground — Icon Button */
CDS.register({
  id: "icon-button", name: "Icon Button", category: "Buttons",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4464-636",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16); border-radius:var(--common-border-radius-medium);" });
    var p = kit.el("cds-icon-button", { icon: "placeholder-line", kind: "default", appearance: "accent", size: "medium", label: "Ação" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    p.addEventListener("click", function(){ ctx.readout("click", false); setTimeout(function(){ ctx.readout("", false); }, 800); });

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["ghost","Ghost"]], onChange: function(v){ set("kind", v); } });
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["neutral","Neutral"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v); stage.style.background = v === "inversed" ? "var(--common-colors-surface-inversed)" : ""; } });
    kit.seg(panel, { label: "Size", value: "medium", options: [["medium","Medium 48"],["small","Small 40"]], onChange: function(v){ set("size", v); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.hint(panel, "Hovered e Pressed são estados de interação.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Notification", onChange: function(on){ set("show-notification", on); } });
    kit.text(panel, { label: "Badge (notification)", value: "0", onInput: function(v){ set("notification", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon", value: "placeholder-line", onChange: function(v){ set("icon", v); } });
    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "label (aria-label, obrigatório)", value: "Ação", onInput: function(v){ set("label", v); } });

    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, { title: "Icon", exposed: false, note: "Size Medium (20px); a cor acompanha o Kind e a Appearance do botão.",
      props: function(){ return [["Choose Icon", p.getAttribute("icon")], ["Size", "medium (20)"]]; } });
    var refreshB = kit.nested(panel, { title: "Badge", exposed: false, note: "Appearance Warning, no canto superior direito.",
      props: function(){ var b = p.querySelector("cds-badge"); return b ? [["Appearance", "warning"], ["Label", b.getAttribute("label")]] : [["Show Notification", "false"]]; } });
    kit.watch(p, function(){ refresh(); refreshB(); });
  }
});
