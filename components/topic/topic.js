/**
 * @deps lead-item
 * <cds-topic> — Topic · Content · set 15621:1175
 * .Lead item (Shaped Icon ou Image) + Title (Heading/Small) + Description (Body/Regular).
 * Atributos: orientation (horizontal|vertical) · title · description · show-lead-item · show-title
 *   lead-kind (shaped-icon|image) · lead-icon · lead-src · lead-alt  (repassados ao .Lead item)
 */
(function(){
  "use strict";
  class CdsTopic extends CDS.Element {
    static get observedAttributes(){ return ["orientation", "title", "description", "show-lead-item", "show-title", "lead-kind", "lead-icon", "lead-src", "lead-alt"]; }
    render(){
      this.innerHTML = "";
      if (this.flag("show-lead-item")){
        var attrs = { kind: this.getAttribute("lead-kind") || "shaped-icon" };
        if (this.getAttribute("lead-icon")) attrs.icon = this.getAttribute("lead-icon");
        if (this.getAttribute("lead-src")) attrs.src = this.getAttribute("lead-src");
        if (this.getAttribute("lead-alt") != null) attrs.alt = this.getAttribute("lead-alt");
        this.leadEl = this.appendChild(CDS.create("cds-lead-item", attrs));
      } else this.leadEl = null;
      var tc = this.appendChild(CDS.create("div", null, "cds-topic__text"));
      if (this.flag("show-title")) tc.appendChild(CDS.create("p", null, "cds-topic__title")).textContent = this.text("title", "Title");
      tc.appendChild(CDS.create("p", null, "cds-topic__desc")).textContent = this.text("description", "Lorem Ipsum is simply dummy of the printing and typesetting industry lorem Ipsum has been.");
    }
  }
  CdsTopic.define("cds-topic");
})();
