/* Documentação — Code Input OTP
   Fonte: frame [Documentação] Code Input OTP · branch PfeMbrThCwzwJFFo2GiAbW · node 24764:9893
   Só dados: o kit (scripts/docs-kit.js) monta as tabs. Acessibilidade está oculta no frame: a tab vem das annotations
   de Accessibility do set e do handoff de dev (Q26). Casos de exceção e Do's extras (ocultos) ficaram de fora. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["code-input-otp"] = {
  tag: "cds-code-input",
  base: { length: "6", supporting: "Supporting Message", error: "Error Message" },
  source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/PfeMbrThCwzwJFFo2GiAbW/-CastanhaDS--Components?node-id=24764-9893",
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Campo de código de verificação (OTP/PIN): uma fileira de células de um caractere, preenchidas uma a uma, para inserir um código curto recebido por SMS, e-mail ou app autenticador. Suporta de 3 a 6 dígitos, valores numéricos ou alfanuméricos, máscara opcional e estado de erro." },
      { h3: "Nomes alternativos comuns" },
      { p: "OTP input, PIN input, código de verificação, verification code, one-time code, código de confirmação." },
      { h3: "Princípios" },
      { cards: [
        ["Um caractere por célula", "Cada dígito tem sua célula; o foco avança sozinho ao digitar e volta ao apagar, tornando o preenchimento rápido e previsível."],
        ["Entrada curta e temporária", "É para códigos de uso único (3–6 caracteres), não para senhas longas nem texto livre."],
        ["Pronto para o autofill", "Integra com o preenchimento automático de código (SMS); colar distribui o código entre as células."]
      ] },
      { h2: "Quando usar" },
      { p: "Utilize o Code Input OTP para inserir um código de verificação curto e de uso único, quando ele chega por um canal externo (SMS, e-mail, app autenticador) e precisa ser digitado de volta." },
      { h3: "Utilize para:" },
      { ul: ["Confirmar login ou transação com código enviado por SMS/e-mail", "Validar um segundo fator (2FA/MFA)", "Inserir um PIN curto de ativação"] },
      { h3: "Não utilize para:" },
      { ul: ["Senhas — use o Password Input", "Texto livre ou números longos — use o Text Input", "Códigos longos (acima de 6 caracteres)"] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { label: "Código de autenticação", value: "483920", separators: "3" },
        markers: [
          { n: 1, target: ".cds-ci__label", side: "left" },
          { n: 2, target: ".cds-ci__boxes", side: "left" },
          { n: 3, target: "cds-icon-button", side: "right" },
          { n: 4, target: ".cds-ci__msg", side: "left" }
        ],
        legend: ["Label", "Value Boxes (células)", "Visibility Action", "Supporting / Error message"]
      } },
      { h2: "Composição do componente" },
      { p: "O Code Input OTP é composto por uma fileira de células `.Value Box` (3 a 6, uma por caractere) e uma Visibility Action (Icon Button Ghost) que mostra ou oculta o código, além das áreas de Label e mensagem de apoio/erro da família de inputs." },
      { h2: "Propriedades" },
      { props: [
        { name: "Value Box", type: "Variant" },
        { name: "Visibility Action", icon: "hide-line", nested: [{ name: "Appearance", type: "Variant", values: ["Neutral", "Warning"] }] }
      ] },
      { note: "Quantidade de células, tipo (numérico/alfanumérico), separadores e máscara podem ser testados na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Estados da célula", min: "160px", items: [
        { label: "Enabled", attrs: { length: "3", value: "A1b", "show-label": false, "show-supporting-content": false, "show-trailing-item": false } },
        { label: "Hovered", attrs: { length: "3", value: "A1b", state: "hovered", "show-label": false, "show-supporting-content": false, "show-trailing-item": false } },
        { label: "Pressed", attrs: { length: "3", value: "A1b", state: "pressed", "show-label": false, "show-supporting-content": false, "show-trailing-item": false } },
        { label: "Is Active", attrs: { length: "3", value: "A1b", "is-active": true, "show-label": false, "show-supporting-content": false, "show-trailing-item": false } }
      ] } },
      { note: "No Figma os estados são do `.Value Box` (uma célula). Aqui o estado forçado vale para todas as células de um campo de 3." },
      { specimens: { title: "Appearance × State", items: [
        { label: "Neutral · Enabled", attrs: { label: "Label", value: "1A2b3#" } },
        { label: "Neutral · Disabled", attrs: { label: "Label", value: "1A2b3#", disabled: true } },
        { label: "Warning · Enabled", attrs: { label: "Label", value: "1A2b3#", appearance: "warning" } },
        { label: "Warning · Disabled", attrs: { label: "Label", value: "1A2b3#", appearance: "warning", disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { h3: "Como é anunciado" },
      { ol: [
        "As células formam um grupo (`role=\"group\"`) com o rótulo do campo. ex.: Código de verificação.",
        "Cada célula é um campo de 1 caractere com nome de posição. ex.: dígito 1 de 6.",
        "No Warning, as células ficam com `aria-invalid` e a `Error Message` é associada por `aria-describedby`.",
        "A `Error Message` é anunciada por região dinâmica quando aparece.",
        "A Visibility Action é um toggle (`aria-pressed`): Mostrar código quando mascarado, Ocultar código quando visível.",
        "O estado desabilitado é anunciado como indisponível (`aria-disabled`) e todas as células saem da tabulação."
      ] },
      { h3: "Ordem de leitura" },
      { ol: ["Label do campo", "Indicador obrigatório, quando presente", "Células, da primeira à última", "Visibility Action, quando presente", "Mensagem de apoio ou de erro"] },
      { h2: "Teclado e preenchimento" },
      { ul: [
        "Digitar avança o foco para a próxima célula; Backspace volta.",
        "Setas, Home e End navegam entre as células.",
        "Colar distribui o código entre as células.",
        "Um único ponto de tabulação entra e sai do conjunto.",
        "A primeira célula tem `autocomplete=\"one-time-code\"`, para o autofill de SMS.",
        "No tipo numérico, `inputmode=\"numeric\"` abre o teclado de números.",
        "Foco visível segue o padrão global do Castanha; não é variant do componente."
      ] },
      { h2: "Contraste (WCAG)" },
      { ol: [
        "Dígito, Label e mensagem de apoio: 8,24:1 a 16,96:1 — AA e AAA.",
        "Warning (#974602) sobre o fundo: 6,41:1 — AA.",
        "Borda ativa (`Border/intense`): 16,96:1.",
        "Borda em repouso (`Border/semi-soft`) e hover (`Border/medium`): abaixo de 3:1. A célula se distingue pela fileira e pelo dígito.",
        "Erro comunicado por borda e texto, nunca só por cor (1.4.1).",
        "Estado desabilitado: isento do critério 1.4.3."
      ] },
      { note: "Fonte: annotations de Accessibility do set 24060:7228 e seção Acessibilidade do handoff de dev (`HANDOFF_CodeInputOTP_DEV.md`). A seção está oculta no frame de documentação do Figma." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Código de autenticação", "show-required": false, value: "483920", separators: "3" }, title: "Use só para códigos de verificação",
          text: "O Code Input é para códigos curtos de uso único. Para senhas, use o Password Input; para texto ou números longos, o Text Input." },
        { attrs: { label: "Código de autenticação", value: "482910", separators: "3", appearance: "warning" }, title: "Comunique o erro além da cor",
          text: "No código inválido, a borda Warning vem acompanhada da mensagem de erro; a cor sozinha não comunica a falha." },
        { attrs: { label: "Código de verificação", "show-required": false, value: "261548" }, title: "Defina a quantidade conforme o código",
          text: "Use o número de células igual ao tamanho do código (de 3 a 6). Células a mais ou a menos confundem quem digita." }
      ] },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { label: "Código de autenticação", "show-required": false, value: "904271", separators: "3" },
          text: "Código curto, numérico ou alfanumérico (ex.: 6 dígitos de SMS)." },
        { kind: "dont", attrs: { label: "Senha", value: "482913", masked: true },
          text: "Senha ou texto livre — use Password Input ou Text Input." },
        { kind: "do", attrs: { label: "Código de verificação", "show-required": false, value: "516203", separators: "3" },
          text: "Código de verificação curto (2FA, confirmação)." },
        { kind: "dont", attrs: { label: "CPF", value: "123456" },
          text: "CPF, telefone ou campo longo — use o Text Input." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "As transições de estado da célula usam os Motion Styles do Castanha (modo Normal)." },
      { display: { attrs: { label: "Código", "show-required": false }, live: true } },
      { note: "Exemplo interativo: passe o mouse, pressione e foque uma célula para ver cada transição." },
      { specs: [
        { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
        { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
        { title: "Pressed → Is Active", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/01`"]] }
      ] }
    ] }
  ]
};
