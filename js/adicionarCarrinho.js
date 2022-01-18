function adicionarAoCarrinho(prod_id) {
	let adicionar = new XMLHttpRequest();
	adicionar.open('GET', '/ecommerce/php/view/requests/gerenciador_carrinho.php?acao=adicionar&qntd=1&id=' + prod_id, true);
	adicionar.send();
	mudaBtnCart(true, prod_id);
}

function removerDoCarrinho(prod_id) {
	let remover = new XMLHttpRequest();
	remover.open('GET', '/ecommerce/php/view/requests/gerenciador_carrinho.php?acao=remover&id=' + prod_id, true);
	remover.send();
	mudaBtnCart(false, prod_id);
}

function mudaBtnCart(noCarrinho, prod_id) {
	let btnCart = document.getElementById('btn-add-cart');
	if (noCarrinho) {
		btnCart.innerText = 'Remover do carrinho';
		btnCart.setAttribute('onclick', 'removerDoCarrinho(' + prod_id + ')');
	} else {
		btnCart.innerText = 'Adicionar ao carrinho';
		btnCart.setAttribute('onclick', 'adicionarAoCarrinho(' + prod_id + ')');
	}
}

function verificaProdCart() {
	let inCart = new XMLHttpRequest();
	inCart.open('GET', '/ecommerce/php/view/requests/gerenciador_carrinho.php?acao=inCart&id=' + getID(), true);
	inCart.send();

	inCart.onreadystatechange = () => {
		if (inCart.readyState == inCart.DONE) {
			let response = inCart.responseText;
			mudaBtnCart(response, getID());
		}
	}
}
