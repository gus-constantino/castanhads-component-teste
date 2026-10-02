# Table: por linhas, não por colunas

**Decisão (D62, 02/10):** a Table do Castanha DS é implementada **por linhas** (`<table>` → `<tr>` → `<th>`/`<td>`). No Figma ela está montada **por colunas** (`.Table Column` com `.Head` + `.Data Cell` empilhados no Slot). Este documento registra por que o código não segue a estrutura do Figma nesse ponto, para apoiar a discussão no time de design.

## O que o Figma faz hoje

- `Table Columns` é um Slot horizontal com 6 `.Table Column` (Checkbox, Default, Balance, Percentual, Tag, Icon Buttons).
- Cada coluna é uma pilha vertical: 1 `.Head` (56) + 10 `.Data Cell` (64).
- A "linha" não existe como objeto: ela é só o alinhamento visual da célula N de cada coluna.

Por que isso é tentador no Figma: com auto layout, cada coluna tem uma largura só (Hug ou Fill), e todas as células da coluna se alinham sozinhas. Mudar o tipo de uma coluna é trocar uma instância.

## Por que o correto é por linhas

### 1. O dado é a linha
Cada linha é **um registro** (uma pessoa, uma transação, um pedido). As colunas são atributos desse registro. Toda operação de tabela age sobre registros:

| Operação | Por linhas | Por colunas |
|---|---|---|
| Ordenar | Reordena as linhas, e as células andam juntas | Reordenar N colunas em paralelo, sem garantia de que continuam alinhadas |
| Selecionar (checkbox) | Marca a linha | A seleção fica numa coluna e o "registro" é implícito |
| Remover ou inserir um registro | Remove ou insere uma linha | Mexer na mesma posição de todas as colunas |
| Hover, foco, linha ativa | Um elemento (`tr`) | Não há elemento para receber o estado (no Figma cada `.Data Cell` tem o próprio Hovered, C62) |
| Paginar | Fatia as linhas | Fatia cada coluna |
| Altura variável (texto que quebra) | A linha cresce e todas as células acompanham | Cada coluna cresce sozinha e as "linhas" desalinham |

### 2. Acessibilidade (WCAG 1.3.1 Informação e relações)
Leitores de tela navegam tabelas **por linha e por coluna** a partir da estrutura `table/tr/th/td`:

- O leitor anuncia "linha 3 de 10, coluna Saldo, R$ 1.000,00". Isso depende de a célula estar numa linha **e** associada ao `<th scope="col">`.
- Com colunas como pilhas independentes, não há tabela: o leitor lê uma coluna inteira e depois a próxima, e a pessoa perde a relação entre os valores de um mesmo registro.
- A ordenação é anunciada no cabeçalho (`aria-sort="ascending"`), e a seleção, na linha.

### 3. Teclado e interação
Navegar entre células, ativar uma ação da linha (os Icon Buttons de Action Controls) e selecionar com Espaço só funcionam previsivelmente quando a linha é um elemento real.

### 4. Responsividade
Em telas estreitas, o padrão é empilhar **cada linha** como um card (rótulo + valor). Isso só é possível com a linha como unidade. Por colunas, a única saída é a rolagem horizontal.

### 5. Plataformas
HTML (`<table>`), iOS (`UITableView`/`List`), Android (`RecyclerView`/`LazyColumn`) e as bibliotecas de dados (TanStack Table, AG Grid) modelam linhas de dados. A documentação e o handoff ficam mais fiéis quando o Figma desenha a mesma unidade que o código vai montar.

## O que se perde, e como resolver no Figma

O ganho real da montagem por colunas é a **largura consistente** por coluna. Por linhas, dá para manter isso:

- **Linha = componente** (`.Table Row`) com as células como instâncias e **largura fixa por coluna** em variáveis (`Table/Column/Checkbox = 88`, `Table/Column/Default = 201`…). Trocar a largura em um lugar atualiza todas as linhas.
- **`.Head Row`** com os mesmos tokens de largura, para o cabeçalho alinhar com as linhas.
- Os estados da linha (Hovered, Selected, Disabled) passam a existir como variantes de `.Table Row`, em vez de um Hovered por célula.

## Como está no código

- `<cds-table>` recebe `.columns` (chave, rótulo, tipo, ordenável, largura) e `.rows` (os registros). Sem dados, mostra a amostra do Figma.
- Os 7 tipos de `.Data Cell` e o `.Head` são os mesmos do Figma, renderizados dentro de `<td>`/`<th>`.
- O hover é da linha inteira (C62), a ordenação usa `aria-sort` e o checkbox do cabeçalho marca a página.
- Referências: `components/table/table.js`, CONFERIR C61 e C62, ROADMAP D60 e D62.
