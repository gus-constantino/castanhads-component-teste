/* Playground — Code Input OTP */
CDS.register({
  id: "code-input-otp",
  name: "Code Input OTP",
  category: "Text Fields",
  task: "CDS-1608",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/PfeMbrThCwzwJFFo2GiAbW/-CastanhaDS--Components?node-id=24060-7228",
  zeroheight: "https://zeroheight.com/858426090/v/latest/p/1166c7",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-code-input", {
      length: "6", separators: "3", label: "Código",
      supporting: "Enviamos um código por SMS.", error: "Código inválido. Tente de novo."
    });
    ctx.preview.appendChild(p);
    function set(name, val){ kit.attr(p, name, val); }
    function readout(){ ctx.readout(p.value, p.value.length === p.length); }
    p.addEventListener("cds-change", readout);

    // Length + separadores
    var sepOn = [3], chips;
    var len = kit.range(panel, { label: "Length (3–6)", min: 3, max: 6, value: 6, onInput: function(n){
      set("length", String(n)); buildSep(); applySeps(); readout();
    }});
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["warning","Warning"]],
      onChange: function(v){ set("appearance", v === "neutral" ? null : v); } });
    kit.seg(panel, { label: "Type", value: "alphanumeric", options: [["alphanumeric","Alfanumérico"],["numeric","Numérico"]],
      onChange: function(v){ set("type", v === "alphanumeric" ? null : v); } });

    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    var masked = kit.toggle(panel, { label: "Hidden Values", onChange: function(on){ set("masked", on); } });
    // A Visibility Action alterna Hidden Values dentro do componente → mantém o switch em sincronia
    p.addEventListener("cds-visibility-change", function(e){ masked.checked = e.detail.masked; });

    // Booleans do Figma: ligados por padrão → só escreve "false" quando desligados
    kit.section(panel, "Booleans");
    [["show-label","Show Label"],["show-required","Show Required"],["show-supporting-content","Show Supporting Content"],["show-trailing-item","Show Trailing Item"]]
      .forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ set(b[0], on ? null : "false"); } }); });

    // Show Separator por dígito
    var sepWrap = kit.el("div", { "class": "pg-ctrl" });
    sepWrap.appendChild(kit.el("span", { "class": "pg-lbl", text: "Show Separator — depois de qual dígito" }));
    var allNone = kit.el("div", { "class": "pg-seg", style: "margin-bottom:6px" });
    var bAll = kit.el("button", { type: "button", text: "Todos" }), bNone = kit.el("button", { type: "button", text: "Nenhum" });
    allNone.appendChild(bAll); allNone.appendChild(bNone); sepWrap.appendChild(allNone);
    chips = kit.el("div", { "class": "pg-chips", role: "group", "aria-label": "Separador depois do dígito" });
    sepWrap.appendChild(chips);
    kit.hint(sepWrap, "O último dígito nunca tem separador. Ex.: só o 3 agrupa 3 + 3.");
    panel.appendChild(sepWrap);

    function n(){ return parseInt(len.value, 10); }
    function applySeps(){
      sepOn = sepOn.filter(function(x){ return x < n(); }).sort(function(a, b){ return a - b; });
      set("separators", sepOn.length ? sepOn.join(",") : "none");
    }
    function buildSep(){
      chips.innerHTML = "";
      for (var pos = 1; pos < n(); pos++){
        var b = kit.el("button", { type: "button", "data-p": pos, text: String(pos), "aria-label": "Separador depois do dígito " + pos, "aria-pressed": String(sepOn.indexOf(pos) !== -1) });
        b.addEventListener("click", function(){
          var at = parseInt(this.dataset.p, 10), on = this.getAttribute("aria-pressed") !== "true";
          this.setAttribute("aria-pressed", String(on));
          sepOn = on ? sepOn.concat(at) : sepOn.filter(function(x){ return x !== at; });
          applySeps();
        });
        chips.appendChild(b);
      }
    }
    bAll.addEventListener("click", function(){ sepOn = []; for (var i = 1; i < n(); i++) sepOn.push(i); buildSep(); applySeps(); });
    bNone.addEventListener("click", function(){ sepOn = []; buildSep(); applySeps(); });

    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Código", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "Required Text", value: "(Obrigatório)", onInput: function(v){ p.setAttribute("required-text", v); } });
    kit.text(panel, { label: "Supporting Message (Neutral)", value: "Enviamos um código por SMS.", onInput: function(v){ set("supporting", v); } });
    kit.text(panel, { label: "Error Message (Warning)", value: "Código inválido. Tente de novo.", onInput: function(v){ set("error", v); } });
    kit.text(panel, { label: "Value (prefill)", placeholder: "ex.: A916GY", hint: "<code>Is Filled</code> deriva do valor real — não é controle.",
      onInput: function(v){ set("value", v); p.render(); readout(); } });

    // Nested instances — props das instâncias aninhadas, derivadas ao vivo do estado real
    kit.section(panel, "Nested instances");
    function stateOf(node){ return node.disabled ? "Disabled" : node.matches(":active") ? "Pressed" : node.matches(":hover") ? "Hovered" : "Enabled"; }
    var yes = function(b){ return b ? "True" : "False"; };
    var refreshers = [
      kit.nested(panel, {
        title: ".Value Box", exposed: true,
        note: "Uma por célula. No código as props derivam do container e da interação — escolha a célula para inspecionar.",
        items: function(){ return p.boxes.map(function(_, i){ return String(i + 1); }); },
        props: function(i){
          var box = p.boxes[i], inp = p.inputs[i];
          if (!box) return [];
          var active = box.matches(":focus-within"), filled = !!inp.value;
          return [
            ["State", box.matches(":active") ? "Pressed" : box.matches(":hover") ? "Hovered" : "Enabled"],
            ["Appearance", p.appearance === "warning" ? "Warning" : "Neutral"],
            ["Is Active", yes(active)],
            ["Hidden Value", yes(p.masked)],
            ["Is Filled", String(filled)],
            ["Value", filled ? (p.masked ? "•" : inp.value) : "—"],
            ["Show Separator", String(!!box.parentNode.querySelector(".cds-ci__sep"))],
            ["Show Caret", String(active && !filled)]
          ];
        }
      }),
      kit.nested(panel, {
        title: "Visibility Action · Icon Button", exposed: false,
        note: "Configuração fixa no componente; só o ícone e o estado mudam.",
        props: function(){
          var host = p.querySelector(".cds-ci__action"), b = host && host.button;
          if (!b) return [["Show Trailing Item", "false"]];
          return [
            ["Kind", "Ghost"], ["Appearance", "Neutral"], ["Size", "Small"],
            ["State", stateOf(b)], ["Show Notification", "false"],
            ["Icon", p.masked ? "hide-off-line" : "hide-line"]
          ];
        }
      })
    ];
    kit.watch(p, function(){ refreshers.forEach(function(f){ f(); }); });

    buildSep(); applySeps(); readout();
  }
});
