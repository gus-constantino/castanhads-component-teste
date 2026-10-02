/**
 * @deps image shaped-icon icon
 * <cds-file-lead-item> — .Lead item (File Upload) · .Building Blocks · set 15207:13262 (Kind × Appearance × State)
 * 48×48 · raio medium. Appearance=Image: miniatura (Image 1:1) · File: Shaped Icon Neutral Medium (attachment).
 * Kind=View file: botão; Hovered/Pressed põem um overlay Surface/inversed (Opacity/intense · semi-opaque) com o ícone
 * hide-line (Inversed, Large), como no Figma (C63). Kind=Static: só a miniatura.
 * Atributos: kind (static|view-file · padrão view-file) · appearance (image|file · padrão image) · src · alt · label ("Ver arquivo")
 * Evento: cds-view (clique no View file)
 */
(function(){
  "use strict";
  class CdsFileLeadItem extends CDS.Element {
    static get observedAttributes(){ return ["kind","appearance","src","alt","label"]; }
    render(){
      var self = this, view = this.getAttribute("kind") !== "static", img = this.getAttribute("appearance") !== "file";
      var key = (view ? "v" : "s") + (img ? "i" : "f");
      if (this._key !== key){
        this._key = key; this.innerHTML = "";
        var host = this.host = this.appendChild(CDS.create(view ? "button" : "span", view ? { type: "button" } : null, "cds-fli"));
        this.media = host.appendChild(img ? CDS.create("cds-image", { "aspect-ratio": "1:1" }, "cds-fli__img") : CDS.create("cds-shaped-icon", { size: "medium", appearance: "neutral", icon: "attachment" }, "cds-fli__file"));
        if (view){
          host.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-fli__overlay"));
          host.appendChild(CDS.create("cds-icon", { icon: "hide-line", size: "large", appearance: "inversed", "aria-hidden": "true" }, "cds-fli__icon"));
          host.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-view", { bubbles: true })); });
        }
      }
      if (img){ CDS.attr(this.media, "src", this.getAttribute("src")); CDS.attr(this.media, "alt", this.getAttribute("alt") || ""); }
      if (view) CDS.attr(this.host, "aria-label", this.getAttribute("label") || "Ver arquivo");
    }
  }
  CdsFileLeadItem.define("cds-file-lead-item");
})();
