/**
 * @deps upload-item
 * <cds-upload-list> — Upload List · File Upload · componente 15465:1365
 * Coluna de Upload Items (gap 8). Slot "Upload itens": os filhos de quem usa; sem filhos, a amostra do Figma
 * (Uploading · Success · Error · Uploaded). Atributo: label (nome da lista · "Arquivos")
 */
(function(){
  "use strict";
  class CdsUploadList extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    render(){
      if (!this._built){
        this._built = true; this.setAttribute("role", "list"); // antes dos itens: eles leem o role do pai
        if (!this.querySelector("cds-upload-item")) ["uploading","success","error","uploaded"].forEach(function(s){ this.appendChild(CDS.create("cds-upload-item", { status: s })); }, this);
      }
      this.setAttribute("role", "list"); CDS.attr(this, "aria-label", this.getAttribute("label") || "Arquivos");
      [].forEach.call(this.querySelectorAll(":scope > cds-upload-item"), function(i){ i.setAttribute("role", "listitem"); });
    }
  }
  CdsUploadList.define("cds-upload-list");
})();
