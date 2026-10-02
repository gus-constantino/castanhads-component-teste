/**
 * @deps icon currency-symbol tag checkbox link icon-button
 * CDS.TableCell — conteúdo do .Data Cell (Tables · set 13404:1015), usado pela Table (<td>) e pelo <cds-data-cell>.
 * Kind: text (Lead Icon + Body/Regular + Caption) · balance (R$ + Label/Regular, à direita) · percentage ("0,00" "%", à direita)
 *   · tag (Tag Neutral) · checkbox · link (Link Neutral + navigation-right-line) · actions (3 Icon Buttons Ghost Accent Small)
 * 64 de altura · Surface/default · borda inferior Border/semi-soft · Hovered: Surface/01.
 *
 * <cds-data-cell> (building block): kind · text ("Text content") · description · show-description · value ("1.000,00")
 *   · percentual ("0,00") · icon · state="hovered"
 */
(function(){
  "use strict";
  var KINDS = { text: 1, balance: 1, percentage: 1, tag: 1, checkbox: 1, link: 1, actions: 1 };
  function kindOf(k){ k = (k || "text").toLowerCase(); if (k === "default") k = "text"; if (k === "percentual") k = "percentage"; if (k === "action-controls" || k === "icon-buttons") k = "actions"; return KINDS[k] ? k : "text"; }
  // Preenche o elemento (td ou div) com o conteúdo do Kind. d = { text, description, showDescription, value, percentual, icon, label, href, actions: [{icon,label,action}], checked }
  function fill(el, kind, d){
    el.innerHTML = ""; el.classList.add("cds-td"); el.setAttribute("data-kind", kind);
    var w = el.appendChild(CDS.create("div", null, "cds-td__in"));
    if (kind === "text"){
      if (d.icon !== false) w.appendChild(CDS.create("cds-icon", { icon: d.icon || "placeholder-line", size: "small", appearance: "neutral", "aria-hidden": "true" }));
      var t = w.appendChild(CDS.create("div", null, "cds-td__text"));
      t.appendChild(CDS.create("span", null, "cds-td__main")).textContent = d.text == null ? "Text content" : d.text;
      if (d.showDescription !== false && d.description !== "") t.appendChild(CDS.create("span", null, "cds-td__desc")).textContent = d.description == null ? "Description" : d.description;
    } else if (kind === "balance"){
      w.appendChild(CDS.create("cds-currency-symbol"));
      w.appendChild(CDS.create("span", null, "cds-td__value")).textContent = d.value == null ? "1.000,00" : d.value;
    } else if (kind === "percentage"){
      w.appendChild(CDS.create("span", null, "cds-td__num")).textContent = (d.percentual == null ? "0,00" : d.percentual);
      w.appendChild(CDS.create("span", null, "cds-td__num")).textContent = "%";
    } else if (kind === "tag"){
      w.appendChild(CDS.create("cds-tag", { label: d.label || d.text || "Tag", appearance: d.appearance || null, "show-lead-item": d.showLeadItem === false ? "false" : null }));
    } else if (kind === "checkbox"){
      w.appendChild(CDS.create("cds-checkbox", { "show-text-label": "false", label: d.label || "Selecionar linha", status: d.checked ? "selected" : null }, "cds-td__check"));
    } else if (kind === "link"){
      w.appendChild(CDS.create("cds-link", { label: d.text || "Link content", href: d.href || "#" }));
    } else {
      (d.actions || [{ icon: "placeholder-line", label: "Ação 1" }, { icon: "placeholder-line", label: "Ação 2" }, { icon: "placeholder-line", label: "Ação 3" }]).forEach(function(a, i){
        var b = w.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "accent", size: "small", icon: a.icon || "placeholder-line", label: a.label || "Ação" }));
        b.dataset.action = a.action || String(i);
      });
    }
    return el;
  }
  CDS.TableCell = { fill: fill, kindOf: kindOf };

  class CdsDataCell extends CDS.Element {
    static get observedAttributes(){ return ["kind","text","description","show-description","value","percentual","icon"]; }
    render(){
      fill(this, kindOf(this.getAttribute("kind")), { text: this.getAttribute("text"), description: this.getAttribute("description"), showDescription: this.flag("show-description"),
        value: this.getAttribute("value"), percentual: this.getAttribute("percentual"), icon: this.getAttribute("icon") });
    }
  }
  CdsDataCell.define("cds-data-cell");
})();
