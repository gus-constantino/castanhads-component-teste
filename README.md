# Castanha DS — Playground de componentes

Playground público: https://gus-constantino.github.io/castanhads-component-teste/

Sem build e sem dependências: HTML, CSS e JS puros, servidos pelo GitHub Pages.

## Estrutura

```
index.html                    shell: side menu, canvas, painel de controles
styles/tokens.css             tokens Common/* (light + dark) e Motion Styles
styles/shared.css             building blocks compartilhados (Icon Button, ícones)
styles/playground.css         visual do shell (não faz parte dos componentes)
scripts/playground-kit.js     CDS.register() + helpers de controle (seg, toggle, text, range)
scripts/app.js                rotas (#/id), side menu, tema, viewport
components/<nome>/
  <nome>.css                  estilos do componente
  <nome>.js                   custom element <cds-…>
  <nome>.playground.js        controles do playground
assets/icons/*.svg            ícones exportados do Figma
```

## Adicionar um componente

1. Crie `components/<nome>/` com os três arquivos acima.
2. No `<nome>.playground.js`, chame `CDS.register({ id, name, task, figma, zeroheight, mount(ctx) })`.
3. Inclua o `.css` e os dois `.js` no `index.html`, antes de `scripts/app.js`.

O side menu e a rota `#/<id>` aparecem automaticamente.

## Rodar localmente

Abra com um servidor estático (os arquivos são separados):

```bash
python3 -m http.server 8765
```
