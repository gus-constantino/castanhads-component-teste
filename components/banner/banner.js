/**
 * @deps content-banner image backdrop
 * <cds-banner> — Banner · Banner · set 20051:15726
 * Destaque de conteúdo com título, descrição e CTA. O banner inteiro é a área clicável e dispara uma ação
 * (o CTA é só indicação visual, não é focável). Vira <a> com href ou <button> sem href.
 *
 * Atributos:
 *   kind          illustration (fundo sólido + ilustração na lateral) | image (imagem de fundo + Backdrop)
 *   illustration  nome em assets/illustrations (padrão "sino", como no Figma)
 *   src · alt     imagem do Kind=Image
 *   bg            token de cor do fundo no Kind=Illustration (ex.: "decorative-02"); padrão Decorative/01
 *   content       neutral | inversed — Appearance do .Content Banner (padrão: neutral no Illustration, inversed no Image)
 *   title · description · cta · show-text-title · show-cta   (repassados ao .Content Banner)
 *   href · disabled · state (forçado: hovered|pressed)
 */
(function(){
  "use strict";
  class CdsBanner extends CDS.Element {
    static get observedAttributes(){ return ["kind","illustration","src","alt","bg","content","title","description","cta","show-text-title","show-cta","href","disabled"]; }
    render(){
      var image = this.getAttribute("kind") === "image", href = this.getAttribute("href"), dis = this.hasAttribute("disabled");
      this.innerHTML = "";
      var el = this.target = CDS.create(href && !dis ? "a" : "button", null, "cds-banner");
      if (href && !dis) el.href = href; else { el.type = "button"; el.disabled = dis; }
      var bg = this.getAttribute("bg");
      if (bg && !image) el.style.setProperty("--_banner-bg", "var(--common-colors-" + bg + ")");
      if (image){
        el.appendChild(CDS.create("cds-image", { src: this.getAttribute("src") || "", alt: this.getAttribute("alt") || "" }, "cds-banner__img"));
        el.appendChild(CDS.create("cds-backdrop", null, "cds-banner__backdrop")); // nested instance: Backdrop
      }
      var cb = CDS.create("cds-content-banner", { appearance: this.getAttribute("content") || (image ? "inversed" : "neutral") }, "cds-banner__content");
      ["title","description","cta","show-text-title","show-cta"].forEach(function(k){ var v = this.getAttribute(k); if (v != null) cb.setAttribute(k, v); }, this);
      if (image) el.appendChild(cb);
      else {
        var row = el.appendChild(CDS.create("span", null, "cds-banner__row"));
        row.appendChild(cb);
        var ill = this.getAttribute("illustration") || "sino";
        row.appendChild(CDS.create("img", { src: "assets/illustrations/" + encodeURIComponent(ill) + ".svg", alt: "", "aria-hidden": "true" }, "cds-banner__ill"));
      }
      this.appendChild(el);
    }
  }
  CdsBanner.define("cds-banner");
})();
