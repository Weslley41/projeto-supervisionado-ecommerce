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
