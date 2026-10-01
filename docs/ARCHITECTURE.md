# Arquitetura e infraestrutura — playground do Castanha DS

> Documento vivo, especializado em **como o projeto é construído e operado**. O *quê* (lotes, componentes, decisões de design) fica em [`ROADMAP.md`](ROADMAP.md).
> **Regra:** ao fim de cada etapa, atualizar §7 (diário), rodar de novo a análise do §5 e mover itens do backlog do §6.
> Última atualização: 01/10/2026 · **rodada de arquitetura** (pós-Lote 2) · 24 componentes · smoke 24/24.

---

## 1. Visão geral

```
Figma (fonte da verdade)
  │  Figma MCP: use_figma (leitura JS) · get_design_context · get_variable_defs · exportAsync
  ▼
tokens/figma-snapshot.json ──node scripts/build-tokens.js──▶ styles/tokens.css
assets/icons/<bucket>/*.svg + catalog.json, assets/illustrations/*.svg ──node scripts/build-assets.js──▶ styles/icons.css + scripts/assets-manifest.js
  │
  ▼
components/<id>/{<id>.css, <id>.js, <id>.playground.js}   ← custom elements em light DOM (extends CDS.Element)
  │  @deps no JSDoc ──node scripts/build-index.js──▶ blocos <link>/<script> em ordem topológica
  │  CDS.register() (scripts/playground-kit.js)
  ▼
index.html + scripts/app.js (shell: side menu · rotas #/id · tema · viewport)
tests/smoke.html + tests/smoke.js + tests/expected.js (monta tudo e compara tamanhos com o Figma)
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
| **Assets** | `assets/icons` · `assets/illustrations` · `assets/flags` · `assets/brand` | SVGs do Figma | Ícone monocromático = máscara (`.cds-icon--<nome>`, gerado), organizado em buckets = categorias do [Caju] Icons (`catalog.json` guarda ordem e palavras-chave). Colorido (bandeira, marca) = `<img>` ou SVG inline |
| **Base da lib** | `styles/shared.css` · `scripts/cds-element.js` | reset `box-sizing:border-box`, `.cds-icon` (máscara; cor = `--cds-icon-color` > `--_icon-color`), classe base `CDS.Element`, `CDS.create()` | Carregar antes de qualquer componente |
| **Componentes** | `components/<id>/` | Custom element `<cds-…>` + CSS + playground | Ver §3 |
| **Kit do playground** | `scripts/playground-kit.js` | `CDS.register`, helpers de controle (`seg`, `toggle`, `text`, `range`, `select`, `iconSwap`, `nested`, `watch`) | Não importa nada de componente |
| **Shell** | `index.html` · `scripts/app.js` · `styles/playground.css` | Side menu agrupado por página do Figma, rotas, tema, viewport → `data-viewport` | Não faz parte da lib. Blocos de componentes **gerados** (`build-index.js`) |
| **Testes** | `tests/smoke.html` · `smoke.js` · `expected.js` | Monta cada playground fora da tela; falha em erro de mount, elemento não definido ou tamanho fora de ±1px do Figma | Rodar ao fim de cada lote; registrar o tamanho esperado de cada componente novo |

---

## 3. Contrato de componente (estado atual)

1. **Custom element em light DOM**, sem Shadow DOM, estendendo `CDS.Element` (`render()`, `flag()`, `text()`, `a11yName()`, `define()`). Light DOM deixa os tokens cascatearem, o tema funcionar por `data-theme` e os seletores `[data-viewport]` alcançarem o componente. Componentes com estado (OTP, Credit Card) sobrescrevem `attributeChangedCallback`. **Famílias** ganham uma base própria: `CDS.SelectionControl` (Checkbox, Radio, Switch) com render incremental (`build()` uma vez + `update()` por atributo), que mantém o `<input>` nativo e o foco.
   **Dependências** declaradas no JSDoc (`@deps icon badge`); a ordem de carga sai do `build-index.js`.
2. **Atributos = props do Figma** em kebab-case. Variant → atributo de valor (`appearance="warning"`). Boolean `Show X` ligado por padrão → `show-x="false"` desliga. Text → atributo de texto.
3. **Estado visual por CSS:** `:hover` = Hovered, `:active` = Pressed, `:focus-within` = Is Active. Valores em custom properties privadas (`--_bg`, `--_fg`, `--_bd`, `--_stroke-c`…) trocadas por seletor.
4. **Stroke INSIDE** = `box-shadow: inset 0 0 0 <w> <cor>`, que não desloca o layout.
5. **Nested instance = custom element real.** Tag → `<cds-icon>`, botões → `<cds-icon>` + `<cds-badge>`, OTP e Credit Card → `<cds-icon-button>`. O pai expõe referências (`iconEl`, `button`) para o inspetor do playground.
6. **Override de cor em nested** = o pai define `--cds-icon-color` no próprio elemento (ex.: `cds-tag{ --cds-icon-color:var(--_fg); }`). O ícone resolve `--cds-icon-color` > `--_icon-color` (Appearance) > padrão. Não depende de especificidade e é o equivalente direto do override de instância do Figma.
7. **Motion só por token:** `var(--common-motion-duration-*) var(--common-motion-easing-*)` ou aliases de Motion Styles (`--motion-hover-*`, `--motion-press-*`, `--motion-active-*`).
8. **Viewport:** o componente lê `[data-viewport="mobile|tablet"]` do ancestral e aceita `viewport="…"` para forçar o modo.
9. **Eventos:** `cds-change`, `cds-remove` (cancelável: `preventDefault()` mantém o chip), `cds-complete`, `cds-toggle`, `cds-visibility-change`, `cds-trailing-action` (`bubbles: true`). O papel da ação é de quem implementa.
12. **Recurso de suporte ≠ componente:** libs de apoio registram `CDS.register({ resource:true, order, status })` em `resources/<id>/<id>.js`, com doc em `CDS.docs[id]` e sem `mount`. O shell lista num espaço próprio ("Recursos de suporte"), abre direto na doc e não mostra a tab Playground; o smoke ignora.
11. **Documentação (opcional):** `components/<id>/<id>.docs.js` registra `CDS.docs[id]` só com dados (tabs → blocos). O shell mostra as tabs quando existe doc; a rota é `#/<id>/<tab>`. Exemplos usam o componente real com atributos; estáticos ficam `inert`. Estados de interação forçados por atributo (`state`, `is-active`) espelham as props do Figma para specimens.
10. **A11y:** elemento nativo sempre que existir (`<button>`, `<a>`, `<input>`). Decorativo → `aria-hidden`. Com `label` → `role="img"` + `aria-label`.

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

## 5. Análise — rodada 6 (01/10 · recursos de suporte)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A29 | **Dois tipos de entrada no registro:** componente (playground + doc opcional) e recurso (só doc) | Mesmo `CDS.register` com `resource:true`; o shell decide tabs, modo doc e menu. Evita um segundo roteador | ✅ |
| A30 | **`resources/` fora de `components/`** e sem `@deps` | O `build-index` inclui depois dos componentes; um recurso nunca é dependência de componente (o componente consome os *arquivos*, não a página) | ✅ |
| A31 | **Accordion nativo (`<details>`)** na biblioteca | Teclado e leitor de tela de graça; a busca abre só os painéis com resultado e limpar volta ao estado inicial | ✅ reutilizável quando o Accordion do DS existir |
| A33 | **Side menu com o mesmo accordion (`<details>`)** da biblioteca de ícones; estado aberto por categoria em `localStorage` (conveniência por pessoa, com `try/catch`) | Em telas ≤1100px o menu é uma faixa horizontal: tudo aberto e cabeçalhos escondidos, senão os itens de uma categoria fechada ficariam inacessíveis (aconteceu com Building blocks no 1º teste) | ✅ |
| A32 | **Página reservada sem fonte** (Animações) | Fica marcada "a definir" e sem conteúdo inventado até o link chegar | 🟡 Q31 |

### Rodada 5 (01/10 · importação dos ícones)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A25 | **Ícones por bucket sem mudar o contrato:** a classe continua `.cds-icon--<nome>`; só o caminho do arquivo ganhou a pasta | Nenhum componente mudou; os 48 ícones usados nos componentes renderizam | ✅ |
| A26 | **`catalog.json` como fonte de ordem e metadados** (categoria, palavras-chave da description do Figma) | Alimenta a galeria (busca), o instance swap agrupado e o manifest | ✅ |
| A27 | **Manifest cresceu para ~45 KB** (palavras-chave de 262 ícones), carregado em toda página | Aceitável hoje; se crescer com ilustrações, separar `keywords` num arquivo carregado só pela galeria | 🟢 monitorar |
| A28 | **Exportação sem `curl`:** o `use_figma` devolve no máximo 20 KB por chamada; as linhas `@@ICON` são extraídas do transcript da sessão por script (`scripts/dev/extract-icons.py`), sem redigitar SVG | 14 chamadas para 274 ícones; coordenadas com 2 casas | ✅ receita registrada |

### Rodada 4 (01/10 · experimento de documentação)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A17 | **Doc como dados, não HTML:** 13 tipos de bloco (`h2`, `p`, `cards`, `anatomy`, `props`, `specimens`, `guides`, `dodont`, `table`…) cobrem o frame `[Documentação]` inteiro | Uma doc nova é só um `.docs.js`; o estilo fica num lugar (`docs.css`). O frame do Figma tem estrutura estável (Sobre → Uso → Anatomia → Propriedades → Estilos → Acessibilidade → Diretrizes → Motion → Do's) | ✅ pronto para replicar |
| A18 | **Doc viva = teste visual:** os exemplos são o componente real, então divergências aparecem | Achou o Label do Warning sem cor no Credit Card | ✅ |
| A19 | **Estados forçados por atributo** (`state="hovered|pressed"`, `is-active`) | Necessário para specimens estáticos; já em Credit Card e OTP (mesmo padrão: lista de seletores ao lado do `:hover`/`:active`/`:focus-within`) | 🟡 virar contrato da família no Lote 4 |
| A23 | **Doc sem fonte no frame:** quando a seção está oculta, os dados vêm das annotations (via `use_figma`) e do handoff dev; a nota de fonte vai no fim da tab | Mantém a regra de não inventar: cada item aponta para annotation ou handoff | ✅ |
| A24 | **Motion Styles como alias de primitivo:** o snapshot ganhou `motionAlias` (estilo → `Common/Motion/*`) e o `build-tokens` gera `--motion-<estilo>-01-<timing|easing>: var(--common-motion-…)`. O índice fica no nome para os próximos estilos | Script confere que os 15 aliases resolvem para os mesmos valores | ✅ |
| A22 | **2ª doc custou só dados + 2 ajustes no kit:** grade de specimens com `min` por coluna e anatomia medindo a largura natural (`flex:0 0 auto`) | O kit generalizou; os bugs achados eram do kit (grade com wrapper extra), não da doc | ✅ |
| A20 | **Anatomia mede o DOM:** marcadores posicionados por `getBoundingClientRect` + `ResizeObserver`; em tela estreita o diagrama encolhe (`scale`) e a seta some | Seletores de alvo (`.cds-cc__label`) acoplam a doc à estrutura interna do componente | 🟢 aceitável; quebra visível se a estrutura mudar |
| A21 | **Docs não entram no smoke** | `*.docs.js` carrega no smoke (só dados), mas as tabs não são montadas | ⏳ P3: smoke montar cada tab e checar overflow |

### Rodada 3 (01/10 · Lote 3)

| # | Achado | Antes → agora | Status |
|---|---|---|---|
| A3 | Re-render por `innerHTML` | 15 → 16 componentes (os chips recriam só o conteúdo do `<button>`, que é mantido, então o foco não se perde). **Primeira base incremental:** `CDS.SelectionControl` não recria nada | 🟡 o padrão está validado; aplicar aos inputs no Lote 4 |
| A5 | px literais | +3 no Lote 3: `translateX(16px)` do Switch (sem token de deslocamento), largura 320 do Chips Group (largura do frame no Figma) e o offset do outline de foco | ⏳ P3 |
| A7 | Smoke | 24 → **33/33**; os Groups medem 328 = 6 × 48 + 5 × 8, a mesma conta do Figma | ✅ |
| A13 | **Novo — classe base por família:** 3 componentes compartilham markup, a11y e evento, mudando só `inputType`, `buildBox()` e `applyStatus()`. O CSS também tem base (`selection-control.css`, `chip.css`) | Checkbox, Radio e Switch têm ~30 linhas de JS cada | ✅ padrão para Text Fields e Lists |
| A14 | **Novo — `@deps` com base sem tag de playground:** `selection-control` e `chip` não registram playground; o `build-index` já trata (carrega CSS/JS, sem `.playground.js`) | — | ✅ |
| A15 | **Novo — um arquivo, vários elementos:** `selection-group.js` define 3 tags e o playground registra 3 páginas | O `build-index` trabalha por pasta, não por tag | 🟢 ok enquanto as tags forem irmãs |
| A16 | **Novo — `role` é atributo reservado:** a prop `Role` do Chips Group virou `role-kind` | Props do Figma que colidem com atributos globais de HTML (`role`, `hidden`, `title`) precisam de prefixo | 🟢 regra registrada no contrato |

### Rodada 2 (01/10 · pós-arquitetura)

| # | Achado | Antes → agora | Status |
|---|---|---|---|
| A1 | `index.html` manual | 72 tags à mão → **gerado** por `@deps` + ordenação topológica (falha se faltar dependência ou houver ciclo) | ✅ resolvido |
| A2 | Boilerplate repetido | `flag()` em 13 arquivos → 0; **24/24** em `CDS.Element`; `a11yName()` em 3 (os outros 2 `role=img` são sempre rotulados, de propósito) | ✅ resolvido |
| A3 | Re-render por `innerHTML` | 15 → 15 | ⏳ fica para o Lote 4 (inputs) |
| A4 | Motion literal | 12 → **0** | ✅ resolvido |
| A5 | px literais | 39 → 39 | ⏳ P3 |
| A6 | Override por especificidade | 5 → **0** (`--cds-icon-color`) | ✅ resolvido |
| A7 | Sem teste automatizado | → **smoke 24/24**. Na primeira rodada pegou 2 problemas que a inspeção manual não viu | ✅ base pronta |
| A8 | Extratores reescritos | sem mudança | ⏳ P3 |
| A11 | **Novo — dependência de reset global:** componentes assumiam `box-sizing:border-box` do shell do playground (o Badge saía com 24px fora dele) | reset movido para a base da lib (`shared.css`) | ✅ resolvido |
| A12 | **Novo — `loading=lazy` fora da tela:** Image mede altura 0 até carregar | aceito; expectativa só de largura | 🟢 consciente |

### Rodada 1 (01/10 · Lote 0 → Lote 2)

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
| ✅ | ~~`build-index.js` com `@deps` e ordenação topológica~~ | A1 | feito | rodada de arquitetura |
| ✅ | ~~`CDS.Element` + migração dos 24~~ | A2 | feito | rodada de arquitetura |
| **P1** | Render incremental para interativos (criar o DOM uma vez e atualizar atributos), começando pelo Text Input | A3 | por componente | Lote 4 |
| ✅ | ~~Motion por token~~ | A4 | feito | rodada de arquitetura |
| ✅ | ~~`--cds-icon-color`~~ | A6 | feito | rodada de arquitetura |
| ✅ | ~~Smoke test~~ | A7 | feito | rodada de arquitetura |
| **P2** | Migrar OTP e Credit Card para `build()`/`update()` (como a base `CDS.SelectionControl`) ao realinhar a família Text Fields | A3 | por componente | Lote 4 |
| **P2** | Smoke: rodar também em dark e em `data-viewport=mobile`, e verificar `aria-*` básicos (botão com nome, ícone decorativo com `aria-hidden`) | A7 | ~1h | Lote 3 |
| **P2** | Subir `build()`/`update()` de `CDS.SelectionControl` para `CDS.Element` (opcional por componente) quando a 2ª família usar | A3 | ~1h | Lote 4 |
| **P2** | Estados forçados (`state`, `is-active`) como contrato da família de inputs no Lote 4 (OTP e Credit Card já têm) | A19 | ~30min | Lote 4 |
| **P2** | Smoke: checar a cor do Label/mensagem por Appearance nos inputs (o bug do Warning passou nos dois) | — | ~20min | Lote 4 |
| **P3** | Separar `keywords` do manifest (carregar só na galeria) se o manifest passar de ~100 KB | A27 | ~20min | ilustrações |
| **P3** | Smoke montar as tabs de doc e checar overflow horizontal em 375px | A21 | ~30min | 2ª doc |
| **P3** | Extrator do frame `[Documentação]` → `.docs.js` (estrutura estável: seções por nome) | A17 | ~1h | se a doc virar padrão |
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
| Lote 3 | Primeiras **bases de família**: `CDS.SelectionControl` (JS + CSS) e `.cds-chip` (CSS + `CDS.chipIcon`) · primeiro render incremental · um arquivo definindo 3 tags (Groups) · `kit.selectionControl` (um playground parametrizado para 3 componentes) · evento cancelável `cds-remove` | Manter o `<input>` nativo e só atualizar atributos dá teclado, foco e leitor de tela de graça. A base de família reduz cada variante a poucas linhas. Props com nome de atributo global de HTML precisam de prefixo (`role` → `role-kind`) |
| Recursos de suporte | `resources/<id>/` · `CDS.register({ resource:true })` · seção própria no side menu · `iconGallery` em accordion (`<details>`) · Icon sem doc da lib | Separar *quem desenha* (lib de apoio) de *quem aplica* (componente) deixa claro onde atualizar cada coisa. `<details>` resolve accordion sem JS de acessibilidade |
| Ícones | 274 SVGs em 12 buckets + `catalog.json` · `build-assets` com buckets, deprecated e `_glyphs` · `kit.iconSwap` com `<optgroup>` · bloco `iconGallery` + `icon.docs.js` | Edição de arquivo por fatia (`s[a:b]`) precisa checar `a < b`: com a ordem invertida a fatia sai vazia e `replace("", novo)` insere o texto entre todos os caracteres (aconteceu no kit; restaurado do git). Sempre `assert` na âncora |
| Motion Styles | `--motion-*-01-*` com alias para o primitivo; bloco `specs` (fichas) no kit; `<wbr>` em `código` longo | Tabela larga não funciona em doc responsiva: ficha por item escala melhor. Servidor local cacheia JS (sem headers): forçar `fetch(..., {cache:'reload'})` antes de recarregar |
| Doc (experimento) | `*.docs.js` (dados) + `scripts/docs-kit.js` (render) + `styles/docs.css` · tabs no shell com rota `#/<id>/<tab>` e teclado WAI-ARIA · `build-index` inclui `.docs.js` · estados forçados no Credit Card | Separar dados de render deixa a doc barata de escrever e consistente. Exemplos com `inert` ficam estáticos sem hacks de CSS. Decidir a anatomia compacta pela largura total, não pelo padding (que muda com a classe), evita oscilação no `ResizeObserver` |
| Arquitetura | `CDS.Element` · `@deps` + `build-index.js` · `--cds-icon-color` · motion por token · reset na base da lib · smoke test | Teste automatizado barato (mount + medida vs Figma) já paga na 1ª execução. Variável de override é mais robusta que especificidade. Reset de box-sizing é parte da lib, não do app |

---

## 8. Receitas (para não reescrever)

- **Ler um set grande sem estourar o contexto:** matriz por variante com `fill / stroke / opacity / texto+style / cor do ícone / tamanho / padding / gap / raio` (Lote 2), ou árvore da 1ª variante + diff das demais (Lote 1).
- **Resolver um token light/dark:** seguir `valuesByMode` até o primitivo, escolhendo o modo cujo nome contém `light` ou `dark` em cada coleção (Brand Style tem um modo só, "Caju", e aponta para Caju Beneficios Light/Dark).
- **Exportar ícone:** `getMainComponentAsync()` da instância → `exportAsync({format:'SVG_STRING'})`; se falhar, exportar a instância.
- **Adicionar componente:** criar a pasta com `@deps` no JSDoc → `node scripts/build-index.js` → registrar o tamanho em `tests/expected.js` → abrir `tests/smoke.html`.
- **Nova família de componentes:** base em `components/<familia>/` (sem playground) com `@deps —`; cada membro declara `@deps <familia>` e sobrescreve só o que muda. No playground, um helper no kit (ex.: `kit.selectionControl`) evita repetir os controles.
- **Adicionar um recurso de suporte:** criar `resources/<id>/<id>.js` com `CDS.register({ id, name, resource:true, order, status, figma })` e `CDS.docs[id] = { source, sourceLabel, tabs }` (começar com `window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};`) → `node scripts/build-index.js`.
- **Documentar um componente:** criar `components/<id>/<id>.docs.js` com `CDS.docs[id] = { tag, base, source, tabs }` → `node scripts/build-index.js`. Os blocos estão descritos no topo de `scripts/docs-kit.js`. Para specimens de Hovered/Pressed/Is Active, o componente precisa aceitar `state` / `is-active`.
- **Reimportar ícones do [Caju] Icons:** `use_figma` na página `UI & Caju` (0:1), listando os componentes dos frames de categoria em ordem e devolvendo linhas `@@ICON\t<categoria>\t<nome>\t<description>\t<svg interno>` em pedaços de até 19 KB (parâmetro `START`, a resposta termina com `@@NEXT\t<i>\t<total>`). Depois: `python3 scripts/dev/extract-icons.py <transcript.jsonl> --write` → `node scripts/build-assets.js`. O transcript fica em `~/.claude/projects/<projeto>/<sessão>.jsonl`.
- **Testar no navegador:** abrir via servidor, checar `document.styleSheets` (todos com `cssRules`) e `customElements.get(...)`, recarregar se algo falhou, depois passar por todas as rotas medindo `getBoundingClientRect` e `getComputedStyle`.
