/**
 * @deps date-navigation calendar-week calendar-day main-button
 * <cds-date-picker> — Date Picker · Datepicker · set 17629:24427 (Kind Single|Double Calendar × Role Days|Month|Year Selector)
 * Raiz: pad 0 20 · gap 8 · Surface/default · Single 320 / Double 620 (dois meses lado a lado, gap 20).
 * Days: .Navigation Control + cabeçalho D S T Q Q S S (Label/Medium Text/medium) + até 6 .Week (gap 8, pb 8) + Selected Date.
 * Month / Year: lista de Main Buttons Ghost Neutral Medium (280 × 48, gap 4) em 288 de altura, com rolagem.
 * Selected Date: "Data Selecionada" (Caption/Medium) + "13/01/2026 até 24/01/2026" (Body/Medium).
 *
 * Atributos:
 *   kind (single|double · padrão single) · view (days|month|year — Role · padrão days)
 *   mode (single|range · padrão range: no Figma a amostra mostra as duas datas)
 *   value (single: AAAA-MM-DD) · start / end (range: AAAA-MM-DD) · month (AAAA-MM do 1º mês exibido; sem ele, o da seleção ou o atual)
 *   min / max (AAAA-MM-DD) · today (AAAA-MM-DD, para testes; padrão: hoje)
 *   selected-date-label ("Data Selecionada") · show-selected-dates (padrão ligado; só aparece com seleção)
 *   show-first-day-selected · show-last-day-selected (padrão ligados — Show First/Last Day Selected do Figma)
 *   label (nome da grade · "Calendário")
 * Teclado (grade do WAI-ARIA): setas ±1 dia / ±1 semana · Home/End início/fim da semana · PageUp/PageDown ±1 mês
 *   (Shift: ±1 ano) · Enter/Espaço seleciona.
 * Eventos: cds-change { value } (single) · cds-change { start, end } (range; end vazio no 1º clique)
 */
(function(){
  "use strict";
  var MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  var WEEK = [["D","domingo"],["S","segunda-feira"],["T","terça-feira"],["Q","quarta-feira"],["Q","quinta-feira"],["S","sexta-feira"],["S","sábado"]];
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  function iso(d){ return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parse(s){ var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); if (!m) return null; var d = new Date(+m[1], +m[2] - 1, +m[3]); return d.getMonth() === +m[2] - 1 ? d : null; }
  function br(d){ return pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "/" + d.getFullYear(); }
  function fromBr(s){ var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s || ""); return m ? parse(m[3] + "-" + m[2] + "-" + m[1]) : null; }
  function addDays(d, n){ return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function addMonths(d, n){ var t = new Date(d.getFullYear(), d.getMonth() + n, 1), last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate(); return new Date(t.getFullYear(), t.getMonth(), Math.min(d.getDate(), last)); }
  function same(a, b){ return !!a && !!b && a.getTime() === b.getTime(); }
  function longName(d){ return d.getDate() + " de " + MONTHS[d.getMonth()].toLowerCase() + " de " + d.getFullYear() + ", " + WEEK[d.getDay()][1]; }
  CDS.dates = { MONTHS: MONTHS, iso: iso, parse: parse, br: br, fromBr: fromBr, addDays: addDays, addMonths: addMonths };

  var uid = 0;
  class CdsDatePicker extends CDS.Element {
    static get observedAttributes(){ return ["kind","view","mode","value","start","end","month","min","max","today","selected-date-label","show-selected-dates","show-first-day-selected","show-last-day-selected","label"]; }
    constructor(){ super(); this._id = "cds-dp-" + (++uid); }
    get kind(){ return this.getAttribute("kind") === "double" ? "double" : "single"; }
    get view(){ var v = this.getAttribute("view"); return v === "month" || v === "year" ? v : "days"; }
    get mode(){ return this.getAttribute("mode") === "single" ? "single" : "range"; }
    get today(){ return parse(this.getAttribute("today")) || (function(){ var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })(); }
    get start(){ return parse(this.mode === "single" ? this.getAttribute("value") : this.getAttribute("start")); }
    get end(){ return this.mode === "single" ? null : parse(this.getAttribute("end")); }
    get min(){ return parse(this.getAttribute("min")); }
    get max(){ return parse(this.getAttribute("max")); }
    get anchor(){ // 1º mês exibido
      var m = /^(\d{4})-(\d{2})$/.exec(this.getAttribute("month") || "");
      if (m) return new Date(+m[1], +m[2] - 1, 1);
      var s = this.start || this.today; return new Date(s.getFullYear(), s.getMonth(), 1);
    }
    setMonth(d){ this.setAttribute("month", d.getFullYear() + "-" + pad(d.getMonth() + 1)); }

    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.nav = this.appendChild(CDS.create("cds-date-navigation", null, "cds-dp__nav"));
        this.body = this.appendChild(CDS.create("div", null, "cds-dp__body"));
        var sd = this.selEl = this.appendChild(CDS.create("div", { "aria-live": "polite" }, "cds-dp__selected"));
        this.selLabel = sd.appendChild(CDS.create("div", null, "cds-dp__sel-label"));
        var dates = sd.appendChild(CDS.create("div", null, "cds-dp__sel-dates"));
        this.selFirst = dates.appendChild(CDS.create("span", null, "cds-dp__sel-date"));
        this.selLast = dates.appendChild(CDS.create("span", null, "cds-dp__sel-last"));
        this.nav.addEventListener("cds-prev", function(){ self.shift(self.view === "month" ? -12 : -1); });
        this.nav.addEventListener("cds-next", function(){ self.shift(self.view === "month" ? 12 : 1); });
        this.nav.addEventListener("cds-month", function(e){ self._monthTarget = e.detail.which; self.setAttribute("view", "month"); });
        this.nav.addEventListener("cds-year", function(){ self.setAttribute("view", "year"); });
        this.body.addEventListener("click", function(e){
          var day = e.target.closest("cds-calendar-day[data-date]"); if (day && !day.hasAttribute("disabled")) return self.pick(parse(day.dataset.date));
          var mb = e.target.closest("[data-month]"); if (mb){ var a = self.anchor, idx = +mb.dataset.month; var first = new Date(a.getFullYear(), idx - (self._monthTarget === "trailing" ? 1 : 0), 1); self._monthTarget = null; self.setMonth(first); self.setAttribute("view", "days"); return; }
          var yb = e.target.closest("[data-year]"); if (yb){ self.setMonth(new Date(+yb.dataset.year, self.anchor.getMonth(), 1)); self.setAttribute("view", "days"); }
        });
        this.body.addEventListener("keydown", function(e){ self.onKey(e); });
      }
      CDS.attr(this, "kind", this.kind === "double" ? "double" : null);
      var v = this.view, a = this.anchor, dbl = this.kind === "double";
      // Navigation Control por Role (como no Figma): Days = tudo · Month = setas + Ano · Year = nada (só a lista)
      CDS.attr(this.nav, "first-month", MONTHS[a.getMonth()]);
      CDS.attr(this.nav, "year", String(a.getFullYear()));
      CDS.attr(this.nav, "trailing-month", MONTHS[(a.getMonth() + 1) % 12]);
      CDS.attr(this.nav, "show-first-month", v === "days" ? null : "false");
      CDS.attr(this.nav, "show-trailing-month", v === "days" && dbl ? null : "false");
      CDS.attr(this.nav, "show-year", v === "year" ? "false" : null);
      CDS.attr(this.nav, "show-left-control", v === "year" ? "false" : null);
      CDS.attr(this.nav, "show-right-control", v === "year" ? "false" : null);
      this.body.innerHTML = "";
      if (v === "days") this.renderDays(a, dbl); else if (v === "month") this.renderList("month"); else this.renderList("year");
      this.renderSelected();
    }

    renderDays(a, dbl){
      var wrap = this.body.appendChild(CDS.create("div", null, "cds-dp__months"));
      var months = dbl ? [a, new Date(a.getFullYear(), a.getMonth() + 1, 1)] : [a];
      var focus = this._focus && this.inShown(this._focus) ? this._focus : null, self = this, firstFocusable = null;
      months.forEach(function(m, mi){
        var cal = wrap.appendChild(CDS.create("div", { role: "grid", "aria-label": MONTHS[m.getMonth()] + " de " + m.getFullYear() }, "cds-dp__calendar"));
        var head = cal.appendChild(CDS.create("div", { role: "row" }, "cds-dp__weekdays"));
        WEEK.forEach(function(w){ var c = head.appendChild(CDS.create("div", { role: "columnheader", "aria-label": w[1] }, "cds-dp__weekday")); c.appendChild(CDS.create("span", { "aria-hidden": "true" })).textContent = w[0]; });
        var weeks = cal.appendChild(CDS.create("div", { role: "rowgroup" }, "cds-dp__weeks"));
        var first = new Date(m.getFullYear(), m.getMonth(), 1), days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
        var cells = []; for (var i = 0; i < first.getDay(); i++) cells.push(null); for (var d = 1; d <= days; d++) cells.push(new Date(m.getFullYear(), m.getMonth(), d));
        while (cells.length % 7) cells.push(null);
        for (var w = 0; w < cells.length / 7; w++){
          var row = CDS.create("cds-calendar-week", { role: "row" }); // preenche antes de conectar (sem filhos, o .Week gera a amostra)
          for (var k = 0; k < 7; k++){
            var date = cells[w * 7 + k];
            if (!date){ row.appendChild(CDS.create("div", { role: "gridcell" }, "cds-dp__cell")); continue; }
            var st = self.dayState(date);
            var day = CDS.create("cds-calendar-day", { role: "gridcell", label: String(date.getDate()), "date-label": longName(date),
              selected: st.selected ? "" : null, "role-kind": st.role, current: same(date, self.today) ? "" : null, disabled: st.disabled ? "" : null });
            day.dataset.date = iso(date); day.setAttribute("aria-selected", String(!!st.selected));
            row.appendChild(day);
            if (!firstFocusable && !st.disabled) firstFocusable = date;
          }
          weeks.appendChild(row);
        }
      });
      // foco itinerante: o dia focado, senão o início da seleção, hoje ou o 1º dia do mês
      var target = focus || (this.start && this.inShown(this.start) ? this.start : (this.inShown(this.today) ? this.today : firstFocusable));
      this.body.querySelectorAll("cds-calendar-day[data-date]").forEach(function(d){ if (d.button) d.button.tabIndex = d.dataset.date === iso(target) ? 0 : -1; });
      if (this._refocus){ this._refocus = false; var t = this.body.querySelector('cds-calendar-day[data-date="' + iso(target) + '"]'); if (t && t.button) t.button.focus(); }
    }
    inShown(d){ var a = this.anchor, last = new Date(a.getFullYear(), a.getMonth() + (this.kind === "double" ? 2 : 1), 0); return d >= a && d <= last; }
    dayState(d){
      var s = this.start, e = this.end, min = this.min, max = this.max, r = { selected: false, role: "default", disabled: (min && d < min) || (max && d > max) };
      if (s && e && !same(s, e)){
        if (same(d, s)){ r.selected = true; r.role = "start"; } else if (same(d, e)){ r.selected = true; r.role = "end"; } else if (d > s && d < e){ r.selected = true; r.role = "middle"; }
      } else if (s && same(d, s)) r.selected = true;
      return r;
    }
    renderList(type){
      var list = this.body.appendChild(CDS.create("div", { role: "group", "aria-label": type === "month" ? "Meses" : "Anos" }, "cds-dp__list"));
      var a = this.anchor, cur = type === "month" ? a.getMonth() : a.getFullYear(), sel = null;
      var items = type === "month" ? MONTHS.map(function(n, i){ return [i, n]; }) : (function(){ var out = [], y1 = Math.max(a.getFullYear(), new Date().getFullYear()) + 10; for (var y = 1950; y <= y1; y++) out.push([y, String(y)]); return out; })();
      items.forEach(function(it){
        var b = list.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "neutral", size: "medium", label: it[1], "show-lead-icon": "false", "show-trailing-icon": "false" }, "cds-dp__item"));
        b.dataset[type] = it[0];
        var ib = b.querySelector("button"); if (ib && it[0] === cur) ib.setAttribute("aria-current", "true");
        if (it[0] === cur) sel = b;
      });
      if (sel) requestAnimationFrame(function(){ sel.scrollIntoView({ block: "center" }); });
    }
    renderSelected(){
      var s = this.start, e = this.end, show = this.flag("show-selected-dates") && !!s;
      this.selEl.hidden = !show;
      this.selLabel.textContent = this.text("selected-date-label", "Data Selecionada");
      this.selFirst.textContent = s ? br(s) : "";
      this.selFirst.hidden = !this.flag("show-first-day-selected");
      this.selLast.hidden = !(e && !same(e, s)) || !this.flag("show-last-day-selected");
      this.selLast.innerHTML = ""; if (e){ this.selLast.appendChild(CDS.create("span")).textContent = "até"; this.selLast.appendChild(CDS.create("span", null, "cds-dp__sel-date")).textContent = br(e); }
    }

    pick(d){
      if (!d) return;
      this._focus = d; this._refocus = true;
      if (this.mode === "single"){
        this.setAttribute("value", iso(d));
        return this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: iso(d) }, bubbles: true }));
      }
      var s = this.start, e = this.end;
      if (!s || e){ this.setAttribute("start", iso(d)); this.removeAttribute("end"); }        // 1º clique: novo início
      else if (d < s){ this.setAttribute("start", iso(d)); this.setAttribute("end", iso(s)); }   // antes do início: inverte
      else this.setAttribute("end", iso(d));
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { start: this.getAttribute("start"), end: this.getAttribute("end") || "" }, bubbles: true }));
    }
    shift(n){ var a = this.anchor; this.setMonth(new Date(a.getFullYear(), a.getMonth() + n, 1)); }
    onKey(e){
      var day = e.target.closest && e.target.closest("cds-calendar-day[data-date]"); if (!day) return;
      var d = parse(day.dataset.date), n = null;
      switch (e.key){
        case "ArrowLeft": n = addDays(d, -1); break; case "ArrowRight": n = addDays(d, 1); break;
        case "ArrowUp": n = addDays(d, -7); break; case "ArrowDown": n = addDays(d, 7); break;
        case "Home": n = addDays(d, -d.getDay()); break; case "End": n = addDays(d, 6 - d.getDay()); break;
        case "PageUp": n = addMonths(d, e.shiftKey ? -12 : -1); break; case "PageDown": n = addMonths(d, e.shiftKey ? 12 : 1); break;
        case "Enter": case " ": e.preventDefault(); if (!day.hasAttribute("disabled")) this.pick(d); return;
        default: return;
      }
      e.preventDefault();
      this._focus = n; this._refocus = true;
      if (!this.inShown(n)){ var a = this.anchor, off = (n.getFullYear() - a.getFullYear()) * 12 + n.getMonth() - a.getMonth(); this.shift(off < 0 ? off : off - (this.kind === "double" ? 1 : 0)); }
      else this.render();
    }
    focusDay(){ this._refocus = true; this.render(); }
  }
  CdsDatePicker.define("cds-date-picker");
})();
