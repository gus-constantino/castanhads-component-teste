/**
 * @deps —
 * <cds-slider> — Slider · set 20056:11908 (Kind Single|Range × State × Value)
 * Trilha 8 (pill): ativa Surface/accent · inativa Surface/01 · Stops (marcas de 4, Neutral/Opacity/Intense/medium, Show Stops).
 * Thumb 24 (Surface/accent, círculo de 8 Icons/inversed) com a bolha de valor (Value Indicator: Caption/Medium Text/inversed
 * sobre Neutral/Solid/semi-intense, raio extra-small).
 * Hovered: círculo Icons/accent + bolha Neutral/Solid/intense · Pressed: thumb Accent/Solid/medium, círculo Accent/Solid/semi-intense,
 * bolha Surface/accent · Dragged: como Pressed com o thumb Surface/accent · Disabled: Opacity/medium.
 * Value (variante do Figma) é só prototipação; aqui o valor é numérico (description).
 *
 * Atributos: kind (single|range) · min (0) · max (100) · step (10) · value (single · padrão min) · start / end (range)
 *   show-stops · show-value-indicator · disabled · label (single · "Valor") · min-label ("Mínimo") · max-label ("Máximo")
 *   value-text (modelo de aria-valuetext, com {v} · ex.: "R$ {v}")
 * Acessibilidade (description): cada thumb é role="slider" com aria-valuemin/max/now; no Range, dois nomes
 * (Mínimo/Máximo) e thumbs que não se cruzam. Teclado: setas ±step · PageUp/PageDown ±10 steps · Home/End.
 * Eventos: input (durante o arraste) · cds-change { value } ou { start, end } (ao soltar e no teclado)
 */
(function(){
  "use strict";
  function num(v, d){ var n = parseFloat(v); return isNaN(n) ? d : n; }
  class CdsSlider extends CDS.Element {
    static get observedAttributes(){ return ["kind","min","max","step","value","start","end","show-stops","show-value-indicator","disabled","label","min-label","max-label","value-text"]; }
    get range(){ return this.getAttribute("kind") === "range"; }
    get min(){ return num(this.getAttribute("min"), 0); }
    get max(){ var m = num(this.getAttribute("max"), 100); return m > this.min ? m : this.min + 1; }
    get step(){ var s = num(this.getAttribute("step"), 10); return s > 0 ? s : 1; }
    snap(v){ var mn = this.min, st = this.step; v = Math.round((v - mn) / st) * st + mn; v = Math.min(Math.max(v, mn), this.max); return +v.toFixed(6); }
    get values(){
      if (!this.range) return [this.snap(num(this.getAttribute("value"), this.min))];
      var a = this.snap(num(this.getAttribute("start"), this.min)), b = this.snap(num(this.getAttribute("end"), this.max));
      return a <= b ? [a, b] : [b, a];
    }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        var t = this.trackEl = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-sl__track"));
        this.fillEl = t.appendChild(CDS.create("div", null, "cds-sl__fill"));
        this.stopsEl = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-sl__stops"));
        this.thumbs = [0, 1].map(function(i){
          var th = self.appendChild(CDS.create("div", { role: "slider", tabindex: "0" }, "cds-sl__thumb"));
          th.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-sl__dot"));
          th.bubble = th.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-sl__bubble"));
          th.addEventListener("keydown", function(e){ self.onKey(e, i); });
          th.addEventListener("pointerdown", function(e){ self.startDrag(e, i); });
          return th;
        });
        this.trackHit = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-sl__hit"));
        this.trackHit.addEventListener("pointerdown", function(e){
          if (self.hasAttribute("disabled")) return;
          var v = self.valueAt(e.clientX), vals = self.values, i = 0;
          if (self.range) i = Math.abs(v - vals[0]) <= Math.abs(v - vals[1]) ? 0 : 1;
          self.setIndex(i, v, false); self.startDrag(e, i);
        });
      }
      var vals = this.values, mn = this.min, mx = this.max, pct = function(v){ return (v - mn) / (mx - mn) * 100; }, rg = this.range, dis = this.hasAttribute("disabled");
      this.fillEl.style.left = (rg ? pct(vals[0]) : 0) + "%";
      this.fillEl.style.width = (rg ? pct(vals[1]) - pct(vals[0]) : pct(vals[0])) + "%";
      // Stops: uma marca por step (11 no Figma: 0–100, passo 10)
      var n = Math.round((mx - mn) / this.step) + 1;
      this.stopsEl.hidden = !this.flag("show-stops") || n > 101;
      if (this.stopsEl.children.length !== n){ this.stopsEl.innerHTML = ""; for (var k = 0; k < n && n <= 101; k++) this.stopsEl.appendChild(CDS.create("span", null, "cds-sl__stop")); }
      var names = rg ? [this.getAttribute("min-label") || "Mínimo", this.getAttribute("max-label") || "Máximo"] : [this.getAttribute("label") || "Valor"];
      var vt = this.getAttribute("value-text");
      this.thumbs.forEach(function(th, i){
        var on = i < vals.length; th.hidden = !on; if (!on) return;
        th.style.left = pct(vals[i]) + "%";
        th.bubble.textContent = self.format(vals[i]); th.bubble.hidden = !self.flag("show-value-indicator");
        CDS.attr(th, "aria-label", names[i]);
        CDS.attr(th, "aria-valuemin", String(rg && i === 1 ? vals[0] : mn)); CDS.attr(th, "aria-valuemax", String(rg && i === 0 ? vals[1] : mx));
        CDS.attr(th, "aria-valuenow", String(vals[i])); CDS.attr(th, "aria-valuetext", vt ? vt.replace("{v}", self.format(vals[i])) : null);
        CDS.attr(th, "aria-disabled", dis ? "true" : null); th.tabIndex = dis ? -1 : 0;
      });
    }
    format(v){ var s = String(v); return this.range && v > 0 && this.min < 0 ? "+" + s : s; } // Range com negativos: "-20" / "+20", como no Figma
    valueAt(x){ var r = this.trackEl.getBoundingClientRect(); return this.min + Math.min(Math.max((x - r.left) / r.width, 0), 1) * (this.max - this.min); }
    setIndex(i, v, emit){
      v = this.snap(v); var vals = this.values;
      if (this.range){ if (i === 0) v = Math.min(v, vals[1]); else v = Math.max(v, vals[0]); } // não se cruzam
      if (v === vals[i]) return false;
      this.setAttribute(this.range ? (i === 0 ? "start" : "end") : "value", String(v));
      this.dispatchEvent(new Event("input", { bubbles: true }));
      if (emit) this.emit();
      return true;
    }
    emit(){ var v = this.values; this.dispatchEvent(new CustomEvent("cds-change", { detail: this.range ? { start: v[0], end: v[1] } : { value: v[0] }, bubbles: true })); }
    startDrag(e, i){
      if (this.hasAttribute("disabled") || e.button > 0) return;
      e.preventDefault();
      var self = this, th = this.thumbs[i]; th.focus();
      this.classList.add("is-dragging"); th.classList.add("is-dragging");
      var move = function(ev){ self.setIndex(i, self.valueAt(ev.clientX), false); };
      var up = function(){ document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up); document.removeEventListener("pointercancel", up); self.classList.remove("is-dragging"); th.classList.remove("is-dragging"); self.emit(); };
      document.addEventListener("pointermove", move); document.addEventListener("pointerup", up); document.addEventListener("pointercancel", up);
    }
    onKey(e, i){
      if (this.hasAttribute("disabled")) return;
      var v = this.values[i], st = this.step, nv = { ArrowRight: v + st, ArrowUp: v + st, ArrowLeft: v - st, ArrowDown: v - st, PageUp: v + st * 10, PageDown: v - st * 10, Home: this.min, End: this.max }[e.key];
      if (nv == null) return;
      e.preventDefault(); this.setIndex(i, nv, true);
    }
  }
  CdsSlider.define("cds-slider");
})();
