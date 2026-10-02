/* Playground — Banner */
CDS.register({
  id: "banner", name: "Banner", category: "Banner", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20051-15726",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-banner", { src: "assets/brand/sample-photo.svg" }); ctx.preview.appendChild(p);
    p.addEventListener("click", function(){ ctx.readout("ação do banner", true); });
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "illustration", options: [["illustration","Illustration"],["image","Image"]], onChange: function(v){ kit.attr(p, "kind", v === "illustration" ? null : v); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "O banner inteiro é clicável; o CTA é só indicação visual. Hovered e Pressed são interação.");
    kit.section(panel, "Fundo (Kind=Illustration)");
    kit.select(panel, { label: "Token de cor", value: "decorative-01", options: [["decorative-01","Decorative/01"],["decorative-02","Decorative/02"],["decorative-03","Decorative/03"],["decorative-04","Decorative/04"],["surface-01","Surface/01"],["surface-inversed","Surface/inversed"]],
      hint: "A cor é livre (description do Figma); escolha o Appearance do conteúdo pelo contraste.", onChange: function(v){ kit.attr(p, "bg", v === "decorative-01" ? null : v); } });
    kit.seg(panel, { label: ".Content Banner · Appearance", value: "auto", options: [["auto","Automático"],["neutral","Neutral"],["inversed","Inversed"]], onChange: function(v){ kit.attr(p, "content", v === "auto" ? null : v); } });
    kit.section(panel, "Booleans");
    [["show-text-title","Show Text Title"],["show-cta","Show CTA"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["title","Text Title","Label"],["description","Text Description","Description"],["cta","CTA Text Label","Label"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
    kit.section(panel, "Instance swap");
    kit.illustrationSwap(panel, { label: "Illustration", value: "notificacoes/sino", onChange: function(v){ p.setAttribute("illustration", v); } });
  }
});
