/**
 * @deps table-head table-cell table-toolbar pagination main-button
 * <cds-table> — Table · Tables · set 13472:5725 (Kind Default|Empty · Show Toolbar · Show Pagination · Table Columns = Slot)
 * Container (stroke Border/semi-soft · raio large): .Toolbar + colunas (.Head 56 + .Data Cell 64) · Pagination abaixo.
 * No Figma a tabela é montada por colunas (.Table Column); aqui é um <table> de verdade (linhas para o leitor de tela).
 * Kind=Empty: ilustração empty-state + "Falha ao carregar os dados…" (Body/Regular Text/medium) + Main Button Ghost Accent Small.
 *
 * Dados (propriedades):
 *   .columns = [{ key, label, kind: text|balance|percentage|tag|link|actions, sortable (padrão true), width }]
 *   .rows    = [{ id?, <key>: valor | { text, description, value, percentual, label, href, appearance } }]
 *   Sem dados: amostra do Figma (Checkbox · Default · Balance · Percentual · Tag · Icon Buttons, 10 linhas).
 * Atributos: kind (default|empty) · selectable (coluna Checkbox · padrão ligado) · show-toolbar · show-pagination · per-page (10)
 *   label (legenda) · empty-text · empty-action ("Recarregar página")
 * Os filhos de quem usa vão para o .Toolbar.
 * Ordenação: clique no .Head alterna Default → Up (crescente) → Down → Default; aria-sort no <th>.
 * Eventos: cds-sort { key, direction } · cds-selection { ids } · cds-action { id, action } · cds-retry · cds-page-change (da Pagination)
 */
(function(){
  "use strict";
  var SAMPLE_COLS = [
    { key: "text", label: "Head", kind: "text" }, { key: "balance", label: "Head", kind: "balance" },
    { key: "percentage", label: "Head", kind: "percentage" }, { key: "tag", label: "Head", kind: "tag" },
    { key: "actions", label: "Head", kind: "actions", sortable: true, width: 160 }
  ];
  function sampleRows(){ var r = []; for (var i = 0; i < 10; i++) r.push({ id: String(i + 1) }); return r; }
  function sortVal(v){ if (v && typeof v === "object") v = v.value != null ? v.value : v.percentual != null ? v.percentual : v.text != null ? v.text : v.label; var s = String(v == null ? "" : v), n = parseFloat(s.replace(/\./g, "").replace(",", ".")); return isNaN(n) || /[a-z]/i.test(s) ? s.toLowerCase() : n; }

  class CdsTable extends CDS.Element {
    static get observedAttributes(){ return ["kind","selectable","show-toolbar","show-pagination","per-page","label","empty-text","empty-action"]; }
    get columns(){ return this._columns || SAMPLE_COLS; }
    set columns(c){ this._columns = c; this._sel = {}; if (this._built) this.render(); }
    get rows(){ return this._rows || sampleRows(); }
    set rows(r){ this._rows = r; this._sel = {}; this._page = 1; if (this._built) this.render(); }
    get selected(){ var s = this._sel || {}; return Object.keys(s).filter(function(k){ return s[k]; }); }

    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._sel = {}; this._sort = null; this._page = 1;
        var kids = [].slice.call(this.childNodes); this.innerHTML = "";
        var box = this.box = this.appendChild(CDS.create("div", null, "cds-table__box"));
        this.toolbar = box.appendChild(CDS.create("cds-table-toolbar"));
        kids.forEach(function(k){ self.toolbar.appendChild(k); });
        this.scroll = box.appendChild(CDS.create("div", null, "cds-table__scroll"));
        this.empty = box.appendChild(CDS.create("div", { role: "status" }, "cds-table__empty"));
        this.empty.appendChild(CDS.create("img", { src: CDS.illustration("notificacoes/empty-state"), alt: "", width: "200", height: "200" }, "cds-table__ill"));
        this.emptyText = this.empty.appendChild(CDS.create("p", null, "cds-table__empty-text"));
        this.retry = this.empty.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "accent", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }));
        this.retry.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-retry", { bubbles: true })); });
        this.pager = this.appendChild(CDS.create("cds-pagination", null, "cds-table__pager"));
        this.pager.addEventListener("cds-page-change", function(e){ self._page = e.detail.page; self.renderBody(); });
        this.pager.addEventListener("cds-per-page-change", function(e){ self.setAttribute("per-page", String(e.detail.perPage)); });
        this.scroll.addEventListener("click", function(e){
          var th = e.target.closest("button.cds-th__btn"); if (th){ self.toggleSort(th.closest("th").dataset.key); return; }
          var ib = e.target.closest("cds-icon-button[data-action]"); if (ib){ self.dispatchEvent(new CustomEvent("cds-action", { detail: { id: ib.closest("tr").dataset.id, action: ib.dataset.action }, bubbles: true })); }
        });
        this.scroll.addEventListener("cds-change", function(e){
          var cb = e.target.closest("cds-checkbox"); if (!cb) return; e.stopPropagation();
          var on = e.detail.status === "selected";
          if (cb.classList.contains("cds-th__check")) self.pageRows().forEach(function(r){ self._sel[r.__id] = on; });
          else self._sel[cb.closest("tr").dataset.id] = on;
          self.renderBody();
          self.dispatchEvent(new CustomEvent("cds-selection", { detail: { ids: self.selected }, bubbles: true }));
        });
      }
      var emptyKind = this.getAttribute("kind") === "empty";
      CDS.attr(this, "kind", emptyKind ? "empty" : null);
      this.toolbar.hidden = !this.flag("show-toolbar");
      this.pager.hidden = !this.flag("show-pagination");
      this.scroll.hidden = emptyKind; this.empty.hidden = !emptyKind;
      this.emptyText.textContent = this.getAttribute("empty-text") || "Falha ao carregar os dados. Confira sua conexão e tente novamente.";
      CDS.attr(this.retry, "label", this.getAttribute("empty-action") || "Recarregar página");
      if (!emptyKind) this.renderTable();
      this.syncPager();
    }
    get perPage(){ return Math.max(1, parseInt(this.getAttribute("per-page"), 10) || 10); }
    allRows(){
      var rows = this.rows.map(function(r, i){ var o = Object.assign({}, r); o.__id = r.id != null ? String(r.id) : String(i + 1); return o; });
      var s = this._sort;
      if (s) rows.sort(function(a, b){ var x = sortVal(a[s.key]), y = sortVal(b[s.key]); var c = x < y ? -1 : x > y ? 1 : 0; return s.dir === "up" ? c : -c; });
      return rows;
    }
    pageRows(){ var all = this.allRows(), per = this.perPage, p = Math.min(this._page || 1, Math.max(1, Math.ceil(all.length / per))); return all.slice((p - 1) * per, p * per); }
    syncPager(){
      if (!this._rows){ ["total","pages","page"].forEach(function(a){ this.pager.removeAttribute(a); }, this); CDS.attr(this.pager, "per-page", String(this.perPage)); return; } // amostra: textos do Figma
      var total = this._rows.length, per = this.perPage;
      CDS.attr(this.pager, "total", String(total)); CDS.attr(this.pager, "per-page", String(per));
      CDS.attr(this.pager, "pages", String(Math.max(1, Math.ceil(total / per)))); CDS.attr(this.pager, "page", String(this._page || 1));
    }
    renderTable(){
      var self = this, sel = this.flag("selectable");
      this.scroll.innerHTML = "";
      var table = this.table = this.scroll.appendChild(CDS.create("table", null, "cds-table"));
      if (this.getAttribute("label")){ var cap = table.appendChild(CDS.create("caption", null, "cds-table__caption")); cap.textContent = this.getAttribute("label"); }
      var head = table.appendChild(CDS.create("thead")).appendChild(CDS.create("tr"));
      if (sel){ var th0 = head.appendChild(CDS.create("th", { scope: "col" })); CDS.TableHead.fill(th0, { kind: "multi" }); th0.style.width = "88px"; }
      this.columns.forEach(function(c){
        var th = head.appendChild(CDS.create("th", { scope: "col" })); th.dataset.key = c.key;
        var s = self._sort && self._sort.key === c.key ? self._sort.dir : "default";
        CDS.TableHead.fill(th, { kind: "default", text: c.label, sortable: c.sortable !== false, sort: s });
        if (c.sortable !== false) th.setAttribute("aria-sort", s === "up" ? "ascending" : s === "down" ? "descending" : "none");
        if (c.width) th.style.width = c.width + "px";
      });
      this.tbody = table.appendChild(CDS.create("tbody"));
      this.renderBody();
    }
    renderBody(){
      if (!this.tbody) return;
      var self = this, sel = this.flag("selectable"), rows = this.pageRows(), cols = this.columns, sample = !this._rows;
      this.tbody.innerHTML = "";
      rows.forEach(function(r){
        var tr = self.tbody.appendChild(CDS.create("tr")); tr.dataset.id = r.__id;
        if (sel) CDS.TableCell.fill(tr.appendChild(CDS.create("td")), "checkbox", { checked: !!self._sel[r.__id], label: "Selecionar linha " + r.__id });
        cols.forEach(function(c){
          var v = r[c.key], d = v && typeof v === "object" ? Object.assign({}, v) : sample ? {} : { text: v, value: v, percentual: v, label: v };
          if (!sample && !(v && typeof v === "object") && c.kind === "text") d.description = "";
          CDS.TableCell.fill(tr.appendChild(CDS.create("td")), CDS.TableCell.kindOf(c.kind), d);
        });
      });
      // checkbox do cabeçalho: selecionado / indeterminado / vazio (linhas da página)
      var hc = this.table && this.table.querySelector(".cds-th__check");
      if (hc){ var n = rows.filter(function(r){ return self._sel[r.__id]; }).length; CDS.attr(hc, "status", n === 0 ? "unselected" : n === rows.length ? "selected" : "indeterminate"); }
    }
    toggleSort(key){
      var s = this._sort, dir = !s || s.key !== key ? "up" : s.dir === "up" ? "down" : null;
      this._sort = dir ? { key: key, dir: dir } : null;
      this.renderTable();
      var th = this.table.querySelector('th[data-key="' + key + '"] button'); if (th) th.focus();
      this.dispatchEvent(new CustomEvent("cds-sort", { detail: { key: key, direction: dir || "default" }, bubbles: true }));
    }
  }
  CdsTable.define("cds-table");
})();
