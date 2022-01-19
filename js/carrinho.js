function adicionarAoCarrinho(prod_id, qntd_produto=1, changeButton=true) {
	let adicionar = new XMLHttpRequest();
	adicionar.open('GET', '/ecommerce/php/view/requests/gerenciador_carrinho.php?acao=adicionar&qntd=' + qntd_produto + '&id=' + prod_id, true);
	adicionar.send();
	if (changeButton) {
		mudaBtnCart(true, prod_id);
	}
}

function removerDoCarrinho(prod_id, changeButton=true) {
	let remover = new XMLHttpRequest();
	remover.open('GET', '/ecommerce/php/view/requests/gerenciador_carrinho.php?acao=remover&id=' + prod_id, true);
	remover.send();
	if (changeButton) {
		mudaBtnCart(false, prod_id);
	}
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

function mostraCarrinho() {
	if (document.querySelector('#box-conteudo') == null) {
		let body = document.querySelector('body');
		let boxConteudo = document.createElement('div');
		boxConteudo.id = 'box-conteudo';
		let boxProdutos = document.createElement('div');
		boxProdutos.id = 'conteudo-carrinho';
		let boxTitulo = document.createElement('div');
		boxTitulo.id = 'box-titulo';
		let title = document.createElement('h2');
		title.innerText = 'Carrinho de compras';
		boxTitulo.appendChild(title);
		let separador = document.createElement('hr');
		boxTitulo.appendChild(separador);
		boxProdutos.appendChild(boxTitulo);
		boxConteudo.appendChild(boxProdutos);
		let boxResumo = document.createElement('div');
		boxResumo.id = 'resumo-carrinho';
		boxConteudo.appendChild(boxResumo);
		body.appendChild(boxConteudo);
	} else if (document.querySelectorAll('#conteudo-carrinho .box-produto').length) {
		document.querySelectorAll('#conteudo-carrinho .box-produto').forEach(produto => produto.remove());
	}

	let carrinho = new XMLHttpRequest();
	carrinho.open('GET', '/ecommerce/php/view/requests/buscaProduto.php?user_busca=carrinho', true);
	carrinho.send();

	carrinho.onreadystatechange = () => {
		if (carrinho.readyState == carrinho.DONE) {
			carrinho = JSON.parse(carrinho.responseText);
			let boxProdutos = document.getElementById('conteudo-carrinho');

			carrinho.produtos.forEach(produto => {
				let boxProduto = document.createElement('div');
				boxProduto.id = 'produto-' + produto.id;
				boxProduto.className = 'box-produto';

				let imagemProduto = document.createElement('img');
				imagemProduto.id = 'imagem-produto';
				imagemProduto.src = produto.imagens[0].caminho;
				boxProduto.appendChild(imagemProduto);

				let nomeValorProduto = document.createElement('div');
				nomeValorProduto.id = 'nome-valor-produto';
				let nomeProduto = document.createElement('div');
				nomeProduto.id = 'nome-produto';
				nomeProduto.innerText = produto.nome[0].toUpperCase() + produto.nome.slice(1);
				nomeValorProduto.appendChild(nomeProduto);
				let valorProduto = document.createElement('div');
				valorProduto.id = 'valor-produto';
				valorProduto.innerText = 'R$ ' + produto.valor.toFixed(2).replace('.', ',');
				nomeValorProduto.appendChild(valorProduto);
				boxProduto.appendChild(nomeValorProduto)

				let boxBotoes = document.createElement('div');
				boxBotoes.id = 'box-botoes';
				let btnDiminuir = document.createElement('button');
				btnDiminuir.innerText = '-';
				btnDiminuir.setAttribute('onclick', 'diminuiProd(' + produto.id + ')');
				btnDiminuir.id = 'btn-diminuir';
				btnDiminuir.className = 'btn-qntd';
				boxBotoes.appendChild(btnDiminuir);
				let inputQntd = document.createElement('input');
				inputQntd.id = 'input-qntd';
				inputQntd.type = 'number';
				inputQntd.required = 'true';
				inputQntd.setAttribute('onkeyup', 'alteraQuantidade(' + produto.id + ')');
				inputQntd.value = produto.qntd_produto;
				boxBotoes.appendChild(inputQntd);
				let btnAcrescentar = document.createElement('button');
				btnAcrescentar.innerText = '+';
				btnAcrescentar.setAttribute('onclick', 'acrescentaProd(' + produto.id + ')');
				btnAcrescentar.id = 'btn-acrescentar';
				btnAcrescentar.className = 'btn-qntd';
				boxBotoes.appendChild(btnAcrescentar);
				boxProduto.appendChild(boxBotoes);

				boxProdutos.appendChild(boxProduto);
			});
		}
	}
}

function diminuiProd(prod_id) {
	--document.querySelector('#produto-' + prod_id + ' #input-qntd').value;
	alteraQuantidade(prod_id)
}

function acrescentaProd(prod_id) {
	++document.querySelector('#produto-' + prod_id + ' #input-qntd').value;
	alteraQuantidade(prod_id)
}

function alteraQuantidade(prod_id) {
	let novaQntd = document.querySelector('#produto-' + prod_id + ' #input-qntd').value;

	novaQntd = novaQntd === '' ? 0 : novaQntd;
	if (novaQntd <= 0) {
		if (confirm('Remover produto?')) {
			removerDoCarrinho(prod_id, false);
			mostraCarrinho();
		} else {
			document.querySelector('#produto-' + prod_id + ' #input-qntd').value = 1;
		}
	} else {
		adicionarAoCarrinho(prod_id, novaQntd, false);
	}
}
