function editarProduto() {
	paginaNovoProduto();
	document.getElementById('input-thumb').style.display = 'none';
	previewImagens();

	let url = new URLSearchParams(window.location.search);
	let id_prod = url.get('id');

	// Alterando alguns itens da página
	document.querySelector('#box-conteudo h1').innerText = 'Atualizar produto';
	let botoes = document.querySelectorAll('.btn-padrao');
	botoes[0].innerText = 'Cancelar';
	botoes[0].setAttribute('onclick', 'window.history.back()');
	botoes[1].innerText = 'Atualizar';
	botoes[1].name = 'btn-atualizar';
	let form = document.querySelector('form');
	let remainingImgs = document.createElement('input');
	remainingImgs.type = 'hidden';
	remainingImgs.id = 'remaining-imgs';
	remainingImgs.name = 'remaining-imgs';
	form.appendChild(remainingImgs);

	// Pegando dados do produto
	let busca = new XMLHttpRequest();

	busca.onreadystatechange = () => {
		if (busca.readyState == busca.DONE) {
			response = JSON.parse(busca.responseText);
			
			document.getElementById('input-nome').value = response.produto.nome;
			document.getElementById('input-valor').value = response.produto.valor;
			document.getElementById('input-estoque').value = response.produto.estoque;
			document.getElementById('c' + response.produto.categoria[0].id).selected = true;
			response.produto.tags.forEach(tag => {
				document.getElementById('t' + tag.id).selected = true;
				document.querySelector('#drop-t' + tag.id + ' #check-option').style.display = 'flex';
			});
			let n_tags = response.produto.tags.length;
			if (n_tags) {
				tagsChecked = n_tags;
				if (tagsChecked > 1) {
					document.getElementById('btn-select-tags').innerText = tagsChecked + ' tags selecionadas';
				} else {
					document.getElementById('btn-select-tags').innerText = tagsChecked + ' tag selecionada';
				}
			}
			listaImagensPermanecentes();
		}
	}

	busca.open('GET', '/ecommerce/php/view/requests/buscaProduto.php?edicao=1&id=' + id_prod, true);
	busca.send();
}

function selecionarThumb() {
	let inputThumb = document.getElementById('input-thumb');
	inputThumb.click();
}

function mudarThumb() {
	let inputThumb = document.getElementById('input-thumb');
	lista_imagens[0] = inputThumb.files[0];
	previewImagens();
}

function mudarImagens() {
	let inputImgs = document.getElementById('input-imgs');
	let novasImgs = Array.from(inputImgs.files);

	novasImgs.forEach(imagem => lista_imagens.push(imagem) );
}

function removerImagem() {
	lista_imagens.splice(index_img, 1);
	--index_img;
	previewImagens();
	listaImagensPermanecentes();
}

function listaImagensPermanecentes() {
	remainingImgs = Array();
	lista_imagens.forEach(imagem => {
		if (typeof(imagem) === 'string') {
			let start = imagem.search('I') + 1;
			let end = imagem.search('.jpg');
			
			remainingImgs.push(imagem.slice(start, end));
		}
	});
	document.getElementById('remaining-imgs').value = remainingImgs.join();
}
