/**
 * @deps spinner progress-line file-lead-item shaped-icon icon-button
 * <cds-upload-item> — Upload Item · File Upload · set 15029:1115 (Status Uploading|Success|Error|Uploaded)
 * 320 × 80 · Surface/default · stroke Border/semi-soft · raio large · pad 8 12 (Uploading/Success) / 0 12 · gap 8.
 *   Uploading: Loading (48, Surface/01, Spinner Small) + nome + "Enviando" + Progress Line
 *   Success:   .Lead item (View file · Image) + nome + Success message (Feedback/Positive/semi-intense) + download · delete
 *   Error:     Shaped Icon Warning Medium (warning-line) + nome + "Falha ao enviar" (Feedback/Warning/semi-intense) + refresh · delete
 *   Uploaded:  .Lead item (View file · File) + nome + Description + download · delete
 * Nome: Text Title + File Extension (Body/Regular Text/medium).
 * Atributos: status · text-title ("File name") · file-extension (".jpg") · success-message ("Enviado com sucesso")
 *   description ("Enviado em 10/05/2025") · error-message ("Falha ao enviar") · uploading-message ("Enviando") · percent (60)
 *   show-primary-action (delete) · show-secondary-action (download / refresh) · src (miniatura) · lead-appearance (image|file)
 * Eventos: cds-remove · cds-download · cds-retry · cds-view
 */
(function(){
  "use strict";
  class CdsUploadItem extends CDS.Element {
    static get observedAttributes(){ return ["status","text-title","file-extension","success-message","description","error-message","uploading-message","percent","show-primary-action","show-secondary-action","src","lead-appearance"]; }
    get status(){ var s = this.getAttribute("status"); return s === "success" || s === "error" || s === "uploaded" ? s : "uploading"; }
    render(){
      var self = this, st = this.status;
      if (this._st !== st){
        this._st = st; this.innerHTML = "";
        var fire = function(n){ return function(){ self.dispatchEvent(new CustomEvent(n, { bubbles: true })); }; };
        if (st === "uploading"){
          var ld = this.appendChild(CDS.create("div", null, "cds-ui__loading")); ld.appendChild(CDS.create("cds-spinner", { size: "small", label: "Enviando arquivo" }));
        } else if (st === "error"){
          this.appendChild(CDS.create("cds-shaped-icon", { size: "medium", appearance: "warning", icon: "warning-line" }));
        } else {
          this.lead = this.appendChild(CDS.create("cds-file-lead-item", null, "cds-ui__lead"));
        }
        var c = this.appendChild(CDS.create("div", null, "cds-ui__content"));
        var name = c.appendChild(CDS.create("div", null, "cds-ui__name"));
        this.titleEl = name.appendChild(CDS.create("span", null, "cds-ui__title")); this.extEl = name.appendChild(CDS.create("span", null, "cds-ui__ext"));
        this.msgEl = c.appendChild(CDS.create("span", { "aria-live": "polite" }, "cds-ui__msg"));
        if (st === "uploading") this.progress = c.appendChild(CDS.create("cds-progress-line", null, "cds-ui__progress"));
        else {
          var acts = this.actsEl = this.appendChild(CDS.create("div", null, "cds-ui__actions"));
          this.secBtn = acts.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: st === "error" ? "refresh-line" : "download-line" }));
          this.priBtn = acts.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: "delete-line" }));
          this.secBtn.addEventListener("click", fire(st === "error" ? "cds-retry" : "cds-download"));
          this.priBtn.addEventListener("click", fire("cds-remove"));
        }
      }
      var title = this.text("text-title", "File name"), ext = this.text("file-extension", ".jpg");
      this.titleEl.textContent = title; this.extEl.textContent = ext;
      this.msgEl.textContent = st === "uploading" ? this.text("uploading-message", "Enviando") : st === "success" ? this.text("success-message", "Enviado com sucesso")
        : st === "error" ? this.text("error-message", "Falha ao enviar") : this.text("description", "Enviado em 10/05/2025");
      if (this.progress){ CDS.attr(this.progress, "percent", this.getAttribute("percent") || "60"); CDS.attr(this.progress, "label", "Enviando " + title + ext); }
      if (this.lead){ CDS.attr(this.lead, "appearance", this.getAttribute("lead-appearance") || (st === "success" ? "image" : "file")); CDS.attr(this.lead, "src", this.getAttribute("src")); CDS.attr(this.lead, "label", "Ver " + title + ext); }
      if (this.actsEl){
        this.priBtn.hidden = !this.flag("show-primary-action"); this.secBtn.hidden = !this.flag("show-secondary-action");
        this.actsEl.hidden = this.priBtn.hidden && this.secBtn.hidden; // Actions card some com Show primary action (como no Figma)
        CDS.attr(this.priBtn, "label", "Remover " + title + ext);
        CDS.attr(this.secBtn, "label", (st === "error" ? "Tentar de novo: " : "Baixar ") + title + ext);
      }
      CDS.attr(this, "status", st === "uploading" ? null : st);
      if (!this.parentElement || this.parentElement.getAttribute("role") !== "list") CDS.attr(this, "role", "group"); // na Upload List é listitem
      CDS.attr(this, "aria-label", title + ext);
    }
  }
  CdsUploadItem.define("cds-upload-item");
})();
