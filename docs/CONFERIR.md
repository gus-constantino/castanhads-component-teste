# Itens a conferir — Figma × código

**Regra (D40):** o código segue o Figma **como está hoje**, mesmo quando parece errado. Cada divergência com o esperado entra aqui. Quando o Figma for corrigido, ajusta-se o código e o item é marcado ✅ com a data.

Exceções à regra ficam marcadas **exceção** na coluna "No código", com o motivo. São só três tipos: decisão explícita do Gustavo, ausência de especificação (o Figma não define o comportamento) e adaptação para web aprovada.

Os itens ficam agrupados pelo **tipo de ajuste**. O número (C01, C02…) não muda quando o item troca de grupo.

| Tipo | Itens |
|---|---|
| [Ajuste de texto](#ajuste-de-texto) | 6 |
| [Ajuste de UI](#ajuste-de-ui) | 20 |
| [Motion](#motion) | 7 |
| [Refactor](#refactor) | 12 |
| [Naming](#naming) | 8 |
| [Acessibilidade](#acessibilidade) | 3 |
| [Documentação](#documentação) | 2 |

## Ajuste de texto

Copy, exemplos e descriptions no Figma. Não muda layout nem comportamento.

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C02 | `.Text Content Mask` · CEP | Placeholder `0000-000` (e `0000-00` na instância do Text Input) | CEP tem 8 dígitos: `00000-000` | **Exceção** (Gustavo, 02/10): implementado o correto, `00000-000` | Nada a mudar no código; só conferir a mask no Figma |
| C06 | `.Text Content Mask` · CNPJ New | Exemplo `12ABC6780001X5`, sem pontuação e com letra nos dígitos verificadores | Formato oficial do CNPJ alfanumérico (pontuação e DV numérico) | Segue o Figma: 14 letras/dígitos, sem pontuação | Trocar o padrão em `CDS.TextField.masks["cnpj-new"]` |
| C33 | Popover · description | O texto da description começa com uma resposta de chat colada ("Com certeza! Seguindo o mesmo formato conciso…") | Description só com o conteúdo do componente | Nada no código (a doc do playground não usa esse texto) | Ajustar a description no Figma (Gustavo, 02/10: anotado para ajustar) |
| C45 | Checkbox Select Input · texto preenchido | Placeholder da amostra: `$nn Selecionados` (S maiúsculo, sem singular) | Definir o texto: plural/singular e caixa | `{n} Selecionados`, e `1 Selecionado` no singular (atributo `count-text` troca o modelo) | Ajustar o padrão em `checkbox-select-input.js` |
| C47 | Pagination · ordem do texto da direita | Camadas na ordem `[n▾] páginas de 100`; a description também cita um bug de hover "somente Figma" | Provavelmente `Página [n▾] de 100` | Segue a ordem do Figma | Reordenar em `pagination.js` (build) |
| C57 | Date Input · Character Counter e máscara | `Show Character Counter` ligado com o texto `-0000`; Mask=Date com placeholder `dd/mm/aaaa`, enquanto o Text Input usa `00/00/0000` para a mesma máscara | Desligar o contador (não há limite) e um placeholder só para Date | Segue o Figma: contador "-0000" e `dd/mm/aaaa` no Date Input | **Débito** (Gustavo, 02/10): remover o Character Counter do Date Input no Figma; aí desligar o padrão em `date-input.js` (`updateCounter`). A máscara `dd/mm/aaaa` × `00/00/0000` segue para alinhar |

## Ajuste de UI

Cor, fill, borda, tamanho ou layout de uma variante.

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C03 | Text Input · Warning · Hovered | Text Box sem fill | Provavelmente `Surface/default` (o Quantity usa) | Segue o Figma: fundo transparente | Trocar `--_bg` do Warning hover em `text-field.css` |
| C05 | Família Text Fields · Label no Warning | Main: `Text/intense`. Branches Credit Card e OTP: `Feedback/Warning/semi-intense` | Um padrão só na família | Segue cada fonte (main × branch) | Alinhar em escala depois (Gustavo) e ajustar o CSS do Credit Card/OTP ou da base |
| C08 | Quantity · `Is Active` | Não muda o stroke do Text Box | Igual ao resto da família (`Border/semi-intense`) | Segue o Figma | Remover a regra de exceção em `quantity-input.css` |
| C09 | Drop Button · Default · Inversed · Pressed | Variante quebrada: sem fundo, padding 0, raio 0 | Pressed como o do Main Button | Segue o Figma (o botão "encolhe" no press) | Remover a última regra de `drop-button.css` |
| C10 | Filter button · Badge no Mobile | Pílula de 16px | Pela regra do Badge (Viewport), viraria ponto de 8px | Segue o Figma: Badge forçado em `viewport="desktop"` | Tirar o `viewport` em `filter-button.js` |
| C18 | Currency · Largest com valor oculto | "R$" em Heading/Small (38px); com valor, Title/Medium (36px) | Mesma altura nos dois | Segue o Figma | Ajustar o text style em `currency.css` |
| C19 | Botões · Disabled | Main/Drop/Filter usam `Opacity/light` (0.32); Icon Button usa `Opacity/medium` (0.4) | Um valor só | Segue o Figma | Trocar o token no componente que mudar |
| C20 | Main, Drop e Icon Button · Ghost Inversed Disabled | Texto/ícone em `Text/intense`/`Icons/intense` (escuro sobre escuro) | `Text/inversed` | Segue o Figma | Trocar a regra de Disabled Inversed nos três |
| C21 | Main, Drop e Icon Button · Neutral | Hover e Pressed diferentes nos três | Alinhar a família | Segue cada componente | Ajustar o CSS de cada um |
| C27 | Banner · Kind=Illustration | `.Content Banner` (127 de altura) dentro de um Container fixo de 122: o texto transborda 5px para cima | Container acompanhar o conteúdo | Segue o Figma: linha com 122px e conteúdo alinhado embaixo | Registrado; **não alterar por enquanto** (Gustavo, 02/10). Depois: trocar `height:122px` por `min-height` em `banner.css` |
| C28 | Toast · Mobile | Frame `Toast mobile` sem raio, sobre todos os elementos da tela; Description em frame fixo de 44px (2 linhas de Caption dão 42) | Decisão da liderança (o toast fica por cima de tudo no mobile); não é o ideal, verificar depois | Segue o Figma: sem raio no mobile; texto com a altura natural (42) | Rever com a liderança; se mudar, ajustar o raio e o posicionamento em `toast.css` |
| C40 | Selection List Item · Is Active com interação | Hovered + Is Active volta a `Surface/01` (perde o Accent); Pressed + Is Active (Default) volta a `Surface/default` | Manter o fundo de selecionado (Accent) com hover/press por cima | Segue o Figma | Mantém como o Figma (Gustavo, 02/10). Se mudar, trocar as 4 regras de `[is-active]` em `selection-list-item.css` |
| C43 | Select Inputs · distância do Popover | Async: 8px abaixo do Text Box. Radio e Checkbox: 4px. Async creatable: sobrepõe 4px (y 68, box até 72). Multi: começa em y 40, cobrindo o Text Box | Uma distância só, sem cobrir o campo | **Exceção (a confirmar):** Async 8, Radio/Checkbox 4 como no Figma; Creatable e Multi em 4, porque sobrepor tapa o campo enquanto se digita | Ajustar `popoverGap` em cada membro |
| C46 | Nav Control · Tablet | `Mobile` visível com `Common/Is Mobile`, `Desktop` com `Common/Is Desktop`; no modo Tablet os dois são falsos e nada aparece | Mostrar uma das versões no Tablet | Segue o Figma: no 744 o componente some (`nav-control.css`) | Trocar a regra `[data-viewport="tablet"]` pela versão escolhida |
| C48 | Breadcrumb · largura | Frame fixo de 434; os itens somam 423 (48 + 5×75) | Hug no conteúdo | Hug (423), como os itens | Nada a mudar se o frame virar Hug |
| C49 | Tab View · Disabled | Container com `Opacity/medium` (0.4); as outras famílias usam `Opacity/light` (ver C19) | Um valor só | Segue o Figma | Trocar em `tab-view.css` |
| C62 | Table · hover | Cada `.Data Cell` tem seu Hovered (Surface/01), porque a tabela é montada por colunas | Hover da linha inteira | **Exceção** (adaptação para web): o hover é da linha (`tr:hover`), com o mesmo Surface/01 | Nada a mudar se o Figma assumir hover por linha |
| C63 | .Lead item (File) · ícone do hover | Kind=View file mostra `hide-line` (olho cortado) no Hovered/Pressed | Ícone de ver (olho aberto) | Segue o Figma: `hide-line` | Trocar o ícone em `file-lead-item.js` |
| C64 | Upload Item · espaçamentos | Uploading: gap 6 entre o nome e a Progress Line (sem token); pad vertical 8 em Uploading/Success e 0 em Error/Uploaded | Tokens e um padding só | Segue o Figma (6px literal) | Ajustar `upload-item.css` |
| C65 | Dropzone · estados | Disabled só muda a borda para Border/semi-intense (igual à versão Mobile Enabled), sem opacidade e com o Main Button Enabled; Desktop não tem Hovered nem Pressed; borda dash 4-4 | Disabled distinguível; hover/press no Desktop | Segue o Figma; a borda usa `dashed` do CSS (o traço não fica exatamente 4-4) | Ajustar `dropzone.css` |

## Motion

Reactions, durações e curvas.

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C01 | Text Fields da main (Text Input, Search, Text Area, Password, Quantity) | Reactions em 300ms com a curva `0.7, 0, 0.8, 1` em hover, press e click | Motion Styles por interação (`Hover In/01`, `Pressed/01`, `Selected In/01`), como no Credit Card e no OTP | Segue o Figma: `--tf-*` = `Duration/Medium/02` + `Easing/Systemic/accelerate` (`text-field.css`) | Trocar `--tf-*` na base para `--motion-hover/press/active-*` (o Credit Card já faz isso) |
| C16 | Credit Card · Icon Button aninhado | Hover em 300ms `EASE_OUT` (override no branch) | `Hover In/01` | **Exceção** (Gustavo corrige no Figma; a curva `EASE_OUT` não tem token): usa o motion do Icon Button da lib | Nada a mudar |
| C22 | Switch · motion | 300ms (`Duration/Medium/02`) | Gustavo vai ajustar | Segue o Figma | Trocar a duração em `switch.css` |
| C30 | .Close Toast | Tem os variants Hovered e Pressed, mas as reactions são só `ON_CLICK` (não há transição de hover) | Reactions de hover/press como no .Close Alert | Hover e Pressed por CSS (150ms · Systemic/accelerate), como os variants | Nada a mudar |
| C36 | Modal, Drawer, Bottom Sheet, Popover · motion | Sem reactions de entrada e saída | Motion de abrir/fechar (fade do Backdrop, slide do Drawer e do Sheet) | **Exceção** (sem especificação): abrem e fecham sem animação. Só o retorno do Sheet após arrastar usa `Duration/Medium/02` + `Systemic/accelerate` | Registrado; mantém sem animação (Gustavo, 02/10). Quando houver Motion Styles, aplicar em `overlay.css` e nos CSS de cada um |
| C42 | Select Inputs · hover e clique | Hover: 150ms `0.7,0,0.8,1` no Async, Creatable e Radio; **instantâneo** no Checkbox; **300ms** no Multi. Clique no Icon Button do Async: 150ms `EASE_OUT` (sem token). A família Text Fields usa 300ms (C01) | Motion Styles por interação, iguais nos cinco | Segue cada um (`select-field.css`, variáveis `--tf-hover-*`) | Mantém como o Figma; **validar e ajustar** (Gustavo, 02/10). Trocar as variáveis em `select-field.css` |
| C50 | Tabs (.Item) · motion | Hover e press instantâneos; o clique troca o Active em 300ms `0.7,0,0.8,1` (só no Scrollable Tab; o Fixed Tab não tem reaction de clique no Item 1) | Motion Styles por interação, iguais nos dois | Hover/press sem transição; sublinhado em 300ms + `Systemic/accelerate` nos dois | Trocar em `tab-item.css` |

## Refactor

Props, estrutura ou comportamento do componente (camada sem uso, prop sem efeito, regra que falta).

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C04 | Password Input · `Show Content` | Padrão `True` (senha visível) | Mascarado por padrão | **Exceção** (Gustavo, 02/10): mascarado; `show-content="true"` mostra | Se o Figma mudar o padrão para `False`, nada muda |
| C07 | Text Area · `Show Trailing Item` | Prop existe, sem elemento correspondente | Remover a prop ou definir o trailing | Segue o Figma: prop sem efeito | Implementar o trailing se ele for desenhado |
| C11 | Checkbox · Indeterminate | Sem reaction de clique | Definir o que o clique faz | **Exceção** (sem especificação): o clique vai para Selected, como no nativo. Deixar sem ação travaria o controle | Implementar a reaction que for desenhada |
| C29 | Confirmation Message | Só `Appearance` é prop; título, descrição e ícone (`placeholder-line`) são texto/instância fixos da amostra | Expor `Text Title`, `Text Description` e o ícone como props | Atributos `title`, `description` e `icon` (padrões do Figma) | Manter assim (Gustavo, 02/10). Se o Figma expuser as props com os mesmos nomes, nada muda |
| C31 | Banner · State=Disabled | `State Overlay` (Neutral/Opacity/Soft/intense) existe, oculto, sem prop nem variável que o ligue (o overlay só aparece em Hovered e Pressed) | Usar o overlay no Disabled ou removê-lo | Ignorado por enquanto: opacity medium, sem overlay | Verificar depois; se o overlay for usado, ativá-lo no Disabled em `banner.css` |
| C35 | Bottom Sheet · viewport | O Viewport Restriction cobre o sheet só com `Common/Is Desktop` (Desktop=true, Tablet=false); a description diz "não para desktop e tablet" | Restrição também no Tablet | Segue a variável: restrito só no desktop; no 744 o sheet aparece | Registrado; mantém o Figma (Gustavo, 02/10). Se o tablet entrar, incluir `tablet` na regra de `bottom-sheet.css` |
| C44 | Select Inputs · estados sem especificação | Não há estado vazio (sem resultado), carregando (Async), altura máxima da lista nem crescimento do Multi com muitos chips (no Figma o Chips Group de 320 transborda o Text Box de 48) | Desenhar vazio, carregando e o limite da lista | **Exceção** (sem especificação): "Nenhuma opção encontrada" em Caption/Text/medium; `aria-busy` no carregamento, sem spinner; lista até 320px com rolagem; o Multi cresce em linhas | Implementar o que for desenhado em `select-field.js/.css` |
| C51 | Breadcrumb · conteúdo e semântica | O Item 1 é sempre Truncate (…); **Is Active** está ligado no Item 2 e no Item 6 da amostra, sem regra clara; o Popover (Show Popover) está vazio | Definir o que Is Active significa (página atual?) e o que o Popover lista | **Exceção** (sem especificação): a amostra repete o Figma; com links, o último nível é a página atual (`aria-current`, Is Active) e o Popover lista os níveis escondidos (`collapse`) | Ajustar `breadcrumb.js` (`model()`) |
| C52 | Pagination · limites | Sem estado das setas na primeira e na última página | Desabilitar nos limites | **Exceção** (sem especificação): ‹ desabilitado na página 1 e › na última | Implementar o que for desenhado em `pagination.js` |
| C59 | Date Picker · comportamento | Sem especificação de: intervalo × data única (o componente não tem a prop), clique antes do início do intervalo, limites (min/max), teclado e anos do Year Selector (a lista começa em 1950) | Definir no Figma | **Exceção** (sem especificação): `mode` single/range; clique antes do início inverte; `min`/`max` desabilitam dias (Disabled); grade do WAI-ARIA com setas/PageUp/PageDown; anos de 1950 até o ano atual + 10 | Mantém assim (Gustavo, 02/10); ele vê depois como verificar. Ajustar `date-picker.js` se algo mudar |
| C61 | Table · estrutura | Montada por colunas (`.Table Column` com `.Head` + `.Data Cell` no Slot) | Uma tabela por linhas para leitor de tela e teclado | **Exceção** (adaptação para web): `<table>` com `<th scope=col>` e `<td>`; as colunas viram `.columns` e as linhas `.rows` | Nada a mudar no Figma (é a forma de desenhar) |
| C66 | Table · comportamento | Sem especificação de ciclo de ordenação, alcance do checkbox do cabeçalho, paginação dos dados e estado vazio sem erro (o Empty só tem a mensagem de falha) | Definir | **Exceção** (sem especificação): Default → Up → Down → Default com `aria-sort`; o cabeçalho marca a página visível (indeterminado quando parcial); paginação no cliente; Empty com `empty-text` editável | Ajustar `table.js` |

## Naming

Nome de prop, variante, camada ou variável fora do padrão.

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C14 | Docs · `.Prop-type` | Variáveis `Commom/Colors/...` (com "m") | `Common/Colors/...` | Usa os tokens `Common/*` equivalentes (o código não tem a coleção `Commom`) | Nada a mudar |
| C17 | [Caju] Icons · naming | `Database`, `Code`, `Mouse` com maiúscula; `login`, `undo`, `redo`, `wallet`, `savings` sem `-line`; `stop-filled` × `play-fill`; `dark-mode-line` duplicado; frame "Guide & Maintanance" | Padrão `nome-line` / `nome-fill` em minúsculo | Arquivos em minúsculo (classe CSS); nomes como no Figma | Reimportar (ARCHITECTURE §8) |
| C24 | `.Motion Styles` · naming | Índice no meio: `Hover In/01/Timing` | A skill registra a decisão de levar o índice para o fim (`Hover In/Timing/01`) | Segue a main | Atualizar o snapshot e rodar `build-tokens` |
| C25 | Naming da lib (geral) | `showItem03`–`06` em minúsculo (Breadcrumb) · `Chechbox` (Selection List Item) · `State=Enable` (.Item do Breadcrumb e .Value Item) · `.Lead Item` × `.Lead item` · dois `.Header` e dois `.Item` com o mesmo nome · Filter button em minúsculo | Padrão do Índice de Propriedades | Implementar com o nome do Figma quando o componente entrar | Renomear junto |
| C39 | Naming (Lote 6) | Fixed Bar usa `Show Secondary Action`; o .Footer, `Show Secondary Action Button`. No Bottom Sheet as instâncias se chamam `Header`/`Footer` (sem ponto) | Um nome só | Os dois atributos com o nome do Figma | Registrado para conferir (Gustavo, 02/10). Renomear junto com C25 |
| C53 | Naming (Lote 7) | `Show Itens per page` / `Nav Itens` (mistura de "Itens" com inglês) · `.Item` usado por Breadcrumb e Tabs (dois sets com o mesmo nome, C25) · `State=Enable` no .Item do Breadcrumb | Padrão do Índice de Propriedades | Atributos em inglês e kebab-case (`show-items-per-page`) | Renomear junto com C25 |
| C54 | Naming (Lote 8) | Content List `Intent=Switch` usa itens `Intent=Transaction` (não há switch) | Nomes que descrevem o conteúdo | `intent="switch"` gera itens `transaction` | Renomear junto com C25 |
| C67 | Naming (Tables e File Upload) | `.Table Column` Kind `Default`/`Percentual`/`Icon Buttons` × `.Data Cell` Kind `Text`/`Percentage`/`Action Controls`; slot `Upload itens`; terceiro `.Lead item` (File) | Um nome por conceito | `kind` aceita os dois nomes (default = text, percentual = percentage, icon-buttons = actions) | Renomear junto com C25 |

## Acessibilidade

Contraste, foco e estados que não se distinguem.

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C15 | Code Input OTP · borda em repouso | `Border/semi-soft` (~1,24:1) | Confirmar com a11y se as células vazias seguem visíveis | Segue o Figma | Trocar o token em `code-input-otp.css` |
| C23 | Selection Controls e Chips · foco | Foco por teclado não desenhado (padrão global do DS) | Spec do foco global | **Exceção** (sem especificação): outline 2px `Support/system` | Trocar pelo padrão global quando existir |
| C32 | Balance Card · Hovered · **a11y** | Só o Label muda (`Text/medium` → `Text/intense`); fundo e borda iguais | **Problema de acessibilidade a corrigir:** o estado de hover quase não se distingue (só um tom de texto), e o card não tem estado de foco desenhado (o código usa o outline provisório de C23) | Segue o Figma | Corrigir no Figma (hover com mudança perceptível de fundo ou borda, além da cor) e ajustar `balance-card.css` |

## Documentação

Frames de documentação no Figma.

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C12 | Doc do Credit Card · Estilos | Card "Is Active" usa `State=Disabled`; "Warning · Enabled" usa `State=Pressed` (frame 24931:8090) | Is Active e Enabled | Segue o Figma: specimens com as props do frame | Ajustar os dois `attrs` em `credit-card-input.docs.js` |
| C13 | Docs (Credit Card e OTP) · Motion | Ilustração de empty state como placeholder | Demo de motion | **Exceção** (adaptação para web): exemplo interativo | Se o Figma ganhar uma demo, nada muda |

## Como usar esta lista

- Ao implementar um componente e encontrar algo estranho no Figma: implementar como está e abrir um item no grupo do tipo de ajuste. Só depois registrar no ROADMAP, se a dúvida for de escopo.
- Ao corrigir no Figma: ajustar o código (a coluna "Quando corrigir" diz onde), marcar ✅ com a data e mover a linha para a seção Resolvidos.

## Resolvidos

| # | O que foi | Resolvido em |
|---|---|---|
| C26 | .Content Banner Inversed: o ícone do CTA já é `Icons/inversed` (override de cor na instância); a leitura inicial olhou só a prop. Código corrigido | 02/10 |
| C37 | Modal · divisores: o padrão é desligado e quem usa liga só se precisar (Gustavo). O Modal ganhou `show-header-divider` e `show-footer-divider`, desligados por padrão | 02/10 |
| C38 | Drawer · Backdrop e fechamento: usa Backdrop (no protótipo ele entra como outro asset ao lado) e **sempre** fecha ao clicar fora ou no Esc (Gustavo). O Drawer ignora `dismissible` | 02/10 |
| C41 | Content List Item × Selection List Item: padding diferente (`8 4` × `8 16 8 24`) e stroke do Card Pressed (2px × 1px) são intencionais, parte do visual e da compensação de espaços (Gustavo). Código já segue o Figma | 02/10 |
| C55 | .Transaction Status Icon: building block sem uso, removido do Figma (Gustavo) e do código | 02/10 |
| C34 | Modal · largura: não há limite, o Modal abraça o conteúdo (Gustavo, resposta no C58). Código: `width: fit-content`, min 272; `--cds-modal-width` fixa quando preciso | 02/10 |
| C56 | Date Picker · datas da amostra: eram ilustrativas do protótipo; o componente segue funcional (seleção pelo clique, bloco só com seleção) (Gustavo) | 02/10 |
| C58 | Modal Date Picker · largura: resolvido com o Modal abraçando o conteúdo (320 Single, 620 Double) | 02/10 |
| C60 | Naming · `.Navigation Control` do Datepicker × Nav Control: são building blocks de grupos diferentes, sem problema (Gustavo) | 02/10 |
