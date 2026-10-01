# Roadmap — todos os componentes do Castanha DS no playground

> Documento vivo. Atualizar ao fim de cada lote: o que entrou, decisões novas, dúvidas resolvidas e aprendizados.
> Última atualização: 01/10/2026.

---

## 1. Fontes

| Lib | File key | O que vem dela |
|---|---|---|
| `[CastanhaDS] Components` (estável) | `LKZBwmlb7fIbDKdGrMncuA` | Componentes, building blocks (página `.Building Blocks`, node `2270:89`), collection **Brand Style** (`Common/*`), `.Text Styles`, `.Motion Styles`, **Viewport** |
| `[Caju] Icons` | `vi4CKuAe98zydoLAQXoibU` | 274 ícones 24×24 (página `UI & Caju`): 245 `-line`, 5 `-fill`, 24 sem sufixo. Página `Brands & Logos` à parte |
| `[Caju] Illustrations` | `9l54k2iyKGMaiIbsGGmEiM` | 237 ilustrações 200×200 (página `Caju UI`), mais as páginas `Hero` e `Cartões` |
| `[Caju] Theme` | `Zx9KwwRFqZrOfeuXpYZiTx` | Collection **Caju Beneficios** (Light/Dark, 226 variáveis): a origem dos valores que o `Common/*` referencia |

Branches já usadas: `PfeMbrThCwzwJFFo2GiAbW` (Code Input OTP) e `NHkGUvBfNMNTLnsxKtAmWa` (Credit Card Input). **Nenhum dos dois está na main ainda.**

Documentação publicada: zeroheight `castanha.caju.com.br/858426090` (MCP read-only). Protocolo: skill `castanhads-juntos`.

---

## 2. Inventário da lib estável (main)

**30 páginas de componentes · 80 sets/componentes publicados · 28 building blocks · 1 utility.**
Coluna *Usa*: instâncias aninhadas na 1ª variante (ícones omitidos).

### Fundação visual
| Página | Componente | Node | Var. | Usa |
|---|---|---|---:|---|
| Images | Icon | `2261:1126` | 21 | — |
| Images | Shaped Icon | `2272:146` | 28 | — |
| Images | Image | `2273:320` | 3 | — |
| Images | Avatar | `2278:92` | 15 | — |
| Images | Caju Brand | `11271:154` | 5 | — |
| Flags | .Credit Card Flags | `4934:771` | 4 | — |
| Dividers | Divider | `4931:207` | 12 | — |
| Loaders | Spinner | `4333:3181` | 36 | — |
| Status | Tag | `4475:114` | 7 | Icon |
| Status | Badge | `4835:1472` | 2 | — |
| Status | Status Dot | `21745:69` | 15 | — |
| Progress Indicators | Progress Line | `2322:4006` | 11 | — |
| Content | Currency | `5301:2173` | 16 | — |
| Content | Link | `4926:213` | 12 | — |
| Content | .Text Content | `5516:10455` | 2 | — |

### Ações
| Página | Componente | Node | Var. | Usa |
|---|---|---|---:|---|
| Buttons | Main Button | `4464:427` | 48 | Icon |
| Buttons | Icon Button | `4464:636` | 48 | Badge |
| Buttons | Drop Button | `6955:6985` | 96 | — |
| Buttons | Filter button | `5099:5389` | 8 | .Icons |

### Selection Controls
| Componente | Node | Var. | Usa |
|---|---|---:|---|
| Checkbox / Checkbox Group | `4123:2560` / `4132:1511` | 12 / 1 | — / Checkbox |
| Radio Button / Group | `4429:10437` / `4429:11192` | 8 / 1 | — / Radio |
| Switch / Group | `4895:809` / `4895:1233` | 8 / 1 | — / Switch |
| Input Chips | `12365:2728` (o duplicado `14120:5313` foi removido — Q5) | 4 | — |
| Filter Chips | `12365:2744` | 8 | — |
| Chips Group | `12457:3664` | 4 | Filter Chips |

### Text Fields (família)
| Componente | Node | Var. | Usa |
|---|---|---:|---|
| Text Input | `5743:325` | 32 | .Text Content Mask |
| Search Input | `14880:3404` | 32 | .Text Content Mask |
| Text Area Input | `10110:3028` | 32 | — |
| Password Input | `5798:2677` | 64 | Icon Button |
| [Beta] Quantity Input | `22756:7351` | 32 | Icon Button |
| Async Select Input | `11030:7644` | 32 | .Text Content Mask + Icon Button |
| Radio Select Input | `11143:3056` | 32 | idem |
| Checkbox Select Input | `11143:4833` | 32 | idem |
| Async creatable Select Input | `11018:5694` | 32 | idem |
| Multi Select Input | `13795:4984` | 32 | idem |
| *Credit Card Input* (branch) | `24614:7155` | 32 | .Text Content Mask + Icon Button — ✅ no playground |
| *Code Input OTP* (branch) | `24060:7228` | 16 | .Value Box + Icon Button — ✅ no playground |

### Feedback e conteúdo
| Página | Componente | Node | Var. | Usa |
|---|---|---|---:|---|
| Feedback | Toast | `5234:516` | 2 | .Close Toast |
| Feedback | Alert | `11864:12559` | 3 | Shaped Icon + .Close Alert |
| Feedback | System Banner | `18432:2090` | 3 | Shaped Icon + .Close Alert |
| Content | Confirmation Message | `16359:1803` | 3 | Shaped Icon |
| Content | Topic | `15621:1175` | 2 | .Lead item + Shaped Icon |
| Tooltips | Tooltip | `11211:416` | 1 | — |
| Banner | Banner | `20051:15726` | 8 | .Content Banner + Icon |
| Actions | Balance Card | `17881:1707` | 4 | Tag + Currency |

### Containers e overlays
| Componente | Node | Var. | Usa |
|---|---|---:|---|
| Card | `5256:540` | 2 | Slot |
| Backdrop | `13784:3271` | 1 | — |
| Popover | `2270:102` | 1 | Slot |
| Modal | `16362:3267` | 1 | .Header + Icon Button + .Footer + Main Button |
| Drawer | `16456:4381` | 1 | Icon Button + Main Button + Viewport Restriction |
| Bottom Sheet [MOBILE ONLY] | `20848:2679` | 1 | .Header + .Footer + Main Button + Viewport Restriction |
| [Beta] Fixed Bar | `24037:2929` | 2 | Divider + Main Button |
| Viewport Restriction (Utilities) | `5357:3899` | 1 | — |

### Navegação
| Componente | Node | Var. | Usa |
|---|---|---:|---|
| Breadcrumb | `6792:24` | 1 | .Item + Popover |
| Fixed Tab / Scrollable Tab | `6500:6958` / `6646:181` | 3 / 6 | .Item |
| Tab View | `15713:2488` | 4 | Icon Button |
| Nav Control | `19560:3280` | 2 | .Item Nav Control + Icon Button |
| Pagination | `13408:1416` | 1 | .Select Number + Divider + Icon Button |

### Listas
| Componente | Node | Var. | Usa |
|---|---|---:|---|
| Content List Item | `5488:675` | 20 | .Lead Item + .Text Content + .Trailing Item + Divider |
| Content List | `5488:1482` | 5 | Content List Item + Tag |
| Selection List Item | `5488:812` | 96 | .Lead Item + .Text Content + Divider |
| Selection List | `5488:1552` | 2 | Selection List Item |

### Complexos
| Página | Componente | Node | Var. | Usa |
|---|---|---|---:|---|
| Datepicker | Date Picker | `17629:24427` | 6 | .Navigation Control + .Week + .Day + Main/Icon Button |
| Datepicker | Modal Date Picker | `17560:51555` | 6 | Modal + Date Picker + .Header + .Footer |
| Datepicker | Date Input | `17962:70687` | 64 | .Text Content Mask + Icon Button |
| Tables | Table | `13472:5725` | 2 | .Toolbar + .Table Column + .Head + .Data Cell + Checkbox + Tag + Pagination |
| File Upload | Upload Item / Dropzone / Upload List | `15029:1115` / `15386:7230` / `15465:1365` | 4 / 5 / 1 | Spinner + Progress Line + Shaped Icon + Main Button |
| Slider | Slider | `20056:11908` | 30 | — |
| Rating Score | NPS Score / CSAT Score | `10100:848` / `10100:1192` | 24 / 12 | .Value Item / .CSAT Item |
| Progress Indicators | Progress Tracker Item / Tracker | `14415:3778` / `14524:1024` | 6 / 1 | Link |
| Caju Card | Caju Card | `17053:1181` | 21 | — |

### Building blocks (`.Building Blocks`, 28)
`.Currency Content` · `.Currency Symbol` · `.Lead Item` · `.Trailing Item` · `.Transaction Status Icon` · `.Item` (Breadcrumb, `6713:3`) · `.Item` (Tabs, `6498:375`) · `.Icons` · `.Header` (`5077:800`) · `.Header` (`16362:3241`) · `.Footer` · `.Close Toast` · `.Close Alert` · `.Lead item` (Topic, `15621:66`) · `.Lead item` (File, `15207:13262`) · `.Text Content Mask` · `.Value Item` · `.CSAT Item` · `.Select Number` · `.Data Cell` · `.Head` · `.Toolbar` · `.Table Column` · `.Navigation Control` · `.Day` · `.Week` · `.Content Banner` · `.Item Nav Control`

---

## 3. Lotes

A ordem segue as dependências: cada lote só consome o que já existe. Os building blocks entram junto com o primeiro componente que os usa.

| Lote | Tema | Componentes | Building blocks que entram |
|---|---|---|---|
| **0** | Fundação | tokens completos (Brand Style + Text Styles + Motion Styles + Elevations, light/dark) · pipeline de ícones · ilustrações sob demanda · side menu agrupado por página do Figma | — |
| **1** | Visuais | Icon · Shaped Icon · Image · Avatar · Caju Brand · .Credit Card Flags · Divider · Spinner · Tag · Badge · Status Dot · Progress Line · Link · Currency · .Text Content | .Currency Content · .Currency Symbol |
| **2** | Ações | Main Button · Icon Button · Drop Button · Filter button | .Icons |
| **3** | Selection Controls | Checkbox (+Group) · Radio (+Group) · Switch (+Group) · Input Chips · Filter Chips · Chips Group | — |
| **4** | Text fields | Text Input · Search · Text Area · Password · [Beta] Quantity · **realinhar Credit Card e OTP à família** | .Text Content Mask |
| **5** | Feedback e conteúdo | Toast · Alert · System Banner · Confirmation Message · Topic · Tooltip · Banner · Balance Card | .Close Toast · .Close Alert · .Lead item (Topic) · .Content Banner |
| **6** | Containers e overlays | Viewport Restriction · Card · Backdrop · Popover · Modal · Drawer · Bottom Sheet · [Beta] Fixed Bar → em seguida os 5 Select Inputs | .Header (×2) · .Footer |
| **7** | Navegação | Breadcrumb · Fixed Tab · Scrollable Tab · Tab View · Nav Control · Pagination | .Item (×2) · .Item Nav Control · .Select Number |
| **8** | Listas | Content List Item · Content List · Selection List Item · Selection List | .Lead Item · .Trailing Item · .Transaction Status Icon |
| **9** | Complexos | Date Picker · Modal Date Picker · Date Input · Table · File Upload (3) · Slider · NPS · CSAT · Progress Tracker · Caju Card | .Day · .Week · .Navigation Control · .Head · .Data Cell · .Table Column · .Toolbar · .Lead item (File) · .Value Item · .CSAT Item |

### Processo por componente (checklist)
1. Ler o set: props, `componentPropertyDefinitions`, variantes, description.
2. **Ler as annotations da página antes de decidir qualquer lógica** (Anexo 11 da skill).
3. Ler tokens por variante: fill, stroke e peso, texto, raio, opacidade, resolvendo light e dark.
4. Ler reactions (motion por transição) e nested instances (exposed ou fixa).
5. Construir `components/<id>/` (css · js · playground) **consumindo** os building blocks já existentes; `extends CDS.Element`, `@deps` no JSDoc, `node scripts/build-index.js`.
6. Testar em servidor local: estados, teclado, dark, 360px. Registrar o tamanho em `tests/expected.js` e rodar `tests/smoke.html` (tudo verde).
7. Publicar e registrar no §7 (Aprendizados) e no §5 (dúvidas novas).
8. **Atualizar `docs/ARCHITECTURE.md`**: diário (§7), nova rodada da análise (§5) e backlog (§6).

---

## 4. Decisões (já tomadas)

| # | Decisão | Origem |
|---|---|---|
| D1 | **O Figma manda.** Briefs, handoffs e zeroheight são mapas; quando divergem, segue o Figma e a divergência é registrada | brief CDS-1608 |
| D2 | Stack: Web Components em JS puro, sem build e sem dependências; scripts clássicos (funciona em `file://` e no GitHub Pages) | 30/09 |
| D3 | Um componente = `components/<id>/{css, js, playground.js}`. Tokens, shared e shell ficam separados | 01/10 |
| D4 | Tokens como CSS vars `--common-*`, 1:1 com `Common/*`; light padrão e dark por `data-theme` | 30/09 |
| D5 | Ícones = SVG exportado do Figma usado como `mask-image` (herda a cor do token). `mask-image` em longhand, **sem `var()`** (bug do Safari) | 01/10 |
| D6 | Booleans do Figma ligados por padrão: atributo `show-x="false"` desliga | 30/09 |
| D7 | Stroke INSIDE como `box-shadow: inset` (1px→2px sem deslocar o layout) | 30/09 |
| D8 | Motion por transição, com Motion Styles: Hover In 150 · Pressed 200 · Selected In 350. Classe `is-tapped` segura o Selected In após o clique | 30/09 |
| D9 | `Show Caret` é afordância de protótipo; o cursor é nativo (exceto OTP, onde o caret do Figma é desenhado) | annotations |
| D10 | Combinações `Disabled × Is Active` são artefato da matriz: não viram estado | annotations |
| D11 | Focus visível = padrão global do Castanha; não é variant | skill |
| D12 | Nested instances aparecem no painel (só leitura, ao vivo), com selo *exposta* ou *fixa* | 01/10 |
| D13 | O papel de trailing actions (ex.: `support-line`) é de quem implementa: o componente só emite evento e aceita `trailing-label` | 01/10 |
| D14 | Credit Card fixo em 16 dígitos (4×4); OTP de 3 a 6 células | 01/10 |
| D15 | Viewport padrão do playground = Fluido | 01/10 |
| D16 | ~~Fonte de verdade: sempre perguntar~~ → substituída pela D25 | Q1 · 01/10 |
| D17 | Building blocks ficam numa **seção recolhida "Building blocks" no fim do side menu**, além de aparecerem em Nested instances | Q2 · 01/10 |
| D18 | **Ilustrações e ícones sob demanda** via MCP; o Gustavo exporta tudo depois. Pipeline: soltar os SVGs em `assets/icons/` e `assets/illustrations/` e rodar `node scripts/build-assets.js`, que gera `styles/icons.css` e `scripts/assets-manifest.js` | Q3/Q4 · 01/10 |
| D19 | Complexos: **visual fiel + interação essencial** (estados, teclado e a11y do Figma e das annotations); regras de negócio simuladas | Q8 · 01/10 |
| D20 | **Collection Viewport → `data-viewport`** no frame do playground (360 = mobile · 744 = tablet · 1366/Fluido = desktop). Componentes com `Specific/*` leem via CSS e aceitam o atributo `viewport` para forçar o modo (ex.: Badge vira ponto de 8px no Mobile) | Q6 · 01/10 |
| D21 | **Nested instances reais:** componentes que no Figma instanciam outro (Tag → Icon, Shaped Icon → Icon) usam o custom element de verdade (`<cds-icon>`). Override de cor do Figma vira CSS no pai, com especificidade acima do `[appearance]` do filho | 01/10 |
| D22 | Sem Jira conhecido, o item do menu sai sem chave; o link do Figma aponta para o node do set na main | 01/10 |
| D23 | **Assets de marca** (Caju Brand, bandeiras) mantêm as cores do Figma — não são tokens. Caju Brand vira SVG inline (paths do Figma); bandeiras ficam em `assets/flags/` | 01/10 |
| D25 | **Fonte de verdade = main da lib.** Exceções: as branches já puxadas (Code Input OTP `PfeMbrThCwzwJFFo2GiAbW` e Credit Card Input `NHkGUvBfNMNTLnsxKtAmWa`). Novas branches entram depois, quando o Gustavo indicar, como atualização do componente | 01/10 |
| D26 | **Input Chips = `12365:2728`** (com stroke `Border/semi-soft`, o que o Chips Group consome). O set duplicado `14120:5313` era erro e foi removido no Figma (Q5 resolvida) | Q5 · 01/10 |
| D27 | **Hover do Unselected:** Checkbox usa `Border/semi-intense` e Radio usa `Accent/Solid/medium` — é intencional (Q18) | Q18 · 01/10 |
| D28 | **Foco por teclado:** não é prioridade agora; manter o outline 2px `Support/system` como padrão provisório (Q20) | Q20 · 01/10 |
| D29 | **Switch em 300ms** fica por enquanto; o Gustavo vai ajustar no Figma e atualizamos aqui (Q21) | Q21 · 01/10 |
| D30 | **Documentação dentro do componente, em tabs** (experimento no Credit Card Input): `components/<id>/<id>.docs.js` só com dados, montado por `scripts/docs-kit.js`. Exemplos são o componente real; estilo do frame `[Documentação]` e tabs no estilo do Scrollable Tab | 01/10 |
| D24 | Componentes `.X` publicados em página própria (ex.: `.Credit Card Flags`) contam como building block: seção recolhida, categoria = página do Figma | 01/10 |

## 5. Dúvidas abertas

| # | Dúvida | Proposta |
|---|---|---|
| Q7 | **TypeScript**: introduzir um build (ex.: esbuild) em algum momento? | Adiar até a lib passar de ~20 componentes |
| Q9 | **Caju Card**: as artes de cartão (Físico/Virtual/Voucher/Corporativo) vêm da página `Cartões` das Ilustrações? | Confirmar no Lote 9 |
| Q11 | **Currency Largest com valor oculto** usa Heading/Small (38px de altura) para o "R$", e com valor usa Title/Medium (36px). Intencional? | Implementado como no Figma |
| Q13 | **Disabled inconsistente entre botões:** Main/Drop/Filter usam `Opacity/light` (0.32), Icon Button usa `Opacity/medium` (0.4) | Implementado como no Figma |
| Q14 | **Ghost Inversed Disabled** (Main, Drop, Icon Button) troca o texto/ícone para `Text/intense`/`Icons/intense` (escuro sobre fundo escuro) | Parece erro; implementado como no Figma |
| Q15 | **Neutral diverge entre Main, Drop e Icon Button** (hover: `Neutral/Solid/medium` × `Neutral/Opacity/Intense/semi-transparent` × `Neutral/Solid/semi-soft`; pressed do Ghost: `Surface/01` × sem fundo × `Neutral/Solid/medium`) | Implementado por componente; vale alinhar a família |
| Q16 | **Drop Button `Default, Inversed, Pressed`** está quebrada (sem fundo, padding 0, raio 0) | Usei o Pressed do Main Button |
| Q17 | **Badge dentro do Filter button no Mobile:** no Figma é a pílula de 16px; pela regra do próprio Badge (Viewport) vira ponto de 8px | Segui a regra do Badge |
| Q19 | **Indeterminate sem reaction:** o clique no Checkbox Indeterminate não tem transição no Figma | Segui o nativo: o clique vai para Selected |
| Q22 | **Specimens da doc do Credit Card com props trocadas:** o card "Is Active" usa `State=Disabled` e o "Warning · Enabled" usa `State=Pressed` (frame 24931:8090) | Renderizei pelo rótulo (Is Active e Enabled) |
| Q23 | **Motion da doc** usa a ilustração de empty state (caixa) como placeholder | Troquei por um exemplo interativo |
| Q24 | **Variáveis `Commom/Colors/...`** (com "m") nos Tags do `.Prop-type` da doc — outra coleção ou erro de digitação? | Usei os tokens `Common/*` equivalentes |
| Q25 | **Doc do OTP: specimen alfanumérico com `#`** (Appearance × State mostra `1A2b3#`), mas `type=alphanumeric` aceita só `[0-9a-zA-Z]` | Mantive o filtro e usei `1A2b3c`; confirmar se símbolo é permitido |
| Q26 | **Doc do OTP: seção Acessibilidade oculta** no Figma | Sem tab de Acessibilidade até a seção ser publicada |
| Q10 | **Achados de naming** (🟡, não corrigir sem você): `showItem03`–`06` em minúsculo (Breadcrumb) · `Chechbox` (Selection List Item) · `State=Enable` (.Item do Breadcrumb e .Value Item) · `.Lead Item` × `.Lead item` (dois blocos) · dois `.Header` e dois `.Item` com o mesmo nome · Filter button em minúsculo | Registrar e seguir; abrir follow-up se quiser |

## 5.1 Débito de export (Gustavo)

Assets que o MCP não exporta bem ou que sairiam caros por esta sessão. Exportar do Figma como SVG, com o nome do componente, e rodar `node scripts/build-assets.js`.

| Asset | Origem | Destino | Hoje no repo |
|---|---|---|---|
| Ícones (274) | `[Caju] Icons` · página `UI & Caju` | `assets/icons/` | 8, exportados sob demanda |
| Ilustrações (237 + Hero + Cartões) | `[Caju] Illustrations` · página `Caju UI` | `assets/illustrations/` | 0 |
| Bandeiras Elo, Mastercard e Visa | `.Credit Card Flags` (`4934:771`) | `assets/flags/<kind>.svg` | 3, reconstruídas de `vectorPaths` (o Elo com coordenadas arredondadas); o MCP falha com "no visible layers". Substituir pelos SVGs oficiais, sem mudar código |

## 6. Preferências do Gustavo (observadas)

- Português, tom direto. Mostrar antes de gravar em Jira, Notion, Slack ou Figma.
- Fidelidade ao Figma acima de tudo: tokens `Common/*`, nada hardcoded.
- Simples como está: sem framework e sem build por enquanto.
- Publicar no GitHub Pages ao fim de cada entrega e devolver a URL.
- Pontos em aberto marcados 🟡, separados do que está pronto.

## 7. Aprendizados

| Data | Aprendizado |
|---|---|
| 30/09 | `curl` para `figma.com` é bloqueado nesta sessão; os ícones saem por `exportAsync({format:'SVG_STRING'})` via `use_figma` |
| 30/09 | GitHub Pages leva ~1 min por build e faz cache; conferir com `?v=N` |
| 30/09 | O Figma muda o motion por transição (não é um 150ms uniforme); ler `reactions` sempre |
| 01/10 | Safari falha em `-webkit-mask: var(...)` shorthand → longhand com URL literal |
| 01/10 | Destaque de seleção aparece sobre caractere mascarado → `::selection` transparente |
| 01/10 | Preview em `file://` não carrega CSS/JS separados; testar com `python3 -m http.server` (fora do sandbox, por causa da porta local) |
| 01/10 | Handoffs `.md` às vezes divergem do Figma (máximo de células, token do caret, Character Counter): sempre conferir na fonte |
| 01/10 | Annotations decidem coisas que as props não mostram (ex.: Disabled × Active é artefato; Lead Icon não detecta bandeira) |
| 01/10 | A lib tem 34 text styles, incluindo a família **Decorative em Work Sans**; o Label usa line-height 100% (não 150%) |
| 01/10 | Motion Styles completos: além de Hover In/Pressed/Selected In existem **Hover Out (150ms + delay 56ms), Released (50ms), Selected Out (200ms) e Disabled (150ms)** — usar a partir do Lote 1 |
| 01/10 | Exportar 274 ícones por MCP sairia caro (cada SVG passa pelo contexto); a exportação em massa do Figma + `build-assets.js` é o caminho |
| 01/10 | Extrator compacto (árvore da 1ª variante + diff das outras) lê sets de 36 variantes sem estourar contexto — reusar nos próximos lotes |
| 01/10 | **Override de cor em nested instance:** o `[appearance]` do filho vence o seletor do pai; o pai precisa de `pai > filho[appearance]` (achado no Tag) |
| 01/10 | Divider tem annotations de implementação (SVG para Dashed, tokens diferentes por construção, `role=separator` opcional) — annotations também trazem decisão de código, não só de design |
| 01/10 | Spinner: as 4 "Spinner Position" com AFTER_TIMEOUT ≈ 0 e Smart Animate 200ms ease-out = rotação contínua em passos de 90° |
| 01/10 | `exportAsync` falha em vetores sem fill no nó (cores nas regiões da vector network): reconstruir via `vectorPaths` + `vectorNetwork.regions[].fills` |
| 01/10 | Selection Controls: o Figma desenha o *Selector* (pílula 48×48) separado da caixa de 24, então o hover pinta a área de toque inteira, não só a caixa |
| 01/10 | Input Chips: o alvo de remoção é o chip inteiro (40px), não o ícone de 16px, por causa do WCAG 2.5.8 |
| 01/10 | Montar a doc com o componente real expôs um bug: o Label do Credit Card em Warning não ficava laranja (`Feedback/Warning/semi-intense` no Figma). Doc viva também é teste visual |
| 01/10 | O mesmo bug do Label em Warning existia no Code Input OTP (`Feedback/Warning/semi-intense` no set 24060:7228): a família de inputs precisa de um teste de cor por Appearance |
| 01/10 | Link usa motion próprio (150ms com a curva *accelerate* `.7,0,.8,1` no hover), diferente do Hover In dos inputs |

---

## 8. Status

| Lote | Status |
|---|---|
| — | ✅ Code Input OTP · ✅ Credit Card Input (branches) |
| 0 | ✅ 01/10 — 250 tokens `Common/*` (89 com dark) + 34 text styles + 3 elevations + Motion Styles gerados por `scripts/build-tokens.js` · pipeline `scripts/build-assets.js` (ícones como máscara + manifest) · side menu por página do Figma + seção Building blocks · Work Sans carregada |
| 1a | ✅ 01/10 — Icon · Shaped Icon · Tag · Badge · Status Dot · Divider · Spinner · Progress Line |
| 1b | ✅ 01/10 — Image · Avatar · Caju Brand · .Credit Card Flags · Link · Currency · .Text Content · .Currency Content · .Currency Symbol |
| 2 | ✅ 01/10 — Icon Button (componente; OTP e Credit Card passam a consumi-lo) · Main Button · Drop Button · Filter button · .Icons |
| 3 | ✅ 01/10 — Checkbox · Radio Button · Switch (+ os 3 Groups) · Input Chips · Filter Chips · Chips Group, todos sobre a base `CDS.SelectionControl` / `.cds-chip` |
| — | 🧪 01/10 — Experimento: documentação em tabs no Credit Card Input (Uso · Anatomia · Estilos · Acessibilidade · Diretrizes · Motion) e no Code Input OTP (sem Acessibilidade — oculta no Figma) |
| 4 a 9 | ⏳ |
