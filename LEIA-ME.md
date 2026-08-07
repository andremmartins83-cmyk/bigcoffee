# Big Coffee — app do caixa

App de celular para o voluntário registrar as vendas do domingo e enviar o
relatório no grupo. Funciona sem internet depois da primeira abertura.

## O que ele faz

- **Caixa** — toca no produto, escreve o nome de quem paga, escolhe a forma de pagamento.
- **Vendas** — lista do dia, com total, ticket médio e opção de excluir.
- **Como fazer** — receitas das bebidas, horários, funções, higiene e os dois checklists.
- **Fechar** — gera o relatório em PDF e abre o compartilhar do celular direto no WhatsApp.

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

Os preços e custos saem do backup do sistema. Para recalcular os custos, use as
fichas técnicas do arquivo `bigcoffee_backup_AAAA-MM-DD.json`.

## Instalar no celular

Abrir o link no navegador → menu do navegador → **Adicionar à tela de início**.
Depois disso abre como aplicativo, com ícone próprio e sem barra de endereço.

- Android/Chrome: o próprio navegador costuma oferecer sozinho.
- iPhone/Safari: botão de compartilhar → Adicionar à Tela de Início.
  **Precisa ser o Safari** — no iPhone, Chrome e outros navegadores não instalam PWA.

## Onde ficam os dados

No `localStorage` do próprio celular, em três chaves: `bcapp_voluntario`,
`bcapp_vendas` e `bcapp_checklists`. Limpar os dados do navegador apaga tudo —
por isso o relatório do domingo tem que ser enviado no grupo no mesmo dia.
