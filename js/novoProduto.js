function paginaNovoProduto() {
	let body = document.querySelector('body');
	let boxConteudo = document.createElement('div');
	boxConteudo.id = 'box-conteudo';

	let title = document.createElement('h1');
	title.innerText = 'Cadastrar produto';
	let hr = document.createElement('hr');

	boxConteudo.appendChild(title);
	boxConteudo.appendChild(hr);

	let content = document.createElement('div');
	content.className = 'content';
	let form = document.createElement('form');
	form.method = 'POST';
	form.enctype = 'multipart/form-data';
	let inputNome = document.createElement('input');
	inputNome.name = 'nome';
	inputNome.id = 'input-nome';
	inputNome.placeholder = 'Nome do produto';
	form.appendChild(inputNome);
	let duasColunas1 = document.createElement('span');
	duasColunas1.className = 'duas-colunas';
	let inputValor = document.createElement('input');
	inputValor.name = 'valor';
	inputValor.id = 'input-valor';
	inputValor.placeholder = 'Valor';
	duasColunas1.appendChild(inputValor);
	let inputCategoria = document.createElement('select');
	inputCategoria.id = 'select-categoria';
	inputCategoria.name = 'categoria'	
	duasColunas1.appendChild(inputCategoria);
	form.appendChild(duasColunas1);
	let duasColunas2 = document.createElement('span');
	duasColunas2.className = 'duas-colunas';
	let inputEstoque = document.createElement('input');
	inputEstoque.name = 'estoque';
	inputEstoque.id = 'input-estoque';
	inputEstoque.placeholder = 'Estoque';
	duasColunas2.appendChild(inputEstoque);
	let inputTags = document.createElement('select');
	inputTags.id = 'select-tags';
	inputTags.name = 'tag[]';
	inputTags.multiple = 'true';
	duasColunas2.appendChild(inputTags);
	form.appendChild(duasColunas2);

	let inputThumb = document.createElement('input');
	inputThumb.type = 'file';
	inputThumb.name = 'thumb-image';
	inputThumb.accept = '.jpg';
	inputThumb.id = 'input-thumb';
	inputThumb.addEventListener('change', previewImagens);
	form.appendChild(inputThumb);
	let inputImagens = document.createElement('input');
	inputImagens.type = 'file';
	inputImagens.name = 'images[]';
	inputImagens.accept = '.jpg';
	inputImagens.id = 'input-imgs';
	inputImagens.multiple = 'true';
	inputImagens.addEventListener('change', previewImagens);
	form.appendChild(inputImagens);

	let duasColunasBotoes = document.createElement('span');
	duasColunasBotoes.className = 'duas-colunas-botoes';
	let btn_reset = document.createElement('button');
	btn_reset.className = 'btn-padrao';
	btn_reset.type = 'reset';
	btn_reset.setAttribute('onclick', 'limpaPreview()');
	btn_reset.innerText = 'Limpar';
	duasColunasBotoes.appendChild(btn_reset);
	let btn_confirm = document.createElement('button');
	btn_confirm.className = 'btn-padrao';
	btn_confirm.name = 'btn-cadastrar';
	btn_confirm.value = 'on';
	btn_confirm.innerText = 'Cadastrar';
	duasColunasBotoes.appendChild(btn_confirm);
	form.appendChild(duasColunasBotoes);

	content.appendChild(form);
	boxConteudo.appendChild(content);
	body.appendChild(boxConteudo);
	insereCategorias();
	insereTags();
}

function insereCategorias() {
	let select = document.getElementById('select-categoria');
	let request = new XMLHttpRequest();

	request.onreadystatechange = () => {
		if (document.querySelectorAll('#select-categoria option').length > 0) {
			document.querySelectorAll('#select-categoria option').forEach(element => element.remove());
		}
		let response = JSON.parse(request.responseText);
	
		response.categorias.forEach(categoria => {
			let nome = categoria.nome[0].toUpperCase() + categoria.nome.slice(1).toLowerCase();
			let option = document.createElement('option');
			option.id = 'c' + categoria.id;
			option.value = categoria.id;
			option.innerText = nome;
			select.appendChild(option);
		});
	}

	request.open('GET', '/ecommerce/php/view/requests/buscaCategoriasTags.php?tipo=categoria', true);
	request.send();
}

function insereTags() {
	let select = document.getElementById('select-tags');
	let request = new XMLHttpRequest();

	request.onreadystatechange = () => {
		if (document.querySelectorAll('#select-tags option').length > 0) {
			document.querySelectorAll('#select-tags option').forEach(element => element.remove());
		}
		let response = JSON.parse(request.responseText);
	
		response.tags.forEach(tag => {
			let nome = tag.nome[0].toUpperCase() + tag.nome.slice(1).toLowerCase();
			let option = document.createElement('option');
			option.id = 't'+ tag.id;
			option.value = tag.id;
			option.innerText = nome;
			select.appendChild(option);
		});
	}

	request.open('GET', '/ecommerce/php/view/requests/buscaCategoriasTags.php?tipo=tags', true);
	request.send();
}

function previewImagens() {
	if (document.getElementById('box-imagens') == null) {
		let content = document.querySelector('.content');
		let boxImagens = document.createElement('div');
		boxImagens.id = 'box-imagens';
		let imagemPreview = document.createElement('img');
		imagemPreview.id = 'img-preview';
		boxImagens.appendChild(imagemPreview)
		
		let duasColunasBotoes = document.createElement('span');
		duasColunasBotoes.className = 'duas-colunas-botoes';
		let btn_anterior = document.createElement('button');
		btn_anterior.className = 'btn-padrao';
		btn_anterior.id = 'btn-anterior';
		btn_anterior.setAttribute('onclick', 'diminui()');
		btn_anterior.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>';
		duasColunasBotoes.appendChild(btn_anterior);
		let btn_proximo = document.createElement('button');
		btn_proximo.className = 'btn-padrao';
		btn_proximo.id = 'btn-proximo';
		btn_proximo.setAttribute('onclick', 'acrescenta()');
		btn_proximo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>';
		duasColunasBotoes.appendChild(btn_proximo);
		boxImagens.append(duasColunasBotoes);

		content.appendChild(boxImagens);
	}

	let thumb = document.getElementById('input-thumb').files;
	let imagens = document.getElementById('input-imgs').files;

	let lista_imagens = Array(thumb[0]);
	for (let i = 0; i < imagens.length; i++) {
		lista_imagens.push(imagens[i]);
	}

	document.getElementById('box-imagens').style.display = 'flex';
	let imagemPreview = document.getElementById('img-preview');
	imagemPreview.src = URL.createObjectURL(lista_imagens[index_img]);
	controladorBotoes(lista_imagens.length);
}

function limpaPreview() {
	let preview = document.getElementById('box-imagens');
	preview.style.display = 'none';
	index_img = 0;
}

function controladorBotoes(len) {
	if (index_img == 0) {
		let btn = document.getElementById('btn-anterior');
		btn.disabled = true;
		btn.style.opacity = .5;
	} else {
		let btn = document.getElementById('btn-anterior');
		btn.disabled = false;
		btn.style.opacity = 1;
	}

	if (index_img == len - 1) {
		let btn = document.getElementById('btn-proximo');
		btn.disabled = true;
		btn.style.opacity = .5;
	} else {
		let btn = document.getElementById('btn-proximo');
		btn.disabled = false;
		btn.style.opacity = 1;
	}
}

function acrescenta() {
	++index_img;
	previewImagens();
}

function diminui() {
	--index_img;
	previewImagens();
}

var index_img = 0;
