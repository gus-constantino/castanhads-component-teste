/* Playground — Drop Button */
CDS.register({
  id: "drop-button", name: "Drop Button", category: "Buttons",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6955-6985",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16); border-radius:var(--common-border-radius-medium); max-width:100%;" });
    var p = kit.el("cds-drop-button", { label: "Label", kind: "default", appearance: "accent", size: "medium" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    var activeSw;
    p.addEventListener("cds-toggle", function(e){ activeSw.checked = e.detail.active; ctx.readout(e.detail.active ? "aberto" : "fechado", false); });

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["ghost","Ghost"]], onChange: function(v){ set("kind", v); } });
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["neutral","Neutral"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v); stage.style.background = v === "inversed" ? "var(--common-colors-surface-inversed)" : ""; } });
    kit.seg(panel, { label: "Size", value: "medium", options: [["medium","Medium 48"],["small","Small 40"]], onChange: function(v){ set("size", v); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    activeSw = kit.toggle(panel, { label: "Is Active (aberto)", onChange: function(on){ set("active", on); } });
    kit.hint(panel, "Clicar no botão também alterna Is Active (aria-expanded).");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Lead Icon", checked: true, onChange: function(on){ set("show-lead-icon", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Icon", value: "placeholder-line", onChange: function(v){ set("lead-icon", v); } });

    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, { title: "Trailing Item", exposed: false, note: "Chevron fixo; troca com Is Active.",
      props: function(){ return [["Icon", p.trailEl ? p.trailEl.getAttribute("icon") : "—"], ["Is Active", String(p.hasAttribute("active"))]]; } });
    kit.watch(p, refresh);
  }
});
