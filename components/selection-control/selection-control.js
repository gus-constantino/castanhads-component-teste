/**
 * @deps —
 * CDS.SelectionControl — base interna de Checkbox, Radio Button e Switch (sem playground).
 *
 * Render incremental: build() cria o DOM uma vez (o <input> nativo nunca é recriado);
 * update() só ajusta texto, estado e atributos. Assim foco, teclado e seleção sobrevivem.
 *
 * Atributos comuns (padrões do Figma):
 *   label            Text Label · padrão "Label"
 *   show-text-label  "false" esconde o rótulo (o nome acessível continua: aria-label)
 *   status           selected | unselected (Checkbox também: indeterminate) · padrão unselected
 *   disabled · name · value
 * Evento: cds-change { status } — o status é refletido no atributo.
 * Subclasse define: static inputType · buildBox(box) · applyStatus(input, status)
 */
(function(){
  "use strict";
  class SelectionControl extends CDS.Element {
    static get observedAttributes(){ return ["label", "show-text-label", "status", "disabled", "name", "value"]; }
    get status(){ return this.getAttribute("status") || "unselected"; }
    set status(v){ this.setAttribute("status", v); }
    get input(){ return this._input; }
    focus(o){ if (this._input) this._input.focus(o); }

    render(){ if (!this._root) this.build(); this.update(); }

    build(){
      var self = this;
      var root = CDS.create("label", null, "cds-sc");
      var sel = CDS.create("span", null, "cds-sc__selector");
      var input = CDS.create("input", { type: this.constructor.inputType }, "cds-sc__input");
      var box = CDS.create("span", { "aria-hidden": "true" }, "cds-sc__box");
      this.buildBox(box);
      sel.appendChild(input); sel.appendChild(box);
      this._label = CDS.create("span", null, "cds-sc__label");
      root.appendChild(sel); root.appendChild(this._label);
      this.appendChild(root);
      this._root = root; this._input = input; this._box = box;
      input.addEventListener("change", function(){ self.onInputChange(); });
    }

    update(){
      var label = this.text("label", "Label");
      this._label.textContent = label;
      if (this.flag("show-text-label")) this._input.removeAttribute("aria-label"); else this._input.setAttribute("aria-label", label);
      this._input.disabled = this.hasAttribute("disabled");
      if (this.getAttribute("name")) this._input.name = this.getAttribute("name"); else this._input.removeAttribute("name");
      if (this.getAttribute("value")) this._input.value = this.getAttribute("value");
      this.applyStatus(this._input, this.status);
    }

    /** Padrão: checked ↔ selected. Subclasses podem estender (Checkbox indeterminate, Radio exclusividade). */
    onInputChange(){
      this.status = this._input.checked ? "selected" : "unselected";
      this.emit();
    }
    emit(){ this.dispatchEvent(new CustomEvent("cds-change", { detail: { status: this.status }, bubbles: true })); }
    buildBox(){}
    applyStatus(input, status){ input.checked = status === "selected"; }
  }
  CDS.SelectionControl = SelectionControl;
})();
