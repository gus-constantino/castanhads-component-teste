/* Playground — .Currency Symbol */
CDS.register({
  id: "currency-symbol", name: ".Currency Symbol", category: "Building Blocks", block: true,
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13438-7016",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-currency-symbol", { currency: "brazil-real" });
    ctx.preview.appendChild(p);
    var S = customElements.get("cds-currency-symbol").SYMBOLS;
    kit.section(panel, "Variants");
    kit.select(panel, { label: "Currency", value: "brazil-real",
      options: Object.keys(S).map(function(k){ return [k, k.replace(/-/g, " ").replace(/\b\w/g, function(c){ return c.toUpperCase(); }) + " — " + S[k]]; }),
      onChange: function(v){ p.setAttribute("currency", v); } });
  }
});
