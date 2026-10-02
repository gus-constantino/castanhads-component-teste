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

  /** Instance swap de ícone — agrupado por bucket (categoria do [Caju] Icons); deprecated e glifos ficam de fora. */
  function iconSwap(panel, o){
    var A = window.CDS.assets || {}, icons = A.icons || [], buckets = (A.iconBuckets || []).filter(function(b){ return !b.deprecated && !b.glyphs; });
    var sel = select(panel, { label: o.label || "Icon (instance swap)", value: o.value, options: [],
      hint: buckets.reduce(function(t, b){ return t + b.icons.length; }, 0) + " ícones do [Caju] Icons em " + buckets.length + " categorias · <a href=\"#/caju-icons\">ver biblioteca</a>",
      onChange: o.onChange });
    var has = {}; icons.forEach(function(i){ has[i.name] = true; });
    buckets.forEach(function(b){
      var g = el("optgroup", { label: b.name });
      b.icons.forEach(function(n){ if (!has[n]) return; var op = el("option", { value: n, text: n }); if (n === o.value) op.selected = true; g.appendChild(op); });
      if (g.children.length) sel.appendChild(g);
    });
    return sel;
  }

  /**
   * Playground padrão da família Text Fields.
   * o.tag · o.attrs (iniciais) · o.booleans [[attr, rótulo]] · o.texts [[attr, rótulo, valor]] · o.leadIcon (valor do swap)
   * o.variants(panel, p) — controles extras em Variants · o.extra(panel, p) — seções extras no fim
   * o.nested(p) — [{ title, exposed, note, props() }] para o inspetor
   */
  function textField(ctx, o){
    var panel = ctx.panel, p = el(o.tag, o.attrs || {});
    ctx.preview.appendChild(p);
    var set = function(n, v){ attr(p, n, v); };
    var readout = function(){ ctx.readout(String(p.value == null ? "" : p.value), false); };
    p.addEventListener("cds-change", readout);
    section(panel, "Variants");
    seg(panel, { label: "Appearance", value: (o.attrs && o.attrs.appearance) || "neutral", options: [["neutral","Neutral"],["warning","Warning"]], onChange: function(v){ set("appearance", v === "neutral" ? null : v); } });
    if (o.variants) o.variants(panel, p, set);
    toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    hint(panel, "Hovered, Pressed e <code>Is Active</code> são estados de interação: passe o mouse, pressione e foque o campo. <code>Is Filled</code> deriva do valor real.");
    if (o.booleans && o.booleans.length){
      section(panel, "Booleans");
      o.booleans.forEach(function(b){ toggle(panel, { label: b[1], checked: b[2] !== false, onChange: function(on){ set(b[0], on ? null : "false"); } }); });
    }
    if (o.texts && o.texts.length){
      section(panel, "Texts");
      o.texts.forEach(function(t){ text(panel, { label: t[1], value: t[2] || "", placeholder: t[3], hint: t[4], onInput: function(v){ set(t[0], v === "" && t[0] !== "required-text" ? null : v); } }); });
    }
    if (o.leadIcon){ section(panel, "Instance swap"); iconSwap(panel, { label: "Lead Icon", value: o.leadIcon, onChange: function(v){ set("lead-icon", v); } }); }
    if (o.extra) o.extra(panel, p, set);
    if (o.nested){
      section(panel, "Nested instances");
      var refs = o.nested(p).map(function(n){ return nested(panel, n); });
      watch(p, function(){ refs.forEach(function(f){ f(); }); });
    }
    readout();
    return p;
  }

  /**
   * Playground padrão dos Selection Controls (Checkbox · Radio Button · Switch).
   * o.tag · o.statuses [[valor, rótulo]] · o.extraHint
   */
  function selectionControl(ctx, o){
    var p = el(o.tag, { label: "Label", status: "unselected" });
    ctx.preview.appendChild(p);
    var statusSeg;
    function readout(){ ctx.readout(p.getAttribute("status"), false); }
    p.addEventListener("cds-change", function(){
      statusSeg.querySelectorAll("button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.v === p.getAttribute("status"))); });
      readout();
    });
    section(ctx.panel, "Variants");
    statusSeg = seg(ctx.panel, { label: "Status", value: "unselected", options: o.statuses, hint: o.extraHint, onChange: function(v){ p.setAttribute("status", v); readout(); } });
    toggle(ctx.panel, { label: "State: Disabled", onChange: function(on){ attr(p, "disabled", on); } });
    hint(ctx.panel, "Hovered e Pressed são interação; o clique alterna o Status (como as reactions do Figma).");
    section(ctx.panel, "Booleans");
    toggle(ctx.panel, { label: "Show Text Label", checked: true, onChange: function(on){ attr(p, "show-text-label", on ? null : "false"); } });
    section(ctx.panel, "Texts");
    text(ctx.panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    readout();
    return p;
  }

  /** Liga/desliga um atributo no elemento de preview. */
  /**
   * Playground padrão dos overlays (Modal · Drawer · Bottom Sheet).
   * Mostra o specimen inline (como no Figma) e um botão que abre o overlay de verdade (dialog modal com Backdrop).
   * o.tag · o.attrs · o.slot() → nós do Slot · o.booleans [[attr, rótulo]] · o.texts [[attr, rótulo, valor]] · o.hint
   */
  function overlay(ctx, o){
    var panel = ctx.panel, attrs = o.attrs || {}, spec, live;
    function make(extra){ var n = el(o.tag, Object.assign({}, attrs, extra), o.slot()); return n; }
    spec = make({ inline: true }); live = make({});
    live.addEventListener("cds-open", function(){ ctx.readout("aberto", false); });
    live.addEventListener("cds-close", function(){ ctx.readout("fechado", false); });
    live.addEventListener("cds-action", function(e){ ctx.readout("cds-action · " + e.detail.action, false); live.close(); });
    ctx.preview.appendChild(spec); ctx.preview.appendChild(live);
    function set(k, v){ if (v == null) delete attrs[k]; else attrs[k] = v; attr(spec, k, v); attr(live, k, v); }
    var open = el("button", { type: "button", "class": "pg-text", text: "Abrir de verdade" });
    open.addEventListener("click", function(){ live.show(); });
    panel.appendChild(open);
    if (o.hint) hint(panel, o.hint);
    if (o.variants) o.variants(panel, set);
    if (o.booleans && o.booleans.length){
      section(panel, "Booleans");
      o.booleans.forEach(function(b){ toggle(panel, { label: b[1], checked: b[2] !== false, hint: b[3], onChange: function(on){ set(b[0], on === (b[2] !== false) ? null : String(on)); } }); });
    }
    if (o.texts && o.texts.length){
      section(panel, "Texts");
      o.texts.forEach(function(t){ text(panel, { label: t[1], value: t[2], onInput: function(v){ set(t[0], v); } }); });
    }
    return { spec: spec, live: live, set: set };
  }

  function attr(node, name, val){
    if (val === null || val === false || val === "") node.removeAttribute(name);
    else node.setAttribute(name, val === true ? "" : val);
  }

  CDS.kit = { el: el, section: section, hint: hint, seg: seg, toggle: toggle, text: text, range: range, nested: nested, watch: watch, select: select, iconSwap: iconSwap, selectionControl: selectionControl, textField: textField, overlay: overlay, attr: attr };
})();
