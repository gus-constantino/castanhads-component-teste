/* Playground — Drawer */
CDS.register({
  id: "drawer", name: "Drawer", category: "Overlays", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16456-4381",
  mount: function(ctx){
    ctx.kit.overlay(ctx, { tag: "cds-drawer", slot: function(){ return [ctx.kit.el("p", { text: "Conteúdo do Slot. Use para texto, listas ou formulários curtos.", style: "margin:0;padding:8px 0;font:var(--text-style-body-regular);color:var(--common-colors-text-medium)" })]; },
      hint: "Só desktop: no viewport 360 ou 744 o painel some e aparece o Viewport Restriction, como no Figma. O botão abre o Drawer pela direita; ele sempre fecha ao clicar no Backdrop ou no Esc.",
      booleans: [["show-action-buttons","Show Action Buttons"]],
      texts: [["text-title","Text Title","Title"],["primary-label","Primary Label","Label"],["secondary-label","Secondary Label","Label"]] });
  }
});
