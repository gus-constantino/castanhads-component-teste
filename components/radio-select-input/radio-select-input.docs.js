/* Documentação — Select Input (escrita no Radio Select Input, o Select básico de escolha única)
   Fonte: [CastanhaDS] Component use documentation · página Text fields · seção 5074:492 · frame [Documentação] Select input (5074:530)
   A doc do Figma cobre a família inteira ("uma ou mais opções") e usa o set legado "Select Input" (remoto, 3863:22690:
   Style Neutral|Negative · State · IsFilled? · ShowLabel · ShowSupport text). No playground ela fica no radio-select-input.
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs.
   Oculto no Figma: Acessibilidade (só placeholder "Tópico 1 / Ordem de leitura") → tab com nota, sem conteúdo.
   Gaps: Anatomia B (Popover + Selection list abertos) não é mostrada; State Focused sem estado forçado no código;
   Diretrizes e Do/Don'ts são imagens no Figma (recriadas só com o campo, sem botões nem lista aberta).
   Setas 4 e 5 da anatomia trocaram de lado para não cruzar. Motion ainda é placeholder no Figma. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["radio-select-input"] = {
  tag: "cds-radio-select-input",
  base: { label: "Label", placeholder: "Placeholder", supporting: "Support text", error: "Support text", "show-lead-icon": false },
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=5074-492",
  // Capa (frame [Header] Select input, 5074:1128): mockup de tela de produto
  cover: { description: "O Select input permite que a pessoa usuária escolha uma ou mais opções a partir de uma lista pré-definida.", image: "assets/docs/covers/radio-select-input.png", alt: "Tela de Benefícios com o painel Filtrar aberto: o Select input Categoria mostra a lista de opções (Alimentação, Bem-estar, Cultura, Educação)." },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Select input permite que a pessoa usuária escolha uma ou mais opções a partir de uma lista pré-definida." },
      { h3: "Nomes alternativos comuns" },
      { p: "Dropdown, Select, Lista suspensa." },
      { h3: "Princípios" },
      { cards: [
        ["Clareza", "O componente deve comunicar de forma imediata quais opções estão disponíveis e qual valor está selecionado, evitando ambiguidades ou interpretações incorretas."],
        ["Previsibilidade", "O comportamento do Select input deve seguir padrões conhecidos, garantindo que a pessoa usuária saiba o que esperar ao interagir com o componente."],
        ["Eficiência", "A seleção deve exigir o mínimo de esforço possível, permitindo escolhas rápidas e reduzindo a necessidade de correções ou retrabalho."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Select input quando houver um conjunto conhecido e limitado de opções e quando for importante garantir padronização da resposta sem exigir digitação livre, seja para seleção única ou múltipla." },
      { h3: "Utilize para:" },
      { ul: ["Selecionar uma ou múltiplas opções entre valores pré-definidos", "Garantir consistência e validação de dados", "Reduzir esforço cognitivo em escolhas comuns"] },
      { h3: "Não utilize para:" },
      { ul: ["Listas muito longas sem agrupamento ou busca", "Entradas abertas ou valores personalizados", "Comparação direta entre muitas opções"] },
      { h3: "Select input vs Selection list / Selection list item" },
      { p: "O Select input é indicado quando é necessário economizar espaço e apresentar as opções apenas no momento da interação. Ao ser ativado, ele utiliza a Selection list internamente para exibir as opções disponíveis." },
      { p: "A Selection list e Selection list item, por sua vez, são mais adequadas quando as opções precisam estar sempre visíveis, facilitando leitura, comparação e tomada de decisão direta, sem depender de um campo de entrada." },
      { compare: [
        { title: "Este é um Select input", attrs: { label: "Destinatário", placeholder: "Selecione uma opção", "show-supporting-content": false } },
        { title: "Esta é uma Selection list", attrs: { _tag: "cds-selection-list", label: "Benefícios", _children: [
          { _tag: "cds-selection-list-item", label: "Plano odontológico", "show-description": false },
          { _tag: "cds-selection-list-item", label: "Vale-alimentação", "show-description": false },
          { _tag: "cds-selection-list-item", label: "Vale-transporte", "show-description": false },
          { _tag: "cds-selection-list-item", label: "Gympass", "show-description": false },
          { _tag: "cds-selection-list-item", label: "Psicologia Viva", "show-description": false }
        ] } }
      ] },
      { note: "No Figma, o Select input da comparação aparece aberto (Active), com a lista de opções; aqui ele aparece fechado. Abra a lista na tab Playground." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: {},
        markers: [
          { n: 1, target: ".cds-tf__label", side: "left" },
          { n: 2, target: ".cds-tf__control", side: "left" },
          { n: 3, target: ".cds-tf__msg", side: "bottom" },
          { n: 4, target: ".cds-tf__box", side: "right" },        // Figma: seta de baixo (Top) (CONFERIR)
          { n: 5, target: "cds-icon-button", side: "bottom" }   // Figma: Left (CONFERIR)
        ],
        legend: ["Title label", "Placeholder", "Support text", "Input container", "Dropdown icon button"]
      } },
      { p: "A. Enabled: Title label, Placeholder, Support text, Input container e Dropdown icon button." },
      { p: "B. Active: Popover (6) e Selection list (7)." },
      { note: "O estado Active (B), com o Popover e a Selection list abertos, não é mostrado na anatomia: abra a lista na tab Playground." },
      { h2: "Composição do componente" },
      { p: "O Select input é composto por um campo colapsado (trigger) e pela exibição da Selection list para apresentar as opções." },
      { p: "Quando o Select estiver no modo ativo (aberto), tanto o campo quanto os Selection list items devem refletir esse estado por meio de ajustes visuais e comportamentais consistentes — como foco, destaque da opção selecionada e feedback de interação — garantindo coerência entre os dois componentes." },
      { h2: "Propriedades" },
      { props: [
        { name: "Style", type: "Variant", values: ["Neutral", "Negative"] },
        { name: "State", type: "Variant", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is Filled?", type: "Boolean" },
        { name: "Show Label", type: "Boolean" },
        { name: "Label", type: "Text", values: ["Padrão: Label"] },
        { name: "Placeholder", type: "Text", values: ["Padrão: Placeholder"] },
        { name: "Show Support text", type: "Boolean" },
        { name: "Support text", type: "Text", values: ["Padrão: Support text"] }
      ] },
      { note: "No código, Style=Negative corresponde a appearance=\"warning\". Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Accent", items: [
        { label: "Enabled", attrs: {} },
        { label: "Hovered", attrs: { state: "hovered" } },
        { label: "Pressed", attrs: { state: "pressed" } },
        { label: "Actived", attrs: { "is-active": true } },
        { label: "Disabled", attrs: { disabled: true } },
        { label: "Negative enabled", attrs: { appearance: "warning" } },
        { label: "Negative actived", attrs: { appearance: "warning", "is-active": true } }
      ] } },
      { note: "O Figma também mostra o estado Focused, que o código não força para exibição: ele aparece ao focar o campo (mesmo visual de Actived). Nos estados Actived, a lista aberta não é mostrada." }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { note: "Sem conteúdo no Figma para esta seção." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Carteira correta para debitar a compra", placeholder: "Selecione uma opção", "show-supporting-content": false }, title: "Label e suporte",
          text: "Use labels claros e objetivos e complemente com support text apenas quando necessário para explicar regras, contexto ou consequências da escolha." },
        { attrs: { label: "Destinatário", placeholder: "Selecione uma opção", "show-supporting-content": false }, title: "Placeholder",
          text: "Utilize o placeholder como instrução inicial, não como substituto do label." }
      ] },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { label: "Destinatário", placeholder: "", "show-supporting-content": false, "is-active": true },
          text: "Mantenha a ordem lógica ou semântica da lista" },
        { kind: "dont", attrs: { label: "Selecione o país", placeholder: "", "show-supporting-content": false, "is-active": true },
          text: "Não use Select para listas excessivamente longas sem busca" }
      ] },
      { note: "No Figma, os exemplos de Diretrizes e Do's and Don'ts são imagens com a lista de opções aberta (e botões de ação nas diretrizes); aqui aparece só o campo." }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Select input no Figma ainda está com texto de exemplo (lorem ipsum e \"Especificação\"). A tabela de Motion Styles por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
