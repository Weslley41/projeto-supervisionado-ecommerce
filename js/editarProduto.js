function editarProduto() {
	paginaNovoProduto();
	let url = new URLSearchParams(window.location.search);
	let id_prod = url.get('id');

	// Alterando alguns itens da página
	document.querySelector('#box-conteudo h1').innerText = 'Atualizar produto';
	let botoes = document.querySelectorAll('.btn-padrao');
	botoes[0].innerText = 'Cancelar';
	botoes[0].setAttribute('onclick', 'window.history.back()');
	botoes[1].innerText = 'Atualizar';
	botoes[1].name = 'btn-atualizar';

	// Pegando dados do produto
	let busca = new XMLHttpRequest();

	busca.onreadystatechange = () => {
		response = JSON.parse(busca.responseText);

		document.getElementById('input-nome').value = response.produto.nome;
		document.getElementById('input-valor').value = response.produto.valor;
		document.getElementById('input-estoque').value = response.produto.estoque;
		document.getElementById('c' + response.produto.categoria[0].id).selected = true;
		response.produto.tags.forEach(tag => document.getElementById('t' + tag.id).selected = true);
		document.getElementById('input-thumb')
		document.getElementById('input-imgs')
	}

	busca.open('GET', '/ecommerce/php/view/requests/buscaProduto.php?edicao=1&id=' + id_prod, true);
	busca.send();
}
