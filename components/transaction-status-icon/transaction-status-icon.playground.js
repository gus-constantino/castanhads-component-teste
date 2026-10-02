/* Playground — .Transaction Status Icon (building block) */
CDS.register({
  id: "transaction-status-icon", name: ".Transaction Status Icon", category: "Lists", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-658",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-transaction-status-icon", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Nenhum componente usa este building block no Figma hoje (C55). No código, o Content List Item aceita <code>transaction-status</code>.");
    kit.section(panel, "Variants");
    kit.select(panel, { label: "Status", value: "receipt", options: [["receipt","Receipt"],["completed","Completed"],["withdraw","Withdraw"],["refund","Refund"],["canceled","Canceled"],["status6","Status6"],["under-analysis","Under Analysis"],["pending","Pending"]], onChange: function(v){ p.setAttribute("status", v); } });
  }
});
