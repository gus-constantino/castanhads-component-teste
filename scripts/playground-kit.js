/**
 * Kit do playground — registro de componentes + helpers de controle.
 *
 * Cada componente registra um playground:
 *   CDS.register({
 *     id: "credit-card-input", name: "Credit Card Input",
 *     category: "Text Fields",   // página do Figma (agrupa o side menu)
 *     block: false,              // true = building block (seção recolhida no fim do menu)
 *     task: "CDS-1607", figma: "https://…", zeroheight: "https://…",
 *     mount(ctx){ … }   // ctx.preview · ctx.panel · ctx.kit · ctx.readout(text, done)
 *   });
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  CDS.playgrounds = CDS.playgrounds || [];
  CDS.register = function(def){ CDS.playgrounds.push(def); };

  var uid = 0;
  function id(prefix){ return (prefix || "pg") + "-" + (++uid); }

  function el(tag, attrs, children){
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function(k){
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === "text") n.textContent = v;
      else if (k === "html") n.innerHTML = v;
      else n.setAttribute(k, v === true ? "" : v);
    });
    (children || []).forEach(function(c){ if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }

  /** Título de grupo (Variants · Booleans · Texts…) */
  function section(panel, title){ panel.appendChild(el("h3", { "class": "pg-sub", text: title })); }

  function hint(parent, text){ var h = el("div", { "class": "pg-hint", html: text }); parent.appendChild(h); return h; }

  /** Segmented control. options: [[valor, rótulo], …] */
  function seg(panel, o){
    var lid = id("l"), wrap = el("div", { "class": "pg-ctrl" });
    wrap.appendChild(el("span", { "class": "pg-lbl", id: lid, text: o.label }));
    var group = el("div", { "class": "pg-seg", role: "group", "aria-labelledby": lid });
    o.options.forEach(function(opt){
      var b = el("button", { type: "button", "data-v": opt[0], "aria-pressed": String(opt[0] === o.value), text: opt[1] });
      b.addEventListener("click", function(){
        group.querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", String(x === b)); });
        o.onChange(opt[0]);
      });
      group.appendChild(b);
    });
    wrap.appendChild(group);
    if (o.hint) hint(wrap, o.hint);
    panel.appendChild(wrap);
    return group;
  }

  /** Switch (boolean). Retorna o <input type=checkbox>. */
  function toggle(panel, o){
    var iid = id("c"), wrap = el("div", { "class": "pg-ctrl pg-row" });
    wrap.appendChild(el("label", { "class": "pg-lbl", "for": iid, text: o.label }));
    var input = el("input", { type: "checkbox", id: iid, checked: !!o.checked });
    var sw = el("label", { "class": "pg-switch" }, [input, el("span", { "class": "pg-track" }), el("span", { "class": "pg-thumb" })]);
    input.addEventListener("change", function(){ o.onChange(input.checked); });
    wrap.appendChild(sw);
    panel.appendChild(wrap);
    return input;
  }

  /** Campo de texto. Retorna o <input>. */
  function text(panel, o){
    var iid = id("c"), wrap = el("div", { "class": "pg-ctrl" });
    wrap.appendChild(el("label", { "class": "pg-lbl", "for": iid, text: o.label }));
    var input = el("input", { "class": "pg-text", type: "text", id: iid, value: o.value || "", placeholder: o.placeholder, autocomplete: "off" });
    input.addEventListener("input", function(){ o.onInput(input.value); });
    wrap.appendChild(input);
    if (o.hint) hint(wrap, o.hint);
    panel.appendChild(wrap);
    return input;
  }

  /** Slider com valor. Retorna o <input type=range>. */
  function range(panel, o){
    var iid = id("c"), wrap = el("div", { "class": "pg-ctrl" });
    wrap.appendChild(el("label", { "class": "pg-lbl", "for": iid, text: o.label }));
    var input = el("input", { type: "range", id: iid, min: o.min, max: o.max, value: o.value });
    var out = el("output", { "for": iid, text: String(o.value) });
    input.addEventListener("input", function(){ out.textContent = input.value; o.onInput(parseInt(input.value, 10)); });
    wrap.appendChild(el("div", { "class": "pg-range" }, [input, out]));
    panel.appendChild(wrap);
    return input;
  }

  /**
   * Nested instance — mostra as props de uma instância aninhada do Figma, ao vivo.
   * o.title · o.exposed (bool: exposta no Figma) · o.note · o.items() → rótulos para escolher
   * (ex.: células) · o.props(i) → [[prop, valor], …]. Retorna refresh().
   */
  function nested(panel, o){
    var box = el("div", { "class": "pg-nested" });
    var head = el("div", { "class": "pg-nested__head" }, [
      el("span", { "class": "pg-nested__title", text: o.title }),
      el("span", { "class": "pg-badge" + (o.exposed ? " is-on" : ""), text: o.exposed ? "exposta" : "fixa" })
    ]);
    box.appendChild(head);
    if (o.note) box.appendChild(el("div", { "class": "pg-hint", html: o.note }));
    var picker = null, sel = 0;
    if (o.items){ picker = el("div", { "class": "pg-chips", role: "group", "aria-label": "Instância" }); box.appendChild(picker); }
    var dl = el("dl", { "class": "pg-props" });
    box.appendChild(dl);
    panel.appendChild(box);
    function refresh(){
      if (picker){
        var items = o.items();
        if (sel >= items.length) sel = 0;
        if (picker.children.length !== items.length){
          picker.innerHTML = "";
          items.forEach(function(lbl, i){
            var b = el("button", { type: "button", text: lbl, "aria-pressed": String(i === sel) });
            b.addEventListener("click", function(){ sel = i; refresh(); });
            picker.appendChild(b);
          });
        }
        Array.prototype.forEach.call(picker.children, function(b, i){ b.setAttribute("aria-pressed", String(i === sel)); });
      }
      dl.innerHTML = "";
      o.props(sel).forEach(function(kv){
        dl.appendChild(el("dt", { text: kv[0] }));
        dl.appendChild(el("dd", { text: String(kv[1]) }));
      });
    }
    refresh();
    return refresh;
  }

  /** Chama fn sempre que o componente muda: interação, foco, hover, atributos. */
  function watch(node, fn){
    var raf = 0, run = function(){ cancelAnimationFrame(raf); raf = requestAnimationFrame(fn); };
    ["input","focusin","focusout","pointerover","pointerout","pointerdown","pointerup","click","keyup"].forEach(function(t){ node.addEventListener(t, run, true); });
    document.addEventListener("pointerup", run);
    new MutationObserver(run).observe(node, { attributes: true, childList: true, subtree: true });
  }

  /** Select. options: [[valor, rótulo], …]. Retorna o <select>. */
  function select(panel, o){
    var iid = id("c"), wrap = el("div", { "class": "pg-ctrl" });
    wrap.appendChild(el("label", { "class": "pg-lbl", "for": iid, text: o.label }));
    var sel = el("select", { "class": "pg-text", id: iid });
    o.options.forEach(function(opt){ var op = el("option", { value: opt[0], text: opt[1] }); if (opt[0] === o.value) op.selected = true; sel.appendChild(op); });
    sel.addEventListener("change", function(){ o.onChange(sel.value); });
    wrap.appendChild(sel);
    if (o.hint) hint(wrap, o.hint);
    panel.appendChild(wrap);
    return sel;
  }

  /** Instance swap de ícone — lista os ícones de CDS.assets (assets/icons). */
  function iconSwap(panel, o){
    var icons = (window.CDS.assets && CDS.assets.icons) || [];
    return select(panel, { label: o.label || "Icon (instance swap)", value: o.value,
      options: icons.map(function(i){ return [i.name, i.name]; }),
      hint: icons.length + " ícones em <code>assets/icons</code>. Exporte mais do [Caju] Icons e rode <code>node scripts/build-assets.js</code>.",
      onChange: o.onChange });
  }

  /** Liga/desliga um atributo no elemento de preview. */
  function attr(node, name, val){
    if (val === null || val === false || val === "") node.removeAttribute(name);
    else node.setAttribute(name, val === true ? "" : val);
  }

  CDS.kit = { el: el, section: section, hint: hint, seg: seg, toggle: toggle, text: text, range: range, nested: nested, watch: watch, select: select, iconSwap: iconSwap, attr: attr };
})();
