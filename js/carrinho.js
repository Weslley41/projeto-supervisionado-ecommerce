function adicionarAoCarrinho(prod_id, qntd_produto=1, changeButton=true) {
	let adicionar = new XMLHttpRequest();
	adicionar.open('GET', '/ecommerce/php/view/requests/gerenciador_carrinho.php?acao=adicionar&qntd=' + qntd_produto + '&id=' + prod_id, true);
	adicionar.send();
	if (changeButton) {
		mudaBtnCart(true, prod_id);
	}

	adicionar.onreadystatechange = () => {
		if (adicionar.readyState == adicionar.DONE) {
			atualizaTotalCarrinho();
		}
	}
}

function removerDoCarrinho(prod_id, changeButton=true) {
	let remover = new XMLHttpRequest();
	remover.open('GET', '/ecommerce/php/view/requests/gerenciador_carrinho.php?acao=remover&id=' + prod_id, true);
	remover.send();
	if (changeButton) {
		mudaBtnCart(false, prod_id);
	} else {
		mostraCarrinho();
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
		let boxTotal = document.createElement('div');
		boxTotal.id = 'total-carrinho';
		let titulo = document.createElement('div');
		titulo.id = 'titulo-total-carrinho';
		titulo.innerText = 'Pedido';
		boxTotal.appendChild(titulo);
		let subtotal = document.createElement('div');
		subtotal.id = 'subtotal-carrinho';
		let labelTotal = document.createElement('span');
		labelTotal.id = 'label-total-carrinho';
		labelTotal.innerText = 'Subtotal';
		subtotal.appendChild(labelTotal);
		let valorTotal = document.createElement('span');
		valorTotal.id = 'valor-total-carrinho';
		subtotal.appendChild(valorTotal);
		boxTotal.appendChild(subtotal)
		let btnFinalizarCompra = document.createElement('button');
		btnFinalizarCompra.id = 'btn-finalizar-compra';
		btnFinalizarCompra.className = 'btn-padrao';
		btnFinalizarCompra.innerText = 'Finalizar compra'
		btnFinalizarCompra.setAttribute('onclick', 'popupConfirmarCompra()');
		boxTotal.appendChild(btnFinalizarCompra);
		boxConteudo.appendChild(boxTotal);
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

			let somaProdutos = 0;
			carrinho.produtos.forEach(produto => {
				somaProdutos += produto.valor * produto.qntd_produto;
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
				let btnRemover = document.createElement('button');
				btnRemover.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
				btnRemover.id = 'btn-remover';
				btnRemover.className = 'btn-qntd';
				btnRemover.setAttribute('onclick', 'popupExcluirProduto(' + produto.id + ', false)');
				boxBotoes.appendChild(btnRemover);
				boxProduto.appendChild(boxBotoes);

				boxProdutos.appendChild(boxProduto);
			});
			document.getElementById('valor-total-carrinho').innerText = 'R$ ' + somaProdutos.toFixed(2).replace('.', ',');
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
		popupExcluirProduto(prod_id, true);
	} else {
		adicionarAoCarrinho(prod_id, novaQntd, false);
	}
}

function atualizaTotalCarrinho() {
	let valorTotal = new XMLHttpRequest();
	valorTotal.open('GET', '/ecommerce/php/view/requests/gerenciador_carrinho.php?acao=valores', true);
	valorTotal.send();

	let somaProdutos = 0;
	valorTotal.onreadystatechange = () => {
		if (valorTotal.readyState == valorTotal.DONE) {
			produtos = JSON.parse(valorTotal.responseText);
			produtos.produtos.forEach(produto => {
				somaProdutos += produto.valor * produto.qntd_produto;
			})
			document.getElementById('valor-total-carrinho').innerText = 'R$ ' + somaProdutos.toFixed(2).replace('.', ',');
		}
	}
}

function popupExcluirProduto(prod_id, reset) {
	criarPopup('Remover produto', 'Você deseja remover este produto do carrinho?');
	let botoes = [['Cancelar', 'btn-cancelar', 'verificaAcaoRemover(' + prod_id + ', 0)'], ['Remover', 'btn-confirmar', 'verificaAcaoRemover(' + prod_id + ', 1)']];
	botoesSemReset = [['Cancelar', 'btn-cancelar', 'fecharPopup()'], ['Remover', 'btn-confirmar', 'fecharPopup();removerDoCarrinho(' + prod_id + ', false)']];
	if (reset) {
		criarBotoes(botoes);
	} else {
		criarBotoes(botoesSemReset);
	}
}

function verificaAcaoRemover(prod_id, acao) {
	fecharPopup();
	if (acao) {
		removerDoCarrinho(prod_id, false);
	} else {
		document.querySelector('#produto-' + prod_id + ' #input-qntd').value = 1;
		adicionarAoCarrinho(prod_id, 1, false);
	}
}

function popupConfirmarCompra() {
	criarPopup('Confirme sua compra', '');
	let botoes = [['Cancelar', 'btn-cancelar', 'fecharPopup()'], ['Confirmar', 'btn-confirmar', 'fecharPopup()']];
	criarBotoes(botoes);

	let carrinhoFinal = new XMLHttpRequest();
	carrinhoFinal.open('GET', '/ecommerce/php/view/requests/buscaProduto.php?user_busca=carrinho', true);
	carrinhoFinal.send();

	carrinhoFinal.onreadystatechange = () => {
		if (carrinhoFinal.readyState == carrinhoFinal.DONE) {
			let popupConteudo = document.getElementById('popup-conteudo');
			if (popupConteudo.innerHTML) {
				popupConteudo.innerHTML = '';
			}

			let somaProdutos = 0;
			let tabela = document.createElement('div');
			tabela.className = 'div-table';
			const colunas = [
				{
					"label": "Qntd",
					"id": "qntd-produto",
					"seletor": "qntd_produto"
				},
				{
					"label": "Nome do produto",
					"id": "nome-produto",
					"seletor": "nome"
				},
				{
					"label": "Valor unit.",
					"id": "valor-produto",
					"seletor": "valor"
				}
			];
			let labelsTabela = document.createElement('div');
			labelsTabela.className = 'div-thead';
			colunas.forEach(coluna => {
				let th = document.createElement('span');
				th.className = 'span-th';
				th.innerText = coluna.label;
				th.id = coluna.id;
				labelsTabela.appendChild(th);
			});
			tabela.appendChild(labelsTabela);

			let tbody = document.createElement('div');
			tbody.className = 'div-tbody'
			let produtosCarrinho = JSON.parse(carrinhoFinal.responseText);
			produtosCarrinho.produtos.forEach(produto => {
				let trProduto = document.createElement('span');
				trProduto.className = 'span-tr';
				trProduto.title = produto.nome;
				colunas.forEach(coluna => {
					let td = document.createElement('span');
					td.className = 'span-td'
					td.id = coluna.id;
					if (coluna.seletor == 'valor') {
						somaProdutos += produto.valor * produto.qntd_produto;
						td.innerText = 'R$ ' + produto.valor.toFixed(2).replace('.', ',');
					} else {
						td.innerText = produto[coluna.seletor];
					}

					trProduto.appendChild(td);
				});
				tbody.appendChild(trProduto);
			});
			tabela.appendChild(tbody);
			popupConteudo.appendChild(tabela);

			let separador = document.createElement('hr');
			separador.id = "separador-popup"
			popupConteudo.appendChild(separador);

			let total = document.createElement('div');
			total.id = 'box-valor-total';
			let labelTotal = document.createElement('span');
			labelTotal.id = 'label-valor-total';
			labelTotal.innerText = 'Total';
			total.appendChild(labelTotal);
			let valorTotal = document.createElement('span');
			valorTotal.id = 'valor-total';
			valorTotal.innerText = 'R$ ' + somaProdutos.toFixed(2).replace('.', ',');
			total.appendChild(valorTotal);
			popupConteudo.appendChild(total);
		}
	}
}
