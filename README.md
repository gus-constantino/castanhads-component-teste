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
scripts/app.js                rotas (#/id), side menu, tema, viewport
scripts/assets-manifest.js    GERADO — lista de ícones e ilustrações (swaps do playground)
scripts/build-tokens.js       snapshot → styles/tokens.css
scripts/build-assets.js       assets/ → styles/icons.css + scripts/assets-manifest.js
components/<nome>/
  <nome>.css                  estilos do componente
  <nome>.js                   custom element <cds-…>
  <nome>.playground.js        controles do playground
assets/icons/*.svg            [Caju] Icons (24×24, monocromático)
assets/illustrations/*.svg    [Caju] Illustrations (200×200, colorido)
```

## Adicionar um componente

1. Crie `components/<nome>/` com os três arquivos acima.
2. No `<nome>.playground.js`, chame `CDS.register({ id, name, category, block, task, figma, zeroheight, mount(ctx) })`. `category` é a página do Figma, que agrupa o side menu; `block: true` coloca o item na seção Building blocks.
3. Inclua o `.css` e os dois `.js` no `index.html`, antes de `scripts/app.js`.

O side menu e a rota `#/<id>` aparecem automaticamente.

## Atualizar tokens e assets

1. **Ícones e ilustrações:** no Figma, selecione os componentes, faça *Export → SVG* e salve em `assets/icons/` ou `assets/illustrations/`, com o nome do componente. Depois rode `node scripts/build-assets.js`.
2. **Tokens:** atualize `tokens/figma-snapshot.json` (lido via Figma MCP) e rode `node scripts/build-tokens.js`.

Os dois scripts usam só Node, sem dependências. O site continua sem build: só lê os arquivos gerados.

## Rodar localmente

Abra com um servidor estático (os arquivos são separados):

```bash
python3 -m http.server 8765
```
