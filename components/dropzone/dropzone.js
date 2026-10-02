/**
 * @deps shaped-icon main-button
 * <cds-dropzone> — Dropzone · File Upload · set 15386:7230 (State Enabled|Hovered|Pressed|Dragover|Disabled)
 * Desktop (File Upload/Is Desktop): coluna centralizada · pad 12 20 · gap 16 · Shaped Icon Smallest (upload-line) ·
 *   Text Title (Label/Regular) + Text Description (Caption) + Main Button Ghost Accent Small "Selecionar arquivos".
 * Mobile (File Upload/Is Mobile: tablet e mobile): linha · pad 16 · gap 12 · Shaped Icon Medium · a área inteira é o alvo.
 * Borda tracejada 1px (dash 4 4 no Figma) Border/medium · Dragover: Accent/Solid/soft + Accent/Solid/medium + "Solte para adicionar".
 * Atributos: text-title ("Adicionar arquivos") · text-description ("Arquivos permitidos: JPG e PNG") · show-text-description
 *   show-main-button · button-label ("Selecionar arquivos") · accept · multiple · disabled · viewport · state (specimen)
 * Evento: cds-files { files } — escolhidos no seletor ou soltos na área
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsDropzone extends CDS.Element {
    static get observedAttributes(){ return ["text-title","text-description","show-text-description","show-main-button","button-label","accept","multiple","disabled","drop-text"]; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._id = "cds-dz-" + (++uid); this.innerHTML = "";
        var z = this.zone = this.appendChild(CDS.create("div", null, "cds-dz"));
        this.iconEl = z.appendChild(CDS.create("cds-shaped-icon", { appearance: "neutral", icon: "upload-line" }, "cds-dz__icon"));
        var body = z.appendChild(CDS.create("div", null, "cds-dz__body")); // Container do Figma: textos + botão, gap 8
        var tx = body.appendChild(CDS.create("div", null, "cds-dz__texts"));
        this.titleEl = tx.appendChild(CDS.create("span", { id: this._id + "-t" }, "cds-dz__title"));
        this.descEl = tx.appendChild(CDS.create("span", { id: this._id + "-d" }, "cds-dz__desc"));
        this.btn = body.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "accent", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }, "cds-dz__btn"));
        this.input = this.appendChild(CDS.create("input", { type: "file", tabindex: "-1", "aria-hidden": "true" }, "cds-dz__input"));
        var pick = function(){ if (!self.hasAttribute("disabled")) self.input.click(); };
        this.btn.addEventListener("click", function(e){ e.stopPropagation(); pick(); });
        z.addEventListener("click", function(){ if (self.isMobile) pick(); });
        z.addEventListener("keydown", function(e){ if (self.isMobile && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); pick(); } });
        this.input.addEventListener("change", function(){ if (self.input.files.length) self.emit(self.input.files); self.input.value = ""; });
        var depth = 0;
        z.addEventListener("dragenter", function(e){ if (self.hasAttribute("disabled")) return; e.preventDefault(); depth++; self.classList.add("is-dragover"); self.paint(); });
        z.addEventListener("dragover", function(e){ if (self.hasAttribute("disabled")) return; e.preventDefault(); e.dataTransfer.dropEffect = "copy"; });
        z.addEventListener("dragleave", function(){ if (--depth <= 0){ depth = 0; self.classList.remove("is-dragover"); self.paint(); } });
        z.addEventListener("drop", function(e){ if (self.hasAttribute("disabled")) return; e.preventDefault(); depth = 0; self.classList.remove("is-dragover"); self.paint(); if (e.dataTransfer.files.length) self.emit(e.dataTransfer.files); });
      }
      this.paint();
    }
    get isMobile(){
      var v = this.getAttribute("viewport") || (this.closest("[data-viewport]") || {}).dataset && this.closest("[data-viewport]").dataset.viewport;
      return v === "mobile" || v === "tablet";
    }
    paint(){
      var drag = this.classList.contains("is-dragover") || this.getAttribute("state") === "dragover", mob = this.isMobile, dis = this.hasAttribute("disabled");
      CDS.attr(this.iconEl, "size", drag || mob ? "medium" : "smallest");
      CDS.attr(this.iconEl, "appearance", drag ? "accent" : "neutral");
      this.titleEl.textContent = drag ? this.text("drop-text", "Solte para adicionar") : this.text("text-title", "Adicionar arquivos");
      this.descEl.textContent = this.text("text-description", "Arquivos permitidos: JPG e PNG");
      this.descEl.hidden = drag || !this.flag("show-text-description");
      CDS.attr(this.btn, "label", this.text("button-label", "Selecionar arquivos"));
      this.btn.hidden = drag || mob || !this.flag("show-main-button");
      CDS.attr(this.btn, "disabled", dis ? "" : null);
      CDS.attr(this.input, "accept", this.getAttribute("accept")); this.input.multiple = this.hasAttribute("multiple"); this.input.disabled = dis;
      // Mobile: a área inteira é o botão
      CDS.attr(this.zone, "role", mob ? "button" : null); CDS.attr(this.zone, "tabindex", mob && !dis ? "0" : null);
      CDS.attr(this.zone, "aria-labelledby", mob ? this._id + "-t" : null); CDS.attr(this.zone, "aria-describedby", mob ? this._id + "-d" : null);
      CDS.attr(this.zone, "aria-disabled", mob && dis ? "true" : null);
      CDS.attr(this, "data-mode", mob ? "mobile" : "desktop");
    }
    emit(files){ this.dispatchEvent(new CustomEvent("cds-files", { detail: { files: [].slice.call(files) }, bubbles: true })); }
    connectedCallback(){ super.connectedCallback(); var self = this; if (!this._mo){ var host = this.closest("[data-viewport]"); if (host){ this._mo = new MutationObserver(function(){ self.paint(); }); this._mo.observe(host, { attributes: true, attributeFilter: ["data-viewport"] }); } } }
    disconnectedCallback(){ if (this._mo){ this._mo.disconnect(); this._mo = null; } }
  }
  CdsDropzone.define("cds-dropzone");
})();
