function criarBoxSroll(localConteudo, tipo) {
	let boxConteudo = document.querySelector(localConteudo);
	let titulo = document.createElement('h2');
	titulo.className = 'title';
	titulo.innerText = tipo;
	let separador = document.createElement('hr');
	separador.className = 'separador';
	boxConteudo.appendChild(titulo);
	boxConteudo.appendChild(separador);

	let boxScroll = document.createElement('div');
	boxScroll.className = 'produtos-scroll';
	boxScroll.classList.add(tipo.toLowerCase());

	boxConteudo.appendChild(boxScroll);

	let busca = new XMLHttpRequest();
	busca.onreadystatechange = () => {
		if (busca.readyState == busca.DONE) {
			if (document.querySelector('.'+tipo.toLowerCase()) != null) {
				document.querySelector('.'+tipo.toLowerCase()).innerHTML = '';
				criarBotoesScroll(tipo.toLowerCase());
			}
			let response = JSON.parse(busca.responseText);
			
			response.produtos.forEach(produto => {
				criarProduto(".produtos-scroll."+tipo.toLowerCase(), produto.id, produto.nome, produto.valor, produto.imagens[0].caminho);
			});
			scrollProd(0, tipo.toLowerCase());
		}
	}

	busca.open('GET', '/ecommerce/php/view/requests/cardsProdutos.php?tipo='+tipo.toLowerCase(), true);
	busca.responseType = 'text';
	busca.send();
}

function criarBotoesScroll(tipo) {
	let boxScroll = document.querySelector('.produtos-scroll.'+tipo);
	let boxBotoesControle = document.createElement('div');
	boxBotoesControle.className = 'box-botoes-controle';
	let botaoEsquerda = document.createElement('button');
	botaoEsquerda.className = 'botao-controle ' + tipo;
	botaoEsquerda.id = 'btn-control-left';
	botaoEsquerda.onclick = function () { scrollProd(-250, `'${tipo}'`) };
	botaoEsquerda.innerHTML = '<svg onclick="scrollProd(-250, `'+tipo+'`)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>';
	let botaoDireita = document.createElement('button');
	botaoDireita.className = 'botao-controle ' + tipo;
	botaoDireita.id = 'btn-control-right';
	botaoDireita.innerHTML = '<svg onclick="scrollProd(250, `'+tipo+'`)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>';
	boxBotoesControle.appendChild(botaoEsquerda);
	boxBotoesControle.appendChild(botaoDireita);
	boxScroll.appendChild(boxBotoesControle);
}
