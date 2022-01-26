function buscarProdutos() {
	if (document.getElementById('box-conteudo') == null) {
		let body = document.querySelector('body');
		let boxConteudo = document.createElement('div');
		boxConteudo.id = 'box-conteudo';
		body.appendChild(boxConteudo);
	}

	let contentProdutos = new XMLHttpRequest();
	contentProdutos.onreadystatechange = () =>  {
		if (contentProdutos.readyState == contentProdutos.DONE) {
			if (document.getElementById('resultados-busca') == null) {
				criarSubtitleBusca();
				let boxConteudo = document.getElementById('box-conteudo');
				let resultadosBusca = document.createElement('div');
				resultadosBusca.id = 'resultados-busca';
				boxConteudo.appendChild(resultadosBusca);
			} else {
				document.getElementById('resultados-busca').innerHTML = '';
			}
			
			let response = JSON.parse(contentProdutos.responseText);
			document.querySelector('p.title').innerText = response.quantidade + ' Resultados encontrados';
			response.produtos.forEach(produto => {
				criarProduto('#resultados-busca', produto.id, produto.nome, produto.valor, produto.imagens[0].caminho);
			})
			
			criarControlador(response.quantidade, 20, 'buscarProdutos()');
		}
	}

	contentProdutos.open('GET', '/ecommerce/php/view/requests/buscaProduto.php' + window.location.search + '&order=' + ordenacao() + '&limite=' + pagina * 20, true);
	contentProdutos.send();
	filtrosAtivos();
}

function getBusca() {
	return document.querySelector('input#busca').value;
}

function criarSubtitleBusca() {
	let boxConteudo = document.getElementById('box-conteudo');
	let subtitle = document.createElement('span');
	subtitle.className = 'sub-title';
	let title = document.createElement('p');
	title.className = 'title';
	title.innerText = '0 Resultados encontrados';
	subtitle.appendChild(title);

	// Select order
	let select = document.createElement('select');
	select.id = 'box-ordenar';
	select.name = 'order';
	select.setAttribute('onclick', 'buscarProdutos()');
	select.innerHTML = '<option value="postagem1">Mais novos</option><option value="postagem0">Mais antigos</option><option value="popularidade1">Mais populares</option><option value="popularidade0">Menos populares</option><option value="valor1">Mais caro</option><option value="valor0">Mais barato</option><option selected value="nome0">Nome A-Z</option><option value="nome1">Nome Z-A</option>'

	subtitle.appendChild(select);
	boxConteudo.appendChild(subtitle);
}

function ordenacao() {
	if (document.getElementById('box-ordenar') == null) {
		return 'nome0';
	}

	return document.getElementById('box-ordenar').value;
}
