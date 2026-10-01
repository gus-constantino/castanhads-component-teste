/* Playground — Link */
CDS.register({
  id: "link", name: "Link", category: "Content",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4926-213",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:8px 16px; border-radius:16px;" });
    var p = kit.el("cds-link", { label: "Link content", href: "#/link", appearance: "neutral" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["accent","Accent"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v); stage.style.background = v === "inversed" ? "var(--common-colors-surface-inversed)" : ""; } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.hint(panel, "Hovered (sublinhado) e Pressed (Label/Bold + sublinhado) são estados de interação.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Trailing Item", checked: true, onChange: function(on){ set("show-trailing-item", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Link Content", value: "Link content", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Nested instances");
    kit.iconSwap(panel, { label: "Change Icon", value: "navigation-right-line", onChange: function(v){ set("icon", v); } });
    var refresh = kit.nested(panel, { title: "Icon (trailing)", exposed: false, note: "Size Small; a cor acompanha o texto do Link.",
      props: function(){ var i = p.iconEl; return i ? [["Choose Icon", i.getAttribute("icon")], ["Size", "small"]] : [["Show Trailing Item", "false"]]; } });
    kit.watch(p, refresh);
  }
});
