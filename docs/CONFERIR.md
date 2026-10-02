# Itens a conferir — Figma × código

**Regra (D40):** o código segue o Figma **como está hoje**, mesmo quando parece errado. Cada divergência com o esperado entra aqui. Quando o Figma for corrigido, ajusta-se o código e o item é marcado ✅ com a data.

Exceções à regra ficam marcadas **exceção** na coluna "No código", com o motivo. São só três tipos: decisão explícita do Gustavo, ausência de especificação (o Figma não define o comportamento) e adaptação para web aprovada.

| # | Componente | No Figma hoje | Esperado / dúvida | No código | Quando corrigir no Figma |
|---|---|---|---|---|---|
| C01 | Text Fields da main (Text Input, Search, Text Area, Password, Quantity) | Reactions em 300ms com a curva `0.7, 0, 0.8, 1` em hover, press e click | Motion Styles por interação (`Hover In/01`, `Pressed/01`, `Selected In/01`), como no Credit Card e no OTP | Segue o Figma: `--tf-*` = `Duration/Medium/02` + `Easing/Systemic/accelerate` (`text-field.css`) | Trocar `--tf-*` na base para `--motion-hover/press/active-*` (o Credit Card já faz isso) |
| C02 | `.Text Content Mask` · CEP | Placeholder `0000-000` (e `0000-00` na instância do Text Input) | CEP tem 8 dígitos: `00000-000` | **Exceção** (Gustavo, 02/10): implementado o correto, `00000-000` | Nada a mudar no código; só conferir a mask no Figma |
| C03 | Text Input · Warning · Hovered | Text Box sem fill | Provavelmente `Surface/default` (o Quantity usa) | Segue o Figma: fundo transparente | Trocar `--_bg` do Warning hover em `text-field.css` |
| C04 | Password Input · `Show Content` | Padrão `True` (senha visível) | Mascarado por padrão | **Exceção** (Gustavo, 02/10): mascarado; `show-content="true"` mostra | Se o Figma mudar o padrão para `False`, nada muda |
| C05 | Família Text Fields · Label no Warning | Main: `Text/intense`. Branches Credit Card e OTP: `Feedback/Warning/semi-intense` | Um padrão só na família | Segue cada fonte (main × branch) | Alinhar em escala depois (Gustavo) e ajustar o CSS do Credit Card/OTP ou da base |
| C06 | `.Text Content Mask` · CNPJ New | Exemplo `12ABC6780001X5`, sem pontuação e com letra nos dígitos verificadores | Formato oficial do CNPJ alfanumérico (pontuação e DV numérico) | Segue o Figma: 14 letras/dígitos, sem pontuação | Trocar o padrão em `CDS.TextField.masks["cnpj-new"]` |
| C07 | Text Area · `Show Trailing Item` | Prop existe, sem elemento correspondente | Remover a prop ou definir o trailing | Segue o Figma: prop sem efeito | Implementar o trailing se ele for desenhado |
| C08 | Quantity · `Is Active` | Não muda o stroke do Text Box | Igual ao resto da família (`Border/semi-intense`) | Segue o Figma | Remover a regra de exceção em `quantity-input.css` |
| C09 | Drop Button · Default · Inversed · Pressed | Variante quebrada: sem fundo, padding 0, raio 0 | Pressed como o do Main Button | Segue o Figma (o botão "encolhe" no press) | Remover a última regra de `drop-button.css` |
| C10 | Filter button · Badge no Mobile | Pílula de 16px | Pela regra do Badge (Viewport), viraria ponto de 8px | Segue o Figma: Badge forçado em `viewport="desktop"` | Tirar o `viewport` em `filter-button.js` |
| C11 | Checkbox · Indeterminate | Sem reaction de clique | Definir o que o clique faz | **Exceção** (sem especificação): o clique vai para Selected, como no nativo. Deixar sem ação travaria o controle | Implementar a reaction que for desenhada |
| C12 | Doc do Credit Card · Estilos | Card "Is Active" usa `State=Disabled`; "Warning · Enabled" usa `State=Pressed` (frame 24931:8090) | Is Active e Enabled | Segue o Figma: specimens com as props do frame | Ajustar os dois `attrs` em `credit-card-input.docs.js` |
| C13 | Docs (Credit Card e OTP) · Motion | Ilustração de empty state como placeholder | Demo de motion | **Exceção** (adaptação para web): exemplo interativo | Se o Figma ganhar uma demo, nada muda |
| C14 | Docs · `.Prop-type` | Variáveis `Commom/Colors/...` (com "m") | `Common/Colors/...` | Usa os tokens `Common/*` equivalentes (o código não tem a coleção `Commom`) | Nada a mudar |
| C15 | Code Input OTP · borda em repouso | `Border/semi-soft` (~1,24:1) | Confirmar com a11y se as células vazias seguem visíveis | Segue o Figma | Trocar o token em `code-input-otp.css` |
| C16 | Credit Card · Icon Button aninhado | Hover em 300ms `EASE_OUT` (override no branch) | `Hover In/01` | **Exceção** (Gustavo corrige no Figma; a curva `EASE_OUT` não tem token): usa o motion do Icon Button da lib | Nada a mudar |
| C17 | [Caju] Icons · naming | `Database`, `Code`, `Mouse` com maiúscula; `login`, `undo`, `redo`, `wallet`, `savings` sem `-line`; `stop-filled` × `play-fill`; `dark-mode-line` duplicado; frame "Guide & Maintanance" | Padrão `nome-line` / `nome-fill` em minúsculo | Arquivos em minúsculo (classe CSS); nomes como no Figma | Reimportar (ARCHITECTURE §8) |
| C18 | Currency · Largest com valor oculto | "R$" em Heading/Small (38px); com valor, Title/Medium (36px) | Mesma altura nos dois | Segue o Figma | Ajustar o text style em `currency.css` |
| C19 | Botões · Disabled | Main/Drop/Filter usam `Opacity/light` (0.32); Icon Button usa `Opacity/medium` (0.4) | Um valor só | Segue o Figma | Trocar o token no componente que mudar |
| C20 | Main, Drop e Icon Button · Ghost Inversed Disabled | Texto/ícone em `Text/intense`/`Icons/intense` (escuro sobre escuro) | `Text/inversed` | Segue o Figma | Trocar a regra de Disabled Inversed nos três |
| C21 | Main, Drop e Icon Button · Neutral | Hover e Pressed diferentes nos três | Alinhar a família | Segue cada componente | Ajustar o CSS de cada um |
| C22 | Switch · motion | 300ms (`Duration/Medium/02`) | Gustavo vai ajustar | Segue o Figma | Trocar a duração em `switch.css` |
| C23 | Selection Controls e Chips · foco | Foco por teclado não desenhado (padrão global do DS) | Spec do foco global | **Exceção** (sem especificação): outline 2px `Support/system` | Trocar pelo padrão global quando existir |
| C24 | `.Motion Styles` · naming | Índice no meio: `Hover In/01/Timing` | A skill registra a decisão de levar o índice para o fim (`Hover In/Timing/01`) | Segue a main | Atualizar o snapshot e rodar `build-tokens` |
| C25 | Naming da lib (geral) | `showItem03`–`06` em minúsculo (Breadcrumb) · `Chechbox` (Selection List Item) · `State=Enable` (.Item do Breadcrumb e .Value Item) · `.Lead Item` × `.Lead item` · dois `.Header` e dois `.Item` com o mesmo nome · Filter button em minúsculo | Padrão do Índice de Propriedades | Implementar com o nome do Figma quando o componente entrar | Renomear junto |

## Como usar esta lista

- Ao implementar um componente e encontrar algo estranho no Figma: implementar como está e abrir um item aqui. Só depois registrar no ROADMAP, se a dúvida for de escopo.
- Ao corrigir no Figma: ajustar o código (a coluna "Quando corrigir" diz onde), marcar ✅ com a data e mover a linha para a seção Resolvidos.

## Resolvidos

| # | O que foi | Resolvido em |
|---|---|---|
| — | — | — |
