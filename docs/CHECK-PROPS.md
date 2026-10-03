# Check de props — Figma × código (03/10/2026)

**O que foi comparado:** as props de cada um dos **105 componentes** do playground na lib [CastanhaDS] Components (`componentPropertyDefinitions`: nome, tipo, opções e padrão; Accordion, Accordion Item, Code Input OTP e Credit Card Input lidos das branches) contra os atributos que o código aceita (`observedAttributes` lidos no navegador + atributos usados no CSS e no JS, incluindo a família de text fields e selects).

## Resultado

| | Props |
|---|---:|
| Com atributo correspondente no código | 412 |
| Não se aplicam a atributo (Slot = filhos, Show Caret = cursor nativo, Spinner Position = quadro da animação, semanas do Date Picker = calculadas pelo mês) | 25 + 6 |
| Falso negativo do primeiro passe, confirmado no navegador (Selects, listas, Fixed Bar/Tab, System Banner, Drop Button `size` pelo CSS do Main Button) | 59 |
| **Divergências reais** | **2 corrigidas · 3 registradas** |

Padrões dos **booleans**: nenhum desvio — os ligados no Figma ligam por padrão no código (`flag`), e os desligados (Show Popover, Show Notification, Show Lead Item do Tab Item, Is Current Day, Show week 06) só ligam com o atributo.

## Corrigidas

1. **.Lead item (File) · Appearance** — padrão no Figma é **File**; o código abria em Image. Agora `appearance` sem valor = File (o Upload Item já passava o valor explícito, sem efeito colateral).
2. **Date Picker · Show First Day Selected / Show Last Day Selected** — existiam no Figma e não no código (só havia `show-selected-dates`, que liga/desliga o bloco). Novos atributos `show-first-day-selected` e `show-last-day-selected` (padrão ligados) + toggles no Playground.

## Registradas (sem mudança)

- **Toast · Text Description** → no código é `text`. Só nome diferente; renomear quebraria quem já usa.
- **Chips Group · Kind (Filter/Input Chips)** → informativo no código: o tipo vem dos filhos (documentado no componente).
- **Breadcrumb · showItem03–06** → `show-item03…06` (C25); **Kind** só tem uma opção (Default).

## Como rodar de novo

Pedir "roda o check de props". O passo a passo: ler `componentPropertyDefinitions` de cada nó do link do Figma de cada componente (MCP, só leitura), ler `observedAttributes` no navegador e cruzar por convenção (Show X → `show-x`, Text Label → `label`, Supporting Message → `supporting`, Lead Icon → `lead-icon`/`icon`, State → interação + `disabled`, Is Active → `is-active`…).
