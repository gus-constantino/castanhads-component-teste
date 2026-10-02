/* Documentação — Credit Card Input
   Fonte: frame [Documentação] Credit Card Input · branch NHkGUvBfNMNTLnsxKtAmWa · node 24931:7981
   Só dados: o kit (scripts/docs-kit.js) monta as tabs. Specimens seguem o frame do Figma, inclusive as props trocadas (CONFERIR.md). Frames ocultos no Figma (Casos de exceção,
   Do's com lorem ipsum) ficaram de fora. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["credit-card-input"] = {
  tag: "cds-credit-card-input",
  base: { value: "1234567890123456", supporting: "Supporting Message", error: "Error Message" },
  source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/NHkGUvBfNMNTLnsxKtAmWa/-CastanhaDS--Components?node-id=24931-7981",
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Campo para inserir o número de um cartão de crédito. Exibe o número mascarado em grupos, com um ícone de cartão à esquerda, e faz parte da família de text fields — com label, mensagem de apoio e estado de erro." },
      { h3: "Nomes alternativos comuns" },
      { p: "card input, card number field, credit card field, campo de cartão, PAN field." },
      { h3: "Princípios" },
      { cards: [
        ["Número mascarado e agrupado", "Exibe o número em grupos (#### #### #### ####), facilitando a conferência e reduzindo erro de digitação."],
        ["Dado sensível", "O número do cartão é um dado sensível: exiba mascarado e, em um cartão salvo, mostre apenas os últimos dígitos."],
        ["Parte da família de inputs", "Herda label, obrigatoriedade, mensagem de apoio e estado de erro dos text fields, mantendo consistência com os demais campos do formulário."]
      ] },
      { h2: "Quando usar" },
      { p: "Utilize o Credit Card Input para capturar o número de um cartão em fluxos de pagamento, cadastro ou atualização de cartão — quando a entrada é um número de cartão (com máscara, agrupamento e bandeira), não texto ou número genérico." },
      { h3: "Utilize para:" },
      { ul: ["Informar o número do cartão num checkout / pagamento", "Cadastrar ou atualizar um cartão salvo", "Validar os dados de um cartão antes de concluir a transação"] },
      { h3: "Não utilize para:" },
      { ul: ["Validade ou CVV — use campos próprios", "Texto ou números genéricos — use o Text Input", "Senha ou PIN — use o Password Input ou o Code Input OTP"] },
      { h3: "Text Input vs Credit Card Input" },
      { p: "O Text Input recebe texto livre de comprimento variável. O Credit Card Input é especializado no número de cartão — máscara em grupos, bandeira e comprimento conhecido; use-o só para o número do cartão." },
      { compare: [
        { title: "Text Input", empty: "Text Input entra no Lote 4" },
        { title: "Credit Card Input", attrs: { label: "Número do cartão" } }
      ] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { label: "Número do cartão", "show-required": true },
        markers: [
          { n: 1, target: ".cds-tf__label", side: "left" },
          { n: 2, target: ".cds-tf__box", side: "left" },
          { n: 3, target: "cds-icon-button", side: "right" },
          { n: 4, target: ".cds-tf__msg", side: "bottom" }
        ],
        legend: ["Label", "Text Box — número mascarado e ícone de cartão", "Icon Button", "Supporting / Error message"]
      } },
      { h2: "Composição do componente" },
      { p: "O Credit Card Input é composto pelo Text Box com o número mascarado (`.Text Content Mask`), o Lead Icon (ícone de cartão padrão) à esquerda (opcional, via `Show Lead Icon`) e um Icon Button de apoio à direita (via `Show Trailing Item`), além das áreas de Label e mensagem de apoio/erro da família de inputs." },
      { h2: "Propriedades" },
      { props: [
        { name: "Lead Icon", type: "Swap component" },
        { name: "Icon Button", icon: "support-line", nested: [{ name: "Appearance", type: "Variant", values: ["Neutral", "Warning"] }] }
      ] },
      { note: "Todas as props (booleans, textos e variants) podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Estados do campo", items: [
        { label: "Enabled", attrs: { label: "Label" } },
        { label: "Hovered", attrs: { label: "Label", state: "hovered" } },
        { label: "Pressed", attrs: { label: "Label", state: "pressed" } },
        { label: "Is Active", attrs: { label: "Label", disabled: true } }
      ] } },
      { specimens: { title: "Appearance × State", items: [
        { label: "Neutral · Enabled", attrs: { label: "Label" } },
        { label: "Neutral · Disabled", attrs: { label: "Label", disabled: true } },
        { label: "Warning · Enabled", attrs: { label: "Label", appearance: "warning", state: "pressed" } },
        { label: "Warning · Disabled", attrs: { label: "Label", appearance: "warning", disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { h3: "Como é anunciado" },
      { ol: [
        "O campo é anunciado como um único controle de entrada de texto, com o rótulo do Label.",
        "O estado obrigatório é anunciado junto ao rótulo quando `Show Required` está ativo.",
        "A mensagem de apoio ou de erro é associada ao campo e lida após o rótulo.",
        "O Lead Icon da bandeira é decorativo: deve ser ignorado pelo leitor, a menos que a bandeira não esteja comunicada em texto.",
        "O estado desabilitado é anunciado como indisponível (`aria-disabled`) e fica fora da tabulação."
      ] },
      { h3: "Ordem de leitura" },
      { ol: ["Label do campo", "Indicador obrigatório, quando presente", "Campo de número do cartão (valor ou placeholder)", "Ícone de apoio (Icon Button), quando presente", "Mensagem de apoio ou de erro"] },
      { h2: "Contraste (WCAG)" },
      { ol: [
        "Texto (Label, valor, apoio): 8,2:1 a 17:1 — AA e AAA.",
        "Warning (#974602) sobre o fundo: 6,4:1 — AA.",
        "Placeholder (Text/soft #999): 2,78:1 — isento, texto de dica.",
        "Borda em interação (Active/Pressed): 8,2:1; repouso/hover < 3:1, herança da família.",
        "Estado desabilitado: isento do critério 1.4.3."
      ] }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Número do cartão", "show-required": false }, title: "Use só para número de cartão",
          text: "O Credit Card Input é para o número do cartão. Para validade ou CVV, use campos próprios; para texto ou números longos, o Text Input." },
        { attrs: { label: "Número do cartão", appearance: "warning" }, title: "Comunique o erro além da cor",
          text: "No número inválido, a borda Warning vem acompanhada da mensagem de erro; a cor sozinha não comunica a falha." },
        { attrs: { label: "Número do cartão", "show-required": false }, title: "Proteja o número do cartão",
          text: "Ao exibir um cartão já salvo, mostre apenas os últimos dígitos; não exponha o número completo nem registre o valor." }
      ] },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { label: "Número do cartão de crédito", "show-required": false, "show-supporting-content": false, "show-trailing-item": false },
          text: "Número de cartão mascarado em grupos (#### #### #### ####)." },
        { kind: "dont", attrs: { label: "Senha", supporting: "Digite sua senha", "show-trailing-item": false },
          text: "CPF, telefone ou texto livre — use o Text Input." },
        { kind: "do", attrs: { label: "Número do cartão de crédito", "show-required": false, supporting: "Mensagem de apoio", "show-trailing-item": false },
          text: "Utilize a mensagem de suporte e o Trailing Item para contextualizar o usuário." },
        { kind: "dont", attrs: { label: "CVV", "show-supporting-content": false }, style: "width:138px",
          text: "Validade ou CVV neste campo — use campos próprios." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "As transições de estado do campo usam os Motion Styles do Castanha (modo Normal)." },
      { display: { attrs: { label: "Número do cartão", "show-required": false, value: "" }, live: true } },
      { note: "Exemplo interativo: passe o mouse, pressione e foque o campo para ver cada transição." },
      { specs: [
        { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
        { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
        { title: "Pressed → Is Active", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/01`"]] }
      ] }
    ] }
  ]
};
