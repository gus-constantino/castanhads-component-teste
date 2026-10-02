/**
 * @deps backdrop icon
 * <cds-caju-card> — Caju Card · Caju Card · set 17053:1181 (Kind × Orientation × Is Blocked × Side View)
 * Simula os cartões da Caju (description do Figma). As artes são os SVGs exportados de cada variante
 * (assets/caju-card/<kind>-<h|v>-<front|back>.svg); os dados do cartão são texto no próprio SVG e trocados pelos atributos.
 * Is Blocked: Backdrop (Surface/inversed · Opacity/medium) + lock-line (Inversed, Large) no centro.
 *
 * Atributos: kind (fisico | fisico-corporativo | virtual | virtual-corporativo | voucher · padrão fisico)
 *   orientation (vertical | horizontal · padrão vertical) · side (front | back) · blocked
 *   full-card-number ("1234 5678 0009 0001") · cvv ("123") · expiration-date ("10/30") · activation-code ("000 000 000 000 000")
 *   label (nome acessível; sem ele: "Cartão Caju <tipo>, final <4 dígitos>")
 * Combinações que não existem no Figma (C74) caem na mais próxima: vertical e, se preciso, frente.
 */
(function(){
  "use strict";
  var SLUG = { "fisico": "fisico", "fisico-corporativo": "fisico-corp", "virtual": "virtual", "virtual-corporativo": "virtual-corp", "voucher": "voucher" };
  var NAME = { "fisico": "Físico", "fisico-corporativo": "Físico Corporativo", "virtual": "Virtual/Crédito", "virtual-corporativo": "Virtual/Crédito Corporativo", "voucher": "Voucher" };
  var HAVE = { "fisico-h-front":1,"fisico-v-front":1,"fisico-corp-v-front":1,"virtual-h-front":1,"virtual-v-front":1,"virtual-corp-h-front":1,"virtual-corp-v-front":1,
    "voucher-h-front":1,"voucher-v-front":1,"fisico-h-back":1,"fisico-v-back":1,"fisico-corp-v-back":1 };
  var cache = {};
  function load(file){ if (!cache[file]) cache[file] = fetch("assets/caju-card/" + file + ".svg").then(function(r){ if (!r.ok) throw new Error(r.status); return r.text(); }); return cache[file]; }

  class CdsCajuCard extends CDS.Element {
    static get observedAttributes(){ return ["kind","orientation","side","blocked","full-card-number","cvv","expiration-date","activation-code","label"]; }
    get kind(){ var k = this.getAttribute("kind"); return SLUG[k] ? k : "fisico"; }
    get file(){
      var s = SLUG[this.kind], o = this.getAttribute("orientation") === "horizontal" ? "h" : "v", side = this.getAttribute("side") === "back" ? "back" : "front";
      var f = s + "-" + o + "-" + side; if (HAVE[f]) return f;
      f = s + "-v-" + side; if (HAVE[f]) return f;
      return s + "-" + o + "-front" in HAVE ? s + "-" + o + "-front" : s + "-v-front";
    }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.artEl = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-cc__art"));
        this.blockEl = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-cc__blocked"));
        this.blockEl.appendChild(CDS.create("cds-backdrop"));
        this.blockEl.appendChild(CDS.create("cds-icon", { icon: "lock-line", size: "large", appearance: "inversed" }, "cds-cc__lock"));
        this.setAttribute("role", "img");
      }
      var f = this.file, num = this.text("full-card-number", "1234 5678 0009 0001"), last4 = num.replace(/\D/g, "").slice(-4) || "9248";
      CDS.attr(this, "data-orientation", f.indexOf("-h-") > 0 ? "horizontal" : "vertical");
      this.blockEl.hidden = !this.hasAttribute("blocked");
      CDS.attr(this, "aria-label", this.getAttribute("label") || ("Cartão Caju " + NAME[this.kind] + (/-back$/.test(f) ? ", verso" : "") + ", final " + last4 + (this.hasAttribute("blocked") ? ", bloqueado" : "")));
      var data = { number: num, cvv: this.text("cvv", "123"), expiry: this.text("expiration-date", "10/30"), activation: this.text("activation-code", "000 000 000 000 000"), last4: last4 };
      var apply = function(){ [].forEach.call(self.artEl.querySelectorAll("[data-field]"), function(t){ var v = data[t.getAttribute("data-field")]; if (v != null && t.textContent !== v) t.textContent = v; }); };
      if (this._file === f){ apply(); return; }
      this._file = f;
      load(f).then(function(svg){ if (self._file !== f) return; self.artEl.innerHTML = svg; apply(); }).catch(function(){ self.artEl.innerHTML = ""; });
    }
  }
  CdsCajuCard.define("cds-caju-card");
})();
