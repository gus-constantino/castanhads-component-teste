/**
 * @deps icon tag currency
 * <cds-balance-card> — Balance Card · Actions · set 17881:1707
 * Saldo de uma categoria: Lead Icon · Header Tag (Warning) · Label · Currency (Large) · Bottom Tag (Informative).
 * Ponto de entrada para o detalhe da categoria: o card inteiro é clicável (<a> com href, <button> sem).
 *
 * Atributos: label · value ("100,00") · symbol ("R$") · show-value · icon (Lead Icon)
 *   header-tag · bottom-tag (textos, padrão "Tag") · show-header-tag · show-bottom-tag
 *   href · disabled · state (forçado: hovered|pressed)
 */
(function(){
  "use strict";
  class CdsBalanceCard extends CDS.Element {
    static get observedAttributes(){ return ["label","value","symbol","show-value","icon","header-tag","bottom-tag","show-header-tag","show-bottom-tag","href","disabled"]; }
    render(){
      var href = this.getAttribute("href"), dis = this.hasAttribute("disabled");
      this.innerHTML = "";
      var el = this.target = CDS.create(href && !dis ? "a" : "button", null, "cds-bc");
      if (href && !dis) el.href = href; else { el.type = "button"; el.disabled = dis; }
      var head = el.appendChild(CDS.create("span", null, "cds-bc__head"));
      head.appendChild(CDS.create("cds-icon", { icon: this.getAttribute("icon") || "placeholder-line", size: "large", appearance: "neutral" }));
      if (this.flag("show-header-tag")) head.appendChild(CDS.create("cds-tag", { appearance: "warning", label: this.text("header-tag", "Tag"), "show-lead-item": "false" }));
      var content = el.appendChild(CDS.create("span", null, "cds-bc__content"));
      var main = content.appendChild(CDS.create("span", null, "cds-bc__main"));
      main.appendChild(CDS.create("span", null, "cds-bc__label")).textContent = this.text("label", "Label");
      var cur = { size: "large", appearance: "neutral", value: this.text("value", "100,00") };
      if (this.getAttribute("symbol")) cur.symbol = this.getAttribute("symbol");
      if (this.getAttribute("show-value") === "false") cur["show-value"] = "false";
      main.appendChild(CDS.create("cds-currency", cur));
      if (this.flag("show-bottom-tag")) content.appendChild(CDS.create("cds-tag", { appearance: "informative", label: this.text("bottom-tag", "Tag"), "show-lead-item": "false" }));
      this.appendChild(el);
    }
  }
  CdsBalanceCard.define("cds-balance-card");
})();
