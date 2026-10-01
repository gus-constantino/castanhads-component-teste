# Arquitetura e infraestrutura — playground do Castanha DS

> Documento vivo, especializado em **como o projeto é construído e operado**. O *quê* (lotes, componentes, decisões de design) fica em [`ROADMAP.md`](ROADMAP.md).
> **Regra:** ao fim de cada etapa, atualizar §7 (diário), rodar de novo a análise do §5 e mover itens do backlog do §6.
> Última atualização: 01/10/2026 · fim do Lote 2 · 24 componentes · ~3.000 linhas (CSS 641 · componentes JS 1.660 · playgrounds 690).

---

## 1. Visão geral

```
Figma (fonte da verdade)
  │  Figma MCP: use_figma (leitura JS) · get_design_context · get_variable_defs · exportAsync
  ▼
tokens/figma-snapshot.json ──node scripts/build-tokens.js──▶ styles/tokens.css
assets/{icons,illustrations}/*.svg ──node scripts/build-assets.js──▶ styles/icons.css + scripts/assets-manifest.js
  │
  ▼
components/<id>/{<id>.css, <id>.js, <id>.playground.js}   ← custom elements em light DOM
  │  CDS.register() (scripts/playground-kit.js)
  ▼
index.html + scripts/app.js (shell: side menu · rotas #/id · tema · viewport)
  │  git push main
  ▼
GitHub Pages (gus-constantino.github.io/castanhads-component-teste)
```

**Princípios:** sem build em runtime e sem dependências. O Figma manda. Um componente = uma pasta. O que é gerado não se edita à mão.

---

## 2. Camadas

| Camada | Arquivos | Responsabilidade | Regras |
|---|---|---|---|
| **Tokens** | `tokens/figma-snapshot.json` → `styles/tokens.css` | 250 `--common-*` (light e dark por `html[data-theme]`), 34 text styles (`--text-style-*`, shorthand `font`), 3 elevations, Motion Styles | 1:1 com o nome do Figma (`Common/Colors/Text/intense` → `--common-colors-text-intense`). Nunca hex em componente |
| **Assets** | `assets/icons` · `assets/illustrations` · `assets/flags` · `assets/brand` | SVGs do Figma | Ícone monocromático = máscara (`.cds-icon--<nome>`, gerado). Colorido (bandeira, marca) = `<img>` ou SVG inline |
| **Base compartilhada** | `styles/shared.css` | `.cds-icon` (máscara + `--_icon-color`) | Só o que é de fato transversal |
| **Componentes** | `components/<id>/` | Custom element `<cds-…>` + CSS + playground | Ver §3 |
| **Kit do playground** | `scripts/playground-kit.js` | `CDS.register`, helpers de controle (`seg`, `toggle`, `text`, `range`, `select`, `iconSwap`, `nested`, `watch`) | Não importa nada de componente |
| **Shell** | `index.html` · `scripts/app.js` · `styles/playground.css` | Side menu agrupado por página do Figma, rotas, tema, viewport → `data-viewport` | Não faz parte da lib |

---

## 3. Contrato de componente (estado atual)

1. **Custom element em light DOM**, sem Shadow DOM. Assim os tokens cascateiam, o tema funciona por `data-theme` e os seletores `[data-viewport]` alcançam o componente.
2. **Atributos = props do Figma** em kebab-case. Variant → atributo de valor (`appearance="warning"`). Boolean `Show X` ligado por padrão → `show-x="false"` desliga. Text → atributo de texto.
3. **Estado visual por CSS:** `:hover` = Hovered, `:active` = Pressed, `:focus-within` = Is Active. Valores em custom properties privadas (`--_bg`, `--_fg`, `--_bd`, `--_stroke-c`…) trocadas por seletor.
4. **Stroke INSIDE** = `box-shadow: inset 0 0 0 <w> <cor>`, que não desloca o layout.
5. **Nested instance = custom element real.** Tag → `<cds-icon>`, botões → `<cds-icon>` + `<cds-badge>`, OTP e Credit Card → `<cds-icon-button>`. O pai expõe referências (`iconEl`, `button`) para o inspetor do playground.
6. **Override de cor em nested** = o pai define `--_icon-color` com especificidade acima de `cds-icon[appearance]` (`pai > cds-icon, pai > cds-icon[appearance]`).
7. **Viewport:** o componente lê `[data-viewport="mobile|tablet"]` do ancestral e aceita `viewport="…"` para forçar o modo.
8. **Eventos:** `cds-change`, `cds-complete`, `cds-toggle`, `cds-visibility-change`, `cds-trailing-action` (`bubbles: true`). O papel da ação é de quem implementa.
9. **A11y:** elemento nativo sempre que existir (`<button>`, `<a>`, `<input>`). Decorativo → `aria-hidden`. Com `label` → `role="img"` + `aria-label`.

---

## 4. Infraestrutura e ambiente

| Tema | Como funciona | Armadilhas conhecidas |
|---|---|---|
| **Deploy** | GitHub Pages na `main`, raiz. Build de ~1 min | Cache do Pages: conferir com `?v=N` e recarregar com Cmd+Shift+R |
| **Servidor local** | `python3 -m http.server 8765 --bind 127.0.0.1` | O sandbox bloqueia porta local, então roda fora dele. O `launch.json` do app falha (o processo do app não acessa ~/Documents). O servidor derruba requisições às vezes (`ERR_CONNECTION_RESET`): recarregar e checar se `styleSheets` têm `cssRules` antes de testar |
| **Preview `file://`** | Snapshot estático: não carrega CSS/JS separados | Sempre testar via servidor |
| **Git/gh** | `gh`/`git push` precisam sair do sandbox (TLS do proxy corporativo) | — |
| **Download de assets** | `curl` para `figma.com` é negado nesta sessão | Exportar por `use_figma` → `exportAsync({format:'SVG_STRING'})` |
| **Figma MCP** | Servidor remoto, `fileKey` + `nodeId`. Branch = `branchKey` como `fileKey` | `get_design_context` estoura em sets grandes; usar extratores `use_figma` (§8). `exportAsync` falha em vetor sem fill no nó → reconstruir via `vectorPaths` + `vectorNetwork.regions` |
| **Jira** | MCP Atlassian lê issue e comentários | Não baixa anexos (o handoff precisa ser colado) |

---

## 5. Análise das etapas anteriores (01/10 · Lote 0 → Lote 2)

Medições no código atual:

| # | Achado | Evidência | Impacto | Severidade |
|---|---|---|---|---|
| A1 | **`index.html` mantido à mão** | 72 tags de componente para 24 componentes; a ordem importa (OTP e Credit Card precisam de `icon-button` e `badge` antes) | Cada componente novo exige 3 edições; um erro de ordem quebra em silêncio | 🔴 escala mal até ~80 componentes |
| A2 | **Boilerplate repetido** | `flag()`/`"false"` em 13 arquivos; `label → role=img` em 5; `observedAttributes + connectedCallback + attributeChangedCallback` em todos | Divergência de comportamento entre componentes | 🟡 |
| A3 | **Re-render por `innerHTML = ""`** | 15 componentes recriam o DOM a cada atributo | Perde foco/seleção e rebinda listeners. OTP e Credit Card guardam o valor à mão; risco em inputs futuros (Text Input, Selects) | 🟡 (🔴 para o Lote 4) |
| A4 | **Motion literal** | 12 ocorrências de `150ms cubic-bezier(.7,0,.8,1)` em vez de token | Os tokens existem (`--common-motion-duration-short-03` + `--common-motion-easing-systemic-accelerate`); mudar a curva exige caça manual | 🟡 |
| A5 | **px literais** | 39 ocorrências (OTP 7, card-flag 6, badge 5, botões 8) | Parte é geometria do Figma sem token (posição do Badge 6/5px, caret 24px, bandeira 40×24); parte tem token equivalente | 🟢/🟡 caso a caso |
| A6 | **Override de nested por especificidade** | 5 regras `pai > cds-icon[appearance]` | Funciona, mas é frágil: um novo seletor no Icon pode vencer o pai | 🟡 |
| A7 | **Sem teste automatizado** | Verificação por scripts ad hoc no navegador a cada lote | Regressões só aparecem quando alguém abre a página | 🟡 |
| A8 | **Extratores do Figma reescritos a cada lote** | Mesmo extrator compacto colado 6+ vezes nas chamadas | Custo de contexto e risco de variação | 🟢 |
| A9 | **Viewport só no playground** | Componentes leem `[data-viewport]` do frame | Num app real o equivalente seria media/container query; hoje não há fallback | 🟢 (decisão consciente, D20) |
| A10 | **TS adiado** | JS puro com JSDoc | Sem tipagem das props; o handoff para React/Flutter fica só na doc | 🟢 por ora |

**O que está funcionando bem:** a separação tokens/componentes/shell, os tokens gerados do snapshot (zero divergência com o Figma), o inspetor de nested instances ao vivo, o padrão `box-shadow inset` para stroke e o registro de componentes no side menu.

---

## 6. Backlog de evolução (priorizado)

| Prioridade | Item | Resolve | Esforço | Quando |
|---|---|---|---|---|
| **P1** | `scripts/build-index.js`: varre `components/*/`, lê um `deps` declarado em cada componente (ex.: `// @deps icon badge`), ordena topologicamente e gera os blocos `<link>`/`<script>` do `index.html` entre marcadores | A1 | ~1h | **antes do Lote 3** |
| **P1** | `scripts/cds-element.js`: classe base `CdsElement` com `flag(name)`, `text(name, padrão)`, `a11yLabel()`, `define(tag)` | A2 | ~1h, migração gradual | antes do Lote 4 |
| **P1** | Render incremental para interativos (criar o DOM uma vez e atualizar atributos), começando pelo Text Input | A3 | por componente | Lote 4 |
| **P2** | Trocar motion literal por tokens (`--common-motion-*`) e aliases nomeados (`--motion-accelerate-150`) | A4 | ~20min | junto do P1 |
| **P2** | Override de nested via variável dedicada: o Icon passa a ler `var(--cds-icon-color, var(--_icon-color))`; o pai seta `--cds-icon-color` e a especificidade deixa de importar | A6 | ~30min | junto do P1 |
| **P2** | `tests/smoke.html`: monta cada playground registrado, verifica erros e compara o tamanho do elemento com valores esperados do Figma (tabela em JSON) | A7 | ~2h | Lote 3 ou 4 |
| **P3** | `tools/figma/extract.js`: versionar os extratores (matriz de variantes, tree+diff, export SVG) para colar sem reescrever | A8 | ~30min | quando houver folga |
| **P3** | Revisar px literais e mapear o que tem token | A5 | ~30min | Lote 5 |
| **P3** | TypeScript com `esbuild` gerando `dist/`, mantendo o Pages sem build (commit do bundle) | A10 | ~2h | depois de ~40 componentes |

---

## 7. Diário de arquitetura (uma entrada por etapa)

| Etapa | Mudança de arquitetura / infra | Aprendizado |
|---|---|---|
| CDS-1608 | Página única com tudo inline | Sem build é o caminho mais rápido para publicar no Pages |
| Credit Card | Separação por pasta + kit + shell + hash routing | Scripts clássicos (não ES modules) funcionam em `file://` e no Pages; ES modules exigiriam servidor sempre |
| Nested instances | `kit.nested` + `kit.watch` (MutationObserver + eventos de interação) | Inspecionar estado real (`:hover`, `:focus-within`) é mais fiel que simular props |
| Lote 0 | Tokens gerados de snapshot JSON · pipeline de assets · side menu por página | Snapshot versionado permite diff do Figma entre releases |
| Lote 1a | `data-viewport` no frame · Icon como nested real | Override de cor em nested exige vencer `[appearance]` do filho (→ backlog P2) |
| Lote 1b | Assets coloridos fora do pipeline de máscara · building blocks com `block: true` | Exportação de vetor pode falhar; reconstrução por `vectorPaths` é confiável |
| Lote 2 | Icon Button vira componente e substitui o botão desenhado à mão em OTP e Credit Card · base `.cds-btn` compartilhada entre Main e Drop | Componente consumido por outros tem que carregar antes: a ordem no `index.html` virou dependência implícita (→ P1 `build-index.js`) |

---

## 8. Receitas (para não reescrever)

- **Ler um set grande sem estourar o contexto:** matriz por variante com `fill / stroke / opacity / texto+style / cor do ícone / tamanho / padding / gap / raio` (Lote 2), ou árvore da 1ª variante + diff das demais (Lote 1).
- **Resolver um token light/dark:** seguir `valuesByMode` até o primitivo, escolhendo o modo cujo nome contém `light` ou `dark` em cada coleção (Brand Style tem um modo só, "Caju", e aponta para Caju Beneficios Light/Dark).
- **Exportar ícone:** `getMainComponentAsync()` da instância → `exportAsync({format:'SVG_STRING'})`; se falhar, exportar a instância.
- **Testar no navegador:** abrir via servidor, checar `document.styleSheets` (todos com `cssRules`) e `customElements.get(...)`, recarregar se algo falhou, depois passar por todas as rotas medindo `getBoundingClientRect` e `getComputedStyle`.
