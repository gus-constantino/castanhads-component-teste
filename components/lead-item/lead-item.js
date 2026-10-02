/**
 * @deps shaped-icon image
 * <cds-lead-item> — .Lead item (Topic) · building block · set 15621:66
 * Kind=Shaped Icon: Shaped Icon Accent · Small (40). Kind=Image: Image 1:1, 40×40.
 * Atributos: kind (shaped-icon|image, padrão shaped-icon) · icon · src · alt
 */
(function(){
  "use strict";
  class CdsLeadItem extends CDS.Element {
    static get observedAttributes(){ return ["kind", "icon", "src", "alt"]; }
    render(){
      this.innerHTML = "";
      if (this.getAttribute("kind") === "image"){
        this.itemEl = this.appendChild(CDS.create("cds-image", { "aspect-ratio": "1:1", src: this.getAttribute("src") || "", alt: this.getAttribute("alt") || "" }));
      } else {
        this.itemEl = this.appendChild(CDS.create("cds-shaped-icon", { appearance: "accent", size: "small", icon: this.getAttribute("icon") || "placeholder-line" }));
      }
    }
  }
  CdsLeadItem.define("cds-lead-item");
})();
