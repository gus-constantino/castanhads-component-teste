/**
 * <cds-credit-card-input> — Credit Card Input · CDS-1607
 *
 * Campo do número do cartão (PAN), da família text field. Aceita só dígitos e agrupa em
 * blocos de 4 (#### #### #### ####), conforme o .Text Content Mask "Credit Card" do Figma.
 *
 * Atributos: appearance (neutral|warning) · disabled · value (dígitos) · placeholder
 * trailing-label — nome acessível do Icon Button; o papel da ação (tooltip, navegação…) é de quem implementa
 * Texto: label (Text Label) · required-text (padrão "(Obrigatório)") · supporting · error
 * Booleans do Figma, ligados por padrão — passar "false" desliga:
 *   show-label · show-required · show-lead-icon · show-trailing-item · show-supporting-content
 * Eventos: cds-change {value, formatted} · cds-complete {value} · cds-trailing-action
 */
(function(){
  "use strict";
  var MAX_DIGITS = 16, GROUP = 4;
  var uid = 0;

  function onlyDigits(s){ return String(s || "").replace(/\D/g, ""); }
  function format(d){ return d.replace(new RegExp("(\\d{" + GROUP + "})(?=\\d)", "g"), "$1 "); }
  /** posição no texto formatado logo após o n-ésimo dígito */
  function caretAfter(formatted, n){
    if (n <= 0) return 0;
    for (var i = 0, seen = 0; i < formatted.length; i++){ if (/\d/.test(formatted[i]) && ++seen === n) return i + 1; }
    return formatted.length;
  }

  class CdsCreditCardInput extends HTMLElement {
    static get observedAttributes(){ return ["appearance","disabled","value","placeholder","trailing-label","label","required-text","supporting","error","show-label","show-required","show-lead-icon","show-trailing-item","show-supporting-content"]; }
    constructor(){ super(); this._id = "cds-cc-" + (++uid); this._digits = null; }
    get appearance(){ return this.getAttribute("appearance") === "warning" ? "warning" : "neutral"; }
    get disabled(){ return this.hasAttribute("disabled"); }
    get value(){ return this._digits || ""; }
    set value(v){ this._digits = onlyDigits(v).slice(0, MAX_DIGITS); if (this.input) this.input.value = format(this._digits); }
    flag(name){ return this.getAttribute(name) !== "false"; }

    connectedCallback(){ this.render(); }
    attributeChangedCallback(name){
      if (name === "value") this._digits = null; // o atributo volta a ser a fonte
      if (this.isConnected) this.render();
    }

    render(){
      var self = this, kitEl = function(tag, cls){ var n = document.createElement(tag); if (cls) n.className = cls; return n; };
      if (this._digits === null) this._digits = onlyDigits(this.getAttribute("value")).slice(0, MAX_DIGITS);
      var warning = this.appearance === "warning";
      var label = this.getAttribute("label");
      var msg = this.flag("show-supporting-content") ? (warning ? this.getAttribute("error") : this.getAttribute("supporting")) : null;
      var inputId = this._id + "-input", msgId = this._id + "-msg";
      if (this.disabled) this.setAttribute("aria-disabled", "true"); else this.removeAttribute("aria-disabled");
      this.innerHTML = "";

      // Label Content
      if (label && this.flag("show-label")){
        var lab = kitEl("label", "cds-cc__label"); lab.htmlFor = inputId;
        var t = kitEl("span"); t.textContent = label; lab.appendChild(t);
        var reqText = this.hasAttribute("required-text") ? this.getAttribute("required-text") : "(Obrigatório)";
        if (this.flag("show-required") && reqText){ var r = kitEl("span"); r.textContent = reqText; lab.appendChild(document.createTextNode(" ")); lab.appendChild(r); } // espaço só para o nome acessível (flex ignora no layout)
        this.appendChild(lab);
      }

      // Text Box
      var box = kitEl("div", "cds-cc__box");
      var content = kitEl("div", "cds-cc__content");
      if (this.flag("show-lead-icon")){
        // Ícone de cartão padrão, fixo — não detecta a bandeira (annotation). Decorativo.
        var lead = kitEl("span", "cds-icon cds-icon--credit-card-line cds-cc__lead"); lead.setAttribute("aria-hidden", "true");
        content.appendChild(lead);
      }
      var inp = kitEl("input", "cds-cc__input");
      inp.id = inputId; inp.type = "text"; inp.inputMode = "numeric";
      inp.autocomplete = "cc-number"; inp.spellcheck = false;
      inp.maxLength = MAX_DIGITS + Math.floor((MAX_DIGITS - 1) / GROUP);
      inp.placeholder = this.hasAttribute("placeholder") ? this.getAttribute("placeholder") : "1234 5678 9012 3456";
      inp.value = format(this._digits);
      inp.disabled = this.disabled;
      if (!label || !this.flag("show-label")) inp.setAttribute("aria-label", label || "Número do cartão");
      if (warning) inp.setAttribute("aria-invalid", "true");
      if (msg) inp.setAttribute("aria-describedby", msgId);
      content.appendChild(inp);
      box.appendChild(content);

      if (warning){
        var warn = kitEl("span", "cds-icon cds-icon--warning-line cds-cc__warn"); warn.setAttribute("aria-hidden", "true");
        box.appendChild(warn);
      }
      if (this.flag("show-trailing-item")){
        // Nested instance: Icon Button · Ghost · Neutral · Small · support-line
        var act = document.createElement("cds-icon-button");
        act.setAttribute("kind", "ghost"); act.setAttribute("appearance", "neutral"); act.setAttribute("size", "small");
        act.setAttribute("icon", "support-line");
        act.setAttribute("label", this.getAttribute("trailing-label") || "Ajuda sobre o número do cartão");
        if (this.disabled) act.setAttribute("disabled", "");
        act.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-trailing-action", { bubbles: true })); });
        box.appendChild(act);
      }
      this.appendChild(box);
      this.input = inp;

      // Trailing Content
      if (msg){
        var m = kitEl("div", "cds-cc__msg"); m.id = msgId; m.textContent = msg;
        if (warning) m.setAttribute("role", "alert");
        this.appendChild(m);
      }

      this.wire(box, inp);
    }

    commit(digits, caretDigits){
      var inp = this.input;
      this._digits = digits.slice(0, MAX_DIGITS);
      inp.value = format(this._digits);
      if (document.activeElement === inp){ var at = caretAfter(inp.value, Math.min(caretDigits, this._digits.length)); inp.setSelectionRange(at, at); }
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: this._digits, formatted: inp.value }, bubbles: true }));
      if (this._digits.length === MAX_DIGITS) this.dispatchEvent(new CustomEvent("cds-complete", { detail: { value: this._digits }, bubbles: true }));
    }

    wire(box, inp){
      var self = this;
      // Clicar em qualquer ponto do Text Box foca o campo (exceto no Icon Button)
      box.addEventListener("mousedown", function(e){
        if (e.target === inp || e.target.closest("cds-icon-button")) return;
        e.preventDefault(); inp.focus();
      });
      box.addEventListener("pointerup", function(e){
        if (e.target.closest("cds-icon-button")) return;
        box.classList.add("is-tapped");
        clearTimeout(box._tapT);
        box._tapT = setTimeout(function(){ box.classList.remove("is-tapped"); }, 350);
      });
      inp.addEventListener("input", function(){
        var before = onlyDigits(inp.value.slice(0, inp.selectionStart)).length;
        self.commit(onlyDigits(inp.value), before);
      });
      inp.addEventListener("keydown", function(e){
        // Backspace/Delete sobre o espaço do agrupamento apaga o dígito vizinho
        var s = inp.selectionStart, end = inp.selectionEnd;
        if (s !== end) return;
        if (e.key === "Backspace" && s > 0 && inp.value[s - 1] === " "){
          e.preventDefault();
          var nb = onlyDigits(inp.value.slice(0, s - 1)).length;
          self.commit(self._digits.slice(0, nb - 1) + self._digits.slice(nb), nb - 1);
        } else if (e.key === "Delete" && inp.value[s] === " "){
          e.preventDefault();
          var nd = onlyDigits(inp.value.slice(0, s)).length;
          self.commit(self._digits.slice(0, nd) + self._digits.slice(nd + 1), nd);
        }
      });
    }
  }
  if (!customElements.get("cds-credit-card-input")) customElements.define("cds-credit-card-input", CdsCreditCardInput);
})();
