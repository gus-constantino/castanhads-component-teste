/**
 * CDS.Element — classe base dos custom elements do Castanha DS (light DOM).
 *
 *   class CdsTag extends CDS.Element {
 *     static get observedAttributes(){ return ["label", "icon"]; }
 *     render(){ … this.flag("show-lead-item") … this.text("label", "Tag") … }
 *   }
 *   CdsTag.define("cds-tag");
 *
 * Contrato (ver docs/ARCHITECTURE.md §3):
 *   - connectedCallback → render(); attributeChangedCallback → render() quando conectado.
 *     Componentes com estado (inputs) sobrescrevem attributeChangedCallback.
 *   - flag(name): booleans do Figma ligados por padrão — só "false" desliga.
 *   - text(name, fallback): atributo de texto com o padrão do Figma (string vazia é válida).
 *   - a11yName(label): com label → role="img" + aria-label; sem → aria-hidden (decorativo).
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};

  class CdsElement extends HTMLElement {
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    render(){}
    flag(name){ return this.getAttribute(name) !== "false"; }
    text(name, fallback){ return this.hasAttribute(name) ? this.getAttribute(name) : fallback; }
    a11yName(label){
      if (label){ this.setAttribute("role", "img"); this.setAttribute("aria-label", label); this.removeAttribute("aria-hidden"); }
      else { this.removeAttribute("role"); this.removeAttribute("aria-label"); this.setAttribute("aria-hidden", "true"); }
    }
    static define(tag){ if (!customElements.get(tag)) customElements.define(tag, this); return this; }
  }

  /** Cria um elemento com atributos (string vazia = boolean ligado; null/false = omitido). */
  CDS.create = function(tag, attrs, cls){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) Object.keys(attrs).forEach(function(k){ var v = attrs[k]; if (v != null && v !== false) n.setAttribute(k, v === true ? "" : v); });
    return n;
  };

  /**
   * Posiciona um elemento flutuante (position:fixed) junto de uma âncora.
   * placement: "top" | "bottom" | "bottom-start" | "bottom-end" · gap em px (padrão 8).
   * Vira para o outro lado se não couber e nunca sai da janela (margem de 8px). Usado por Tooltip, Popover e Selects.
   */
  CDS.position = function(anchor, el, opts){
    opts = opts || {};
    var gap = opts.gap == null ? 8 : opts.gap, pad = 8, place = opts.placement || "bottom-start";
    var r = anchor.getBoundingClientRect(), me = el.getBoundingClientRect();
    var vw = window.innerWidth, vh = window.innerHeight;
    var top = /^top/.test(place) ? r.top - me.height - gap : r.bottom + gap;
    if (/^bottom/.test(place) && top + me.height > vh - pad && r.top - me.height - gap >= pad) top = r.top - me.height - gap;
    if (/^top/.test(place) && top < pad) top = r.bottom + gap;
    var left = /-end$/.test(place) ? r.right - me.width : /-start$/.test(place) ? r.left : r.left + r.width / 2 - me.width / 2;
    left = Math.min(Math.max(pad, left), vw - me.width - pad);
    el.style.position = "fixed"; el.style.margin = "0";
    el.style.left = Math.round(left) + "px"; el.style.top = Math.round(Math.max(pad, top)) + "px";
  };

  /** setAttribute só quando o valor muda (null remove). Mesmo valor também dispara attributeChangedCallback,
   *  e um filho pode re-renderizar com estado velho no meio da atualização do pai. */
  CDS.attr = function(el, name, val){
    if (val == null || val === false){ if (el.hasAttribute(name)) el.removeAttribute(name); return; }
    val = val === true ? "" : String(val);
    if (el.getAttribute(name) !== val) el.setAttribute(name, val);
  };
  CDS.Element = CdsElement;
})();
