# Itens a conferir — Figma × código

**Regra (D40):** o código segue o Figma **como está hoje**, mesmo quando parece errado. Cada divergência com o esperado entra aqui. Quando o Figma for corrigido, ajusta-se o código e o item é marcado ✅ com a data.

Exceções à regra ficam marcadas **exceção** na coluna "No código", com o motivo. São só três tipos: decisão explícita do Gustavo, ausência de especificação (o Figma não define o comportamento) e adaptação para web aprovada.

Os itens ficam agrupados pelo **tipo de ajuste**. O número (C01, C02…) não muda quando o item troca de grupo.

| Tipo | Itens |
|---|---|
| [Ajuste de texto](#ajuste-de-texto) | 4 |
| [Ajuste de UI](#ajuste-de-ui) | 14 |
| [Motion](#motion) | 6 |
| [Refactor](#refactor) | 8 |
| [Naming](#naming) | 5 |
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
| C40 | Selection List Item · Is Active com interação | Hovered + Is Active volta a `Surface/01` (perde o Accent); Pressed + Is Active (Default) volta a `Surface/default` | Manter o fundo de selecionado (Accent) com hover/press por cima | Segue o Figma | Trocar as 4 regras de `[is-active]` em `selection-list-item.css` |
| C41 | Content List Item × Selection List Item · padding e stroke | Content List Item Kind=Default: Container pad `8 4`; o Selection List Item usa `8 16 8 24`. Card Pressed: stroke 2px no Content, 1px no Selection | Um padrão só na família de listas | Segue cada componente | Ajustar `content-list-item.css` ou `list-item.css` |
| C43 | Select Inputs · distância do Popover | Async: 8px abaixo do Text Box. Radio e Checkbox: 4px. Async creatable: sobrepõe 4px (y 68, box até 72). Multi: começa em y 40, cobrindo o Text Box | Uma distância só, sem cobrir o campo | **Exceção (a confirmar):** Async 8, Radio/Checkbox 4 como no Figma; Creatable e Multi em 4, porque sobrepor tapa o campo enquanto se digita | Ajustar `popoverGap` em cada membro |

## Motion

Reactions, durações e curvas.

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C01 | Text Fields da main (Text Input, Search, Text Area, Password, Quantity) | Reactions em 300ms com a curva `0.7, 0, 0.8, 1` em hover, press e click | Motion Styles por interação (`Hover In/01`, `Pressed/01`, `Selected In/01`), como no Credit Card e no OTP | Segue o Figma: `--tf-*` = `Duration/Medium/02` + `Easing/Systemic/accelerate` (`text-field.css`) | Trocar `--tf-*` na base para `--motion-hover/press/active-*` (o Credit Card já faz isso) |
| C16 | Credit Card · Icon Button aninhado | Hover em 300ms `EASE_OUT` (override no branch) | `Hover In/01` | **Exceção** (Gustavo corrige no Figma; a curva `EASE_OUT` não tem token): usa o motion do Icon Button da lib | Nada a mudar |
| C22 | Switch · motion | 300ms (`Duration/Medium/02`) | Gustavo vai ajustar | Segue o Figma | Trocar a duração em `switch.css` |
| C30 | .Close Toast | Tem os variants Hovered e Pressed, mas as reactions são só `ON_CLICK` (não há transição de hover) | Reactions de hover/press como no .Close Alert | Hover e Pressed por CSS (150ms · Systemic/accelerate), como os variants | Nada a mudar |
| C36 | Modal, Drawer, Bottom Sheet, Popover · motion | Sem reactions de entrada e saída | Motion de abrir/fechar (fade do Backdrop, slide do Drawer e do Sheet) | **Exceção** (sem especificação): abrem e fecham sem animação. Só o retorno do Sheet após arrastar usa `Duration/Medium/02` + `Systemic/accelerate` | Registrado; mantém sem animação (Gustavo, 02/10). Quando houver Motion Styles, aplicar em `overlay.css` e nos CSS de cada um |
| C42 | Select Inputs · hover e clique | Hover: 150ms `0.7,0,0.8,1` no Async, Creatable e Radio; **instantâneo** no Checkbox; **300ms** no Multi. Clique no Icon Button do Async: 150ms `EASE_OUT` (sem token). A família Text Fields usa 300ms (C01) | Motion Styles por interação, iguais nos cinco | Segue cada um (`select-field.css`, variáveis `--tf-hover-*`) | Trocar as variáveis em `select-field.css` |

## Refactor

Props, estrutura ou comportamento do componente (camada sem uso, prop sem efeito, regra que falta).

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C04 | Password Input · `Show Content` | Padrão `True` (senha visível) | Mascarado por padrão | **Exceção** (Gustavo, 02/10): mascarado; `show-content="true"` mostra | Se o Figma mudar o padrão para `False`, nada muda |
| C07 | Text Area · `Show Trailing Item` | Prop existe, sem elemento correspondente | Remover a prop ou definir o trailing | Segue o Figma: prop sem efeito | Implementar o trailing se ele for desenhado |
| C11 | Checkbox · Indeterminate | Sem reaction de clique | Definir o que o clique faz | **Exceção** (sem especificação): o clique vai para Selected, como no nativo. Deixar sem ação travaria o controle | Implementar a reaction que for desenhada |
| C29 | Confirmation Message | Só `Appearance` é prop; título, descrição e ícone (`placeholder-line`) são texto/instância fixos da amostra | Expor `Text Title`, `Text Description` e o ícone como props | Atributos `title`, `description` e `icon` (padrões do Figma) | Manter assim (Gustavo, 02/10). Se o Figma expuser as props com os mesmos nomes, nada muda |
| C31 | Banner · State=Disabled | `State Overlay` (Neutral/Opacity/Soft/intense) existe, oculto, sem prop nem variável que o ligue (o overlay só aparece em Hovered e Pressed) | Usar o overlay no Disabled ou removê-lo | Ignorado por enquanto: opacity medium, sem overlay | Verificar depois; se o overlay for usado, ativá-lo no Disabled em `banner.css` |
| C34 | Modal · largura | Componente FIXED em 320; a description pede "adapte ao conteúdo (320→512px)" | Definir se a largura é automática (pelo conteúdo) ou escolhida por quem usa | 320 por padrão; quem usa ajusta por `--cds-modal-width` (preso entre 272 e 512) | **Investigar** (Gustavo, 02/10: mantém o padrão de 320). Se o Figma ganhar prop de tamanho, trocar a variável por atributo em `modal.css` |
| C35 | Bottom Sheet · viewport | O Viewport Restriction cobre o sheet só com `Common/Is Desktop` (Desktop=true, Tablet=false); a description diz "não para desktop e tablet" | Restrição também no Tablet | Segue a variável: restrito só no desktop; no 744 o sheet aparece | Registrado; mantém o Figma (Gustavo, 02/10). Se o tablet entrar, incluir `tablet` na regra de `bottom-sheet.css` |
| C44 | Select Inputs · estados sem especificação | Não há estado vazio (sem resultado), carregando (Async), altura máxima da lista nem crescimento do Multi com muitos chips (no Figma o Chips Group de 320 transborda o Text Box de 48) | Desenhar vazio, carregando e o limite da lista | **Exceção** (sem especificação): "Nenhuma opção encontrada" em Caption/Text/medium; `aria-busy` no carregamento, sem spinner; lista até 320px com rolagem; o Multi cresce em linhas | Implementar o que for desenhado em `select-field.js/.css` |

## Naming

Nome de prop, variante, camada ou variável fora do padrão.

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C14 | Docs · `.Prop-type` | Variáveis `Commom/Colors/...` (com "m") | `Common/Colors/...` | Usa os tokens `Common/*` equivalentes (o código não tem a coleção `Commom`) | Nada a mudar |
| C17 | [Caju] Icons · naming | `Database`, `Code`, `Mouse` com maiúscula; `login`, `undo`, `redo`, `wallet`, `savings` sem `-line`; `stop-filled` × `play-fill`; `dark-mode-line` duplicado; frame "Guide & Maintanance" | Padrão `nome-line` / `nome-fill` em minúsculo | Arquivos em minúsculo (classe CSS); nomes como no Figma | Reimportar (ARCHITECTURE §8) |
| C24 | `.Motion Styles` · naming | Índice no meio: `Hover In/01/Timing` | A skill registra a decisão de levar o índice para o fim (`Hover In/Timing/01`) | Segue a main | Atualizar o snapshot e rodar `build-tokens` |
| C25 | Naming da lib (geral) | `showItem03`–`06` em minúsculo (Breadcrumb) · `Chechbox` (Selection List Item) · `State=Enable` (.Item do Breadcrumb e .Value Item) · `.Lead Item` × `.Lead item` · dois `.Header` e dois `.Item` com o mesmo nome · Filter button em minúsculo | Padrão do Índice de Propriedades | Implementar com o nome do Figma quando o componente entrar | Renomear junto |
| C39 | Naming (Lote 6) | Fixed Bar usa `Show Secondary Action`; o .Footer, `Show Secondary Action Button`. No Bottom Sheet as instâncias se chamam `Header`/`Footer` (sem ponto) | Um nome só | Os dois atributos com o nome do Figma | Registrado para conferir (Gustavo, 02/10). Renomear junto com C25 |

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
