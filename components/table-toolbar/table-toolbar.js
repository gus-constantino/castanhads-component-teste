/**
 * @deps icon-button
 * <cds-table-toolbar> — .Toolbar · .Building Blocks · componente 13438:14337
 * 64 · Surface/default · borda inferior Border/semi-soft · pad 8 16 · gap 4 · Slot (amostra: 3 Icon Buttons Ghost Neutral Small).
 * Os filhos de quem usa são o Slot.
 */
(function(){
  "use strict";
  class CdsTableToolbar extends CDS.Element {
    render(){
      if (this._built) return; this._built = true;
      this.setAttribute("role", "toolbar"); if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", "Ações da tabela");
      if (!this.children.length) for (var i = 1; i <= 3; i++) this.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: "placeholder-line", label: "Ação " + i }));
    }
  }
  CdsTableToolbar.define("cds-table-toolbar");
})();
