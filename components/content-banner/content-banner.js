/**
 * @deps icon
 * <cds-content-banner> — .Content Banner · building block · set 20028:15153
 * Text Container (Title + Description) e CTA (texto + go-line). O CTA é só indicação visual da ação do Banner.
 * Atributos: appearance (neutral|inversed) · title ("Label") · description ("Description") · cta ("Label")
 *   show-text-title · show-cta (ligados por padrão)
 */
(function(){
  "use strict";
  class CdsContentBanner extends CDS.Element {
    static get observedAttributes(){ return ["appearance", "title", "description", "cta", "show-text-title", "show-cta"]; }
    render(){
      this.innerHTML = "";
      var tc = this.appendChild(CDS.create("div", null, "cds-cb__text"));
      if (this.flag("show-text-title")) tc.appendChild(CDS.create("p", null, "cds-cb__title")).textContent = this.text("title", "Label");
      tc.appendChild(CDS.create("p", null, "cds-cb__desc")).textContent = this.text("description", "Description");
      if (this.flag("show-cta")){
        var cta = this.appendChild(CDS.create("span", null, "cds-cb__cta"));
        cta.appendChild(CDS.create("span")).textContent = this.text("cta", "Label");
        // Figma: Icon Neutral com override de cor na instância → Icons/inversed no Inversed
        var inv = this.getAttribute("appearance") === "inversed";
        cta.appendChild(CDS.create("cds-icon", { icon: "go-line", size: "medium", appearance: inv ? "inversed" : "neutral" }));
      }
    }
  }
  CdsContentBanner.define("cds-content-banner");
})();
