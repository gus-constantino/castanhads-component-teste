/**
 * @deps icon
 * <cds-breadcrumb-item> — .Item (Breadcrumb) · .Building Blocks · set 6713:3
 * Separator (navigation-right-line 16, Has Separator) + Content (pad 8 · raio extra-small).
 * Kind=Default: Label · Kind=Truncate: more-line (abre o Popover com os níveis escondidos).
 * Is Active=True: Label/Medium + Text/intense · False: Label/Regular + Text/medium (Hovered/Pressed: Text/intense).
 * Atributos: kind (default|truncate) · label ("Label") · has-separator · is-active · href · current · disabled
 *   state="hovered|pressed" (specimen)
 * O conteúdo é <a> com href, <span aria-current="page"> com current, senão <button> (Truncate sempre é <button>).
 */
(function(){
  "use strict";
  class CdsBreadcrumbItem extends CDS.Element {
    static get observedAttributes(){ return ["kind","label","has-separator","is-active","href","current","disabled","truncate-label"]; }
    get kind(){ return this.getAttribute("kind") === "truncate" ? "truncate" : "default"; }
    get tagFor(){ return this.kind === "truncate" ? "button" : this.hasAttribute("current") ? "span" : this.hasAttribute("href") ? "a" : "button"; }
    get control(){ return this.contentEl; }
    render(){
      var tag = this.tagFor;
      if (!this.sepEl){ this.sepEl = this.appendChild(CDS.create("cds-icon", { icon: "navigation-right-line", size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-bci__sep")); }
      if (!this.contentEl || this.contentEl.tagName.toLowerCase() !== tag){
        if (this.contentEl) this.contentEl.remove();
        var c = this.contentEl = this.appendChild(CDS.create(tag, null, "cds-bci__content"));
        if (tag === "button") c.type = "button";
      }
      var c = this.contentEl, dis = this.hasAttribute("disabled");
      this.sepEl.hidden = !this.flag("has-separator");
      if (this.kind === "truncate"){
        if (!c.firstChild || c.firstChild.tagName !== "CDS-ICON"){ c.innerHTML = ""; c.appendChild(CDS.create("cds-icon", { icon: "more-line", size: "small", appearance: "neutral", "aria-hidden": "true" })); }
        CDS.attr(c, "aria-label", this.getAttribute("truncate-label") || "Mostrar níveis anteriores");
      } else {
        c.textContent = this.text("label", "Label"); c.removeAttribute("aria-label");
      }
      if (tag === "a"){ if (dis){ c.removeAttribute("href"); CDS.attr(c, "aria-disabled", "true"); } else { CDS.attr(c, "href", this.getAttribute("href")); c.removeAttribute("aria-disabled"); } }
      if (tag === "button") c.disabled = dis;
      if (tag === "span") CDS.attr(c, "aria-current", "page"); else c.removeAttribute("aria-current");
    }
  }
  CdsBreadcrumbItem.define("cds-breadcrumb-item");
})();
