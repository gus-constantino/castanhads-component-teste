/* Playground — .Content Banner (building block) */
CDS.register({
  id: "content-banner", name: ".Content Banner", category: "Banner", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20028-15153",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var wrap = kit.el("div", { style: "padding:24px;border-radius:var(--common-border-radius-large);background:var(--common-colors-decorative-01)" });
    var p = kit.el("cds-content-banner", {}); wrap.appendChild(p); ctx.preview.appendChild(wrap);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["inversed","Inversed"]], onChange: function(v){
      kit.attr(p, "appearance", v === "neutral" ? null : v);
      wrap.style.background = v === "inversed" ? "var(--common-colors-surface-inversed)" : "var(--common-colors-decorative-01)";
    } });
    kit.section(panel, "Booleans");
    [["show-text-title","Show Text Title"],["show-cta","Show CTA"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["title","Text Title","Label"],["description","Text Description","Description"],["cta","CTA Text Label","Label"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
  }
});
