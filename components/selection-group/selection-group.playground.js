/* Playground — Checkbox Group · Radio Button Group · Switch Group */
(function(){
  var FIG = "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=";
  [["checkbox-group","Checkbox Group","cds-checkbox-group","cds-checkbox","4132-1511"],
   ["radio-button-group","Radio Button Group","cds-radio-button-group","cds-radio-button","4429-11192"],
   ["switch-group","Switch Group","cds-switch-group","cds-switch","4895-1233"]].forEach(function(g){
    CDS.register({
      id: g[0], name: g[1], category: "Selection Controls", figma: FIG + g[4],
      mount: function(ctx){
        var kit = ctx.kit, panel = ctx.panel;
        var group = kit.el(g[2], { label: "Opções" });
        ctx.preview.appendChild(group);
        function fill(n){
          group.innerHTML = "";
          for (var i = 1; i <= n; i++) group.appendChild(kit.el(g[3], { label: "Opção " + i, status: "unselected" }));
          group.render && group.render();
          readout();
        }
        function readout(){ var sel = group.querySelectorAll('[status="selected"]'); ctx.readout(Array.prototype.map.call(sel, function(x){ return x.getAttribute("label"); }).join(", "), false); }
        group.addEventListener("cds-change", readout);
        kit.section(panel, "Conteúdo (Slot)");
        kit.range(panel, { label: "Itens", min: 1, max: 6, value: 6, onInput: fill });
        kit.text(panel, { label: "label (nome acessível do grupo)", value: "Opções", onInput: function(v){ kit.attr(group, "label", v); } });
        kit.hint(panel, "Coluna com gap 8. O Figma mostra 6 itens; a quantidade real é definida pelo uso.");
        kit.section(panel, "Nested instances");
        var refresh = kit.nested(panel, { title: g[3].replace("cds-", ""), exposed: true, note: "Cada item é uma instância independente; selecione para ver o Status.",
          items: function(){ return Array.prototype.map.call(group.children, function(_, i){ return String(i + 1); }); },
          props: function(i){ var c = group.children[i]; return c ? [["Text Label", c.getAttribute("label")], ["Status", c.getAttribute("status")], ["State", c.hasAttribute("disabled") ? "Disabled" : "Enabled"]] : []; } });
        kit.watch(group, refresh);
        fill(6);
      }
    });
  });
})();
