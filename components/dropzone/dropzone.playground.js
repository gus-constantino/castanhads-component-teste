/* Playground — Dropzone */
CDS.register({
  id: "dropzone", name: "Dropzone", category: "File Upload", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15386-7230",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-dropzone", { multiple: "", accept: "image/jpeg,image/png" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-files", function(e){ ctx.readout(e.detail.files.map(function(f){ return f.name; }).join(", "), true); });
    kit.hint(panel, "Arraste arquivos para a área ou use o botão. No 360 e no 744 vira a versão Mobile (a área inteira é o botão), como no Figma.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["dragover","Dragover"],["disabled","Disabled"]], hint: "Hovered e Pressed só existem na versão Mobile no Figma.", onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" || v === "dragover" ? v : null); kit.attr(p, "disabled", v === "disabled"); p.paint(); } });
    kit.section(panel, "Booleans");
    [["show-text-description","Show Text description"],["show-main-button","Show Main button"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Title", value: "Adicionar arquivos", onInput: function(v){ p.setAttribute("text-title", v); } });
    kit.text(panel, { label: "Text Description", value: "Arquivos permitidos: JPG e PNG", onInput: function(v){ p.setAttribute("text-description", v); } });
  }
});
