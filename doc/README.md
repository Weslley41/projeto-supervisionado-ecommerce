# **Especificação de Requisitos**

## Sumário
1. [Visão geral](#visão-geral)
2. [Requisitos funcionais](#requisitos-funcionais)
	1. [Gerenciar produtos](#gerenciar-produtos)
	2. [Gerenciar categorias e tags](#gerenciar-categorias-e-tags)
	3. [Visualizar pedidos](#visualizar-pedidos)
	4. [Pesquisar produtos](#pesquisar-produtos)
	5. [Visualizar produto](#visualizar-produto)
	6. [Favoritar produto](#favoritar-produto)
	7. [Visualizar favoritos](#visualizar-favoritos)
	8. [Adicionar produto ao carrinho de compras](#adicionar-produto-ao-carrinho-de-compras)
	9. [Acessar carrinho de compras](#acessar-carrinho-de-compras)
	10. [Confirmar pedido](#confirmar-pedido)
	11. [Finalizar pedido](#finalizar-pedido)
	12. [Registrar/Entrar no site](#registrarentrar-no-site)
	13. [Mudar tema](#mudar-tema)

## Visão Geral
O sistema se resulta em uma loja virtual de artigos esportivos, mas com possibilidade de ser facilmente alterado para outros nichos. Visando também a fácil navegação pelo site.

## Requisitos Funcionais

### Gerenciar produtos
- Visualizar produtos

	Exibe a lista de todos os produtos cadastrados.

	![Menu - lista de produtos](screenshots/dark_mode/admin_menu_produtos.png#gh-dark-mode-only)
	![Menu - lista de produtos](screenshots/light_mode/admin_menu_produtos.png#gh-light-mode-only)
	Lista de produtos Ativos:
	![Lista de produtos Ativos](screenshots/dark_mode/admin_lista_produtos.png#gh-dark-mode-only)
	![Lista de produtos Ativos](screenshots/light_mode/admin_lista_produtos.png#gh-light-mode-only)
	Lista de produtos inativos:
	![Lista de produtos Inativos](screenshots/dark_mode/admin_lista_inativos.png#gh-dark-mode-only)
	![Lista de produtos Inativos](screenshots/light_mode/admin_lista_inativos.png#gh-light-mode-only)
- Cadastrar produto

	Permite ao administrador fazer o cadastro de novos produtos.
	![Cadastrar produto](screenshots/dark_mode/admin_novo_produto.png#gh-dark-mode-only)
	![Cadastrar produto](screenshots/light_mode/admin_novo_produto.png#gh-light-mode-only)
- Atualizar produto

	Permite ao administrador fazer alterações sobre produtos já existentes.
	![Atualizar produto](screenshots/dark_mode/admin_editar_produto.png#gh-dark-mode-only)
	![Atualizar produto](screenshots/light_mode/admin_editar_produto.png#gh-light-mode-only)
- Remover produto

	Permite ao administrador excluir produtos já existentes.
- Atualizar estoque

	Permite ao administrador atualizar a quantidade de um produto já existente.
### Gerenciar categorias e tags
- Visualizar categorias ou tags

	Exibe a lista de categorias ou tags existentes.
	![Visualizar categorias ou tags](screenshots/dark_mode/admin_listagem.png#gh-dark-mode-only)
	![Visualizar categorias ou tags](screenshots/light_mode/admin_listagem.png#gh-light-mode-only)
- Ver onde estão sendo utilizadas

	Exibe uma lista de todos os produtos cadastrados com a categoria ou tag selecionada.
	![Utilizações categorias ou tags](screenshots/dark_mode/admin_utilizacoes.png#gh-dark-mode-only)
	![Utilizações categorias ou tags](screenshots/light_mode/admin_utilizacoes.png#gh-light-mode-only)
- Cadastrar nova categoria ou tag

	Permite ao administrador cadastrar novas categorias ou tags.
	![Cadastrar novo filtro](screenshots/dark_mode/admin_novo_filtro.png#gh-dark-mode-only)
	![Cadastrar novo filtro](screenshots/light_mode/admin_novo_filtro.png#gh-light-mode-only)
- Remover categoria ou tag

	Permite ao administrador excluir categorias ou tags não utilizadas.
### Visualizar pedidos
Exibe a lista de pedidos.
![Visualizar pedidos](screenshots/dark_mode/admin_pedidos.png#gh-dark-mode-only)
![Visualizar pedidos](screenshots/light_mode/admin_pedidos.png#gh-light-mode-only)
### Pesquisar produtos
- Pesquisar produtos por nome

	Permite ao usuário fazer uma busca pelo nome do produto e exibe uma lista dos produtos relacionados.
	![Pesquisar produtos](screenshots/dark_mode/user_busca.png#gh-dark-mode-only)
	![Pesquisar produtos](screenshots/light_mode/user_busca.png#gh-light-mode-only)
- Filtrar pesquisa com categoria e tags

	Permite ao usuário filtrar ou não sua pesquisa com categoria e tags.
	![Pesquisar produtos com filtros](screenshots/dark_mode/user_busca_filtro.png#gh-dark-mode-only)
	![Pesquisar produtos com filtros](screenshots/light_mode/user_busca_filtro.png#gh-light-mode-only)
- Pesquisar produtos por categoria e tags

	Exibe os produtos que estejam ligados à categoria e tags selecionadas.
### Visualizar produto
Exibe uma página sobre o produto selecionado.
![Visualizar produto](screenshots/dark_mode/user_produto.png#gh-dark-mode-only)
![Visualizar produto](screenshots/light_mode/user_produto.png#gh-light-mode-only)
### Favoritar produto
Permite ao usuário favoritar produtos.
### Visualizar favoritos
Exibe todos os produtos favoritados pelo usuário.
![Visualizar favoritos](screenshots/dark_mode/user_favoritos.png#gh-dark-mode-only)
![Visualizar favoritos](screenshots/light_mode/user_favoritos.png#gh-light-mode-only)
### Adicionar produto ao carrinho de compras
Permite ao usuário adicionar produtos no carrinho de compras.
### Acessar carrinho de compras
Exibe todos os produtos adicionados ao carrinho pelo usuário e seu valor total.
![Visualizar carrinho](screenshots/dark_mode/user_carrinho.png#gh-dark-mode-only)
![Visualizar carrinho](screenshots/light_mode/user_carrinho.png#gh-light-mode-only)
### Confirmar pedido
Exibe o resumo da compra para que o usuário possa ter a certeza do que está pedindo.
![Resumo do carrinho](screenshots/dark_mode/user_finalizar_compra.png#gh-dark-mode-only)
![Resumo do carrinho](screenshots/light_mode/user_finalizar_compra.png#gh-light-mode-only)
### Finalizar pedido
Após a confirmação do pedido, o sistema irá processar o pedido e exibirá uma mensagem confirmando sua compra.
### Registrar/Entrar no site
Permite utilizar uma conta da Google para ter acesso completo ao site.
![Página de Login](screenshots/dark_mode/login.png#gh-dark-mode-only)
![Página de Login](screenshots/light_mode/login.png#gh-light-mode-only)
### Mudar tema
Permite alterar o tema do site entre o modo claro e o modo escuro.
