# Castanha DS — Playground de componentes

Playground público: https://gus-constantino.github.io/castanhads-component-teste/

Sem build e sem dependências: HTML, CSS e JS puros, servidos pelo GitHub Pages.

## Estrutura

```
index.html                    shell: side menu, canvas, painel de controles
tokens/figma-snapshot.json    tokens lidos do Figma (fonte do tokens.css)
styles/tokens.css             GERADO — Common/* (light + dark), text styles, elevations, Motion Styles
styles/icons.css              GERADO — uma classe .cds-icon--<nome> por SVG em assets/icons
styles/shared.css             building blocks compartilhados (Icon Button, base .cds-icon)
styles/playground.css         visual do shell (não faz parte dos componentes)
scripts/playground-kit.js     CDS.register() + helpers de controle (seg, toggle, text, range)
scripts/cds-element.js        CDS.Element — classe base dos componentes (flag, text, a11yName, define)
scripts/app.js                rotas (#/id), side menu, tema, viewport
scripts/assets-manifest.js    GERADO — lista de ícones e ilustrações (swaps do playground)
scripts/build-tokens.js       snapshot → styles/tokens.css
scripts/build-assets.js       assets/ → styles/icons.css + scripts/assets-manifest.js
scripts/build-index.js        @deps dos componentes → blocos <link>/<script> do index.html e do smoke (ordem de dependência)
tests/smoke.html              monta todos os playgrounds e compara tamanhos com o Figma (tests/expected.js)
components/<nome>/
  <nome>.css                  estilos do componente
  <nome>.js                   custom element <cds-…>
  <nome>.playground.js        controles do playground
assets/icons/<categoria>/*.svg [Caju] Icons (24×24, monocromático) · catalog.json = ordem e palavras-chave
assets/illustrations/*.svg    [Caju] Illustrations (200×200, colorido)
```

## Adicionar um componente

1. Crie `components/<nome>/` com os três arquivos acima. O `.js` estende `CDS.Element` e declara as dependências no JSDoc do topo: ` * @deps icon badge` (ou `—`).
2. No `<nome>.playground.js`, chame `CDS.register({ id, name, category, block, task, figma, zeroheight, mount(ctx) })`. `category` é a página do Figma, que agrupa o side menu; `block: true` coloca o item na seção Building blocks.
3. Rode `node scripts/build-index.js`. Ele reescreve os blocos do `index.html` e do `tests/smoke.html` na ordem certa; não edite esses blocos à mão.
4. Registre o tamanho esperado (Figma) em `tests/expected.js` e abra `tests/smoke.html`.

O side menu e a rota `#/<id>` aparecem automaticamente.

## Atualizar tokens e assets

1. **Ícones e ilustrações:** no Figma, selecione os componentes, faça *Export → SVG* e salve em `assets/icons/` ou `assets/illustrations/`, com o nome do componente. Depois rode `node scripts/build-assets.js`.
   As bandeiras do `.Credit Card Flags` vão em `assets/flags/<elo|mastercard|visa>.svg`. Os pendentes estão no *Débito de export* em `docs/ROADMAP.md`.
2. **Tokens:** atualize `tokens/figma-snapshot.json` (lido via Figma MCP) e rode `node scripts/build-tokens.js`.

Os dois scripts usam só Node, sem dependências. O site continua sem build: só lê os arquivos gerados.

## Rodar localmente

Abra com um servidor estático (os arquivos são separados):

```bash
python3 -m http.server 8765
```
