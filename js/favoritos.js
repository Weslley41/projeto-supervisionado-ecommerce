function favoritar(prod_id, details = false) {
	if (details) {
		let btnFav = document.getElementById('btn-prod-fav');
		acao = btnFav.value;
		if (acao == 'adicionar') {
			btnFav.value = 'remover';
			btnFav.innerText = 'Remover dos favoritos';
		} else {
			btnFav.value = 'adicionar';
			btnFav.innerText = 'Adicionar aos favoritos';
		}
	} else {
		acao = document.getElementById('fav-produto' + prod_id).checked ? 'adicionar' : 'remover';
	}

	let fav = new XMLHttpRequest();
	fav.open('GET', '/ecommerce/php/view/requests/gerenciamento_favoritos.php?acao=' + acao + '&prod_id=' + prod_id, true);
	fav.send();
}

function selecionaFavoritos() {
	let favoritos = new XMLHttpRequest();
	favoritos.open('GET', '/ecommerce/php/view/requests/gerenciamento_favoritos.php?acao=visualizar', true);
	favoritos.send();

	favoritos.onreadystatechange = function() {
		let listaFavoritos = JSON.parse(favoritos.responseText);
		
		listaFavoritos.forEach(favorito => {
			document.getElementById('fav-produto' + favorito).checked = true;
		});
	}
}

function selecionarFavoritoDetalhes(prod_id) {
	let btnFav = document.getElementById('btn-prod-fav');
	// let prod_id = window.location.search.split('=')[1];
	let favoritos = new XMLHttpRequest();
	favoritos.open('GET', '/ecommerce/php/view/requests/gerenciamento_favoritos.php?acao=visualizar', true);
	favoritos.send();

	favoritos.onreadystatechange = function() {
		let listaFavoritos = JSON.parse(favoritos.responseText);

		if (listaFavoritos.includes(prod_id)) {
			btnFav.value = 'remover';
			btnFav.innerText = 'Remover dos favoritos';
		} else {
			btnFav.value = 'adicionar';
			btnFav.innerText = 'Adicionar aos favoritos';
		}
	}
}

function mostraFavoritos() {
	if (document.querySelector('#box-conteudo') == null) {
		let body = document.querySelector('body');
		let boxConteudo = document.createElement('div');
		boxConteudo.id = 'box-conteudo';
		let boxTitulo = document.createElement('div');
		boxTitulo.id = 'box-titulo';
		let title = document.createElement('h2');
		title.innerText = 'Produtos favoritados';
		boxTitulo.appendChild(title);
		let separador = document.createElement('hr');
		boxTitulo.appendChild(separador);
		boxConteudo.appendChild(boxTitulo);
		let boxProdutos = document.createElement('div');
		boxProdutos.id = 'resultados-busca';
		boxConteudo.appendChild(boxProdutos);
		body.appendChild(boxConteudo);
	}

	let favoritos = new XMLHttpRequest();
	favoritos.open('GET', '/ecommerce/php/view/requests/buscaProduto.php?user_busca=favoritos&limite=' + pagina * 20, true);
	favoritos.send();

	favoritos.onreadystatechange = function() {
		if (document.querySelectorAll('#resultados-busca .produto').length) {
			document.querySelectorAll('#resultados-busca .produto').forEach(element => element.remove());
		}

		let response = JSON.parse(favoritos.responseText);
		response.produtos.forEach(produto => {
			let srcImagem = produto.imagens[0].caminho;
			criarProduto('#resultados-busca', produto.id, produto.nome, produto.valor, srcImagem);
		})
		selecionaFavoritos();
		criarControlador(response.quantidade, 20, 'mostraFavoritos()');
	}
}
