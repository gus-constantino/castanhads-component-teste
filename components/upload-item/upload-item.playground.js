/* Playground — Upload Item */
CDS.register({
  id: "upload-item", name: "Upload Item", category: "File Upload", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15029-1115",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-upload-item", {}); ctx.preview.appendChild(p);
    ["cds-remove","cds-download","cds-retry","cds-view"].forEach(function(n){ p.addEventListener(n, function(){ ctx.readout(n, false); }); });
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Status", value: "uploading", options: [["uploading","Uploading"],["success","Success"],["error","Error"],["uploaded","Uploaded"]], onChange: function(v){ kit.attr(p, "status", v === "uploading" ? null : v); } });
    kit.range(panel, { label: "Progresso (Uploading)", min: 0, max: 100, value: 60, onInput: function(v){ p.setAttribute("percent", v); } });
    kit.section(panel, "Booleans");
    [["show-primary-action","Show primary action"],["show-secondary-action","Show secondary action"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["text-title","Text Title","File name"],["file-extension","File Extension",".jpg"],["success-message","Success message","Enviado com sucesso"],["description","Description","Enviado em 10/05/2025"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
  }
});
