/**
 * @deps avatar icon image
 * <cds-list-lead-item> — .Lead Item (Lists) · .Building Blocks · set 5488:640
 * Não confundir com o .Lead item do Topic (<cds-lead-item>, C25: dois nomes quase iguais).
 * Kind=Avatar (padrão) 40 · Kind=Icon 20 (Neutral, Medium) · Kind=Image 40 com raio extra-small.
 * Atributos: kind (avatar|icon|image) · icon (placeholder-line) · label (iniciais do Avatar · "AA") · src · alt
 */
(function(){
  "use strict";
  class CdsListLeadItem extends CDS.Element {
    static get observedAttributes(){ return ["kind", "icon", "label", "src", "alt"]; }
    get kind(){ var k = this.getAttribute("kind"); return k === "icon" || k === "image" ? k : "avatar"; }
    render(){
      var k = this.kind;
      if (this._kind !== k){
        this._kind = k; this.innerHTML = "";
        this.inner = this.appendChild(k === "icon" ? CDS.create("cds-icon", { size: "medium", appearance: "neutral", "aria-hidden": "true" })
          : k === "image" ? CDS.create("cds-image", { "aspect-ratio": "1:1" }) : CDS.create("cds-avatar", { size: "small" }));
      }
      var n = this.inner;
      if (k === "icon") n.setAttribute("icon", this.getAttribute("icon") || "placeholder-line");
      else if (k === "image"){ if (this.getAttribute("src")) n.setAttribute("src", this.getAttribute("src")); n.setAttribute("alt", this.getAttribute("alt") || ""); }
      else n.setAttribute("label", this.text("label", "AA"));
    }
  }
  CdsListLeadItem.define("cds-list-lead-item");
})();
