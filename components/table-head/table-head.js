/**
 * @deps icon checkbox
 * CDS.TableHead — conteúdo do .Head (Tables · set 13382:1327 · Kind Default|Multi Selection × Sort Default|Up|Down × State).
 * 56 · Surface/01 · borda inferior Border/semi-soft · pad 0 16 0 20 (Multi Selection: 0 20) · gap 8 · Caption/Medium Text/intense.
 * Sort: up-line / down-line quando ordenado; up-down-line só no hover (Sort=Default). Hovered: Neutral/Opacity/Intense/semi-transparent ·
 * Pressed: Neutral/Solid/semi-soft.
 * <cds-table-head> (building block): kind (default|multi-selection) · sort (default|up|down) · text-head ("Head") · show-heading-text · state
 */
(function(){
  "use strict";
  var ICON = { up: "up-line", down: "down-line", "default": "up-down-line" };
  // el: th ou div · o = { kind, sort, text, showText, sortable, status }
  function fill(el, o){
    el.innerHTML = ""; el.classList.add("cds-th"); el.setAttribute("data-kind", o.kind === "multi" ? "multi" : "default");
    if (o.kind === "multi"){
      el.appendChild(CDS.create("cds-checkbox", { "show-text-label": "false", label: o.label || "Selecionar todas as linhas", status: o.status || null }, "cds-th__check"));
      return el;
    }
    var host = o.sortable ? el.appendChild(CDS.create("button", { type: "button" }, "cds-th__btn")) : el.appendChild(CDS.create("span", null, "cds-th__btn"));
    var t = host.appendChild(CDS.create("span", null, "cds-th__text")); t.textContent = o.text == null ? "Head" : o.text; t.hidden = o.showText === false;
    if (o.sortable !== false) host.appendChild(CDS.create("cds-icon", { icon: ICON[o.sort || "default"], size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-th__sort" + (o.sort && o.sort !== "default" ? " is-sorted" : "")));
    return el;
  }
  CDS.TableHead = { fill: fill };
  class CdsTableHead extends CDS.Element {
    static get observedAttributes(){ return ["kind","sort","text-head","show-heading-text"]; }
    render(){ fill(this, { kind: this.getAttribute("kind") === "multi-selection" ? "multi" : "default", sort: this.getAttribute("sort") || "default", text: this.getAttribute("text-head"), showText: this.flag("show-heading-text"), sortable: true }); }
  }
  CdsTableHead.define("cds-table-head");
})();
