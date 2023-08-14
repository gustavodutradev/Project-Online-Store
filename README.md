## Descrição

Este projeto foi desenvolvido em grupo durante o período de Curso da Trybe 🚀

O projeto tem por objetivo a avaliação e prática dos conhecimentos adquiridos na Trybe, visando o cumprimento do requisitos solicitados pela mesma.

## Sumário

- [Habilidades](#habilidades-requeridas)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Tecnologias usadas](#tecnologias-usadas)
- [Antes de inicializar a aplicação](#antes-de-inicializar-a-aplicação)
- [Linter](#linter)
- [Demonstração do Projeto](#desmontração-de-uso)

---

## Habilidades requeridas

- Entender o que são Métodos Ágeis.

- Entender o que é Kanban.

- Entender o que é Scrum.

- Trabalhar em equipes utilizando Kanban ou Scrum de maneira eficaz.

- Praticar todas as habilidades desenvolvidas até agora no módulo de Front-End.

---

## O que foi desenvolvido

Neste projeto foi implementado uma versão simplificada, sem persistência no banco de dados, de uma loja online, desenvolvendo em grupo suas funcionalidades de acordo com demandas definidas em um quadro Kanban, em um cenário mais próximo ao do mercado de trabalho.

A partir dessas demandas, temos uma aplicação onde o usuário pode:

- Buscar produtos por termos e categorias a partir da API do Mercado Livre;

- Interagir com os produtos buscados de modo a adicioná-los e removê-los de um carrinho de compras em diferentes quantidades;

- Visualizar detalhes e avaliações prévias de um produto, bem como criar novas avaliações;

- E por fim, finalizar a compra (simulada) dos itens selecionados.

---

## Tecnologias usadas

- `javascript`, `React` e `css`.

---

## ANTES DE INICIALIZAR A APLICAÇÃO:

1. Clone o repositório
  * `git clone git@github.com:Gustavo-trybedev/Project-Online-Store.git`
  * Entre na pasta do repositório na sua máquina:
    * `Project-Online-Store`

2. Instale as dependências
   * `npm install`

3.  Inicialize o projeto
    * Utilize o comando `npm start` dentro da pasta `Project-Online-Store` para rodar o projeto em sua máquina.

---

## Documentação da API do Mercado Livre

Sua página _web_ irá consumir os dados da API do _Mercado Livre_ para realizar a busca de itens da sua loja online. Para realizar essas buscas, vocês precisarão consultar os seguintes _endpoints_:

- Para listar as categorias disponíveis:
  - Tipo da requisição: `GET`
  - Endpoint: https://api.mercadolibre.com/sites/MLB/categories
- Para buscar por itens por termo:
  - Tipo da requisição: `GET`
  - Parâmetro de busca $QUERY (este parâmetro deve ser substituído pelo valor do campo de busca)
  - Endpoint: https://api.mercadolibre.com/sites/MLB/search?q=$QUERY
- Para buscar itens por categoria:
  - Tipo da requisição: `GET`
  - Parâmetro de busca $CATEGORY_ID (este parâmetro deve ser substituído pelo ID da categoria selecionada)
  - Endpoint: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID
- Para buscar itens de uma categoria por termo (vale ressaltar, que este endpoint não necessariamente precisa receber ambos os parâmetros para funcionar):
  - Tipo da requisição: `GET`
  - Parâmetro de busca $QUERY (este parâmetro deve ser substituído pelo valor do campo de busca)
  - Parâmetro de busca $CATEGORY_ID (este parâmetro deve ser substituído pelo ID da categoria selecionada)
  - Endpoint: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY
- Para buscar detalhes de um item especifico:
  - Tipo de requisição: `GET`
  - Parâmetro de busca $PRODUCT_ID (este parâmetro deve ser substituído pelo valor do campo de busca)
  - Endpoint: https://api.mercadolibre.com/items/$PRODUCT_ID


Se você quiser aprender mais sobre a API do _Mercado Livre_, veja a [documentação](https://developers.mercadolivre.com.br/pt_br/itens-e-buscas).

### Exemplo de requisição para listar categorias

```
"https://api.mercadolibre.com/sites/MLB/categories"
```

O retorno desse endpoint será algo no formato:

```json
[
    {
        "id": "MLB5672",
        "name": "Acessórios para Veículos"
    },
    ...
]
```

### Exemplo de requisição de busca

```
"https://api.mercadolibre.com/sites/MLB/search?category=MLB1055&q=Motorola"
```

O retorno desse endpoint será algo como o exemplo que temos [neste arquivo](exemplo-motorola.json).

⚠ **ATENÇÃO! Se der erro de CORS aperte `ctrl + shift + r` no seu navegador** ⚠

---

### Linter

Para garantir a qualidade do código, foi utilizado neste projeto os linters `ESLint` e `StyleLint`.
Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível
e de fácil manutenção! Para rodá-los localmente no projeto, execute os comandos abaixo:

```bash
npm run lint
npm run lint:styles
```

Quando é executado o comando `npm run lint:styles`, ele irá avaliar se os arquivos com a extensão `CSS` estão com o padrão correto.

Quando é executado o comando `npm run lint`, ele irá avaliar se os arquivos com a extensão `JS` e `JSX` estão com o padrão correto.

---

## Desmontração de Uso

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGlwNnd5d3Rxcm5janRxMWR3bnEzN2IwMWFnMTM2anZmbzlteTU1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qh8GEBlpEtbNtUczS3/giphy.gif">
