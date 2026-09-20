# Big Coffee — app do caixa

App de celular para o voluntário registrar as vendas do domingo e enviar o
relatório no grupo. Funciona sem internet depois da primeira abertura.

## O que ele faz

- **Caixa** — toca no produto, escreve o nome de quem paga, escolhe a forma de pagamento.
  **Cada produto tem um olho no canto**: tocar nele fecha o produto (card cinza,
  riscado, selo FECHADO, não aceita venda) e tocar de novo reabre. Segurar o card
  também funciona, como atalho.
  O produto fechado **continua fechado nos domingos seguintes**, porque item que sai
  do cardápio costuma demorar a voltar. Para ninguém esquecer, a aba Caixa mostra uma
  tarja amarela com quantos estão fechados e o botão **Reabrir todos**.
  O último cartão da grade é **+ Fora do cardápio**: serve para o que foi vendido e
  ainda não está cadastrado (fatia de bolo, por exemplo). Pede o nome e o valor
  cobrado, e entra na venda como um item normal.
- **Vendas** — lista do dia, com total, ticket médio e opção de excluir.
- **Como fazer** — receitas das bebidas, horários, funções, higiene e os dois checklists.
- **Fechar** — gera o relatório em PDF e abre o compartilhar do celular direto no WhatsApp.

## Tipografia e identidade

O app usa o **azul do Big Coffee** com a tipografia da igreja: **Creato Display**,
a mesma do app de escalas da Big Home (licença SIL Open Font, pode ser distribuída).
Os três pesos vêm nos arquivos `CreatoDisplay-Regular.otf`, `-Medium.otf` e
`-Black.otf`, servidos do próprio app — não há mais dependência do Google Fonts,
então a tipografia aparece igual sem internet.

## Item fora do cardápio e o custo

O item avulso entra **com lucro cheio**, porque não existe ficha técnica para ele
(decisão do André em 20/09/2026). O mesmo vale para qualquer produto cadastrado com
custo zero, como a bomboniere e o refrigerante.

Para isso não passar despercebido, o relatório traz no fim um bloco amarelo
**SEM CUSTO LANÇADO**, com a quantidade, o valor e os nomes dos itens. É o lembrete
de lançar a ficha no sistema do computador e corrigir o lucro do domingo — o rateio
50/50 sai desse número.

No arquivo de dados, o item avulso tem `pid` começando em `avulso-`.

## O que ele não faz, de propósito

- **Não controla estoque.** Cada celular teria um estoque próprio e todos errados.
  Estoque continua no sistema do computador (`Sistema\bigcoffee_sistema_fixed_11.html`).
- **Não altera preço nem cadastro.** O celular é terminal de venda, não de cadastro.
- **Não junta as vendas de vários celulares.** Um caixa por domingo. Se duas pessoas
  registrarem no mesmo domingo, saem dois relatórios separados.

## Como os dados voltam para o sistema

O botão **Baixar arquivo de dados** gera um `.json` no mesmo formato do sistema do
computador (campos `id`, `itemId`, `data`, `hora`, `cliente`, `pid`, `produto`,
`qtd`, `total`, `pgto`, `lucro`). É por ele que o histórico de domingos continua vivo.

## Publicar e atualizar (GitHub Pages)

Todos os arquivos ficam na raiz, sem subpastas, porque a tela de upload do
GitHub não preserva estrutura de pastas.

1. Repositório público no GitHub com o conteúdo desta pasta na raiz.
2. Settings → Pages → Branch `main`, pasta `/ (root)` → Save.
3. O link fica `https://USUARIO.github.io/REPOSITORIO/`.

Para **atualizar o cardápio ou um preço**:

1. Editar a lista `PRODUTOS` no começo do `<script>` do `index.html`.
2. Trocar `VERSAO_CATALOGO` para a data de hoje.
3. Trocar a constante `CACHE` no `sw.js` (ex.: `bigcoffee-v2-2026-09-01`).
   **Sem trocar o CACHE, os celulares continuam com a versão antiga.**
4. Subir os arquivos alterados no GitHub. Os celulares pegam na próxima abertura.

O arquivo `bighome.png` é o ícone oficial da Big Home (do pack **PACK NOVO LOGOTIPO
BIGHOME • 2023**). Ele aparece no cabeçalho do app, na tela de entrada e no canto
superior do relatório em PDF. Está no precache do `sw.js`: se trocar o arquivo,
trocar o `CACHE` junto.

Os preços e custos saem do backup do sistema. Para recalcular os custos, use as
fichas técnicas do arquivo `bigcoffee_backup_AAAA-MM-DD.json`.

## Instalar no celular

Abrir o link no navegador → menu do navegador → **Adicionar à tela de início**.
Depois disso abre como aplicativo, com ícone próprio e sem barra de endereço.

- Android/Chrome: o próprio navegador costuma oferecer sozinho.
- iPhone/Safari: botão de compartilhar → Adicionar à Tela de Início.
  **Precisa ser o Safari** — no iPhone, Chrome e outros navegadores não instalam PWA.

## Onde ficam os dados

No `localStorage` do próprio celular, em quatro chaves: `bcapp_voluntario`,
`bcapp_vendas`, `bcapp_checklists` e `bcapp_esgotados` (esta guarda a data junto,
para os produtos marcados como acabados sumirem sozinhos na virada do dia). Limpar os dados do navegador apaga tudo —
por isso o relatório do domingo tem que ser enviado no grupo no mesmo dia.
