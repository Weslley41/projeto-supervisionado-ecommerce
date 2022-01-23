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
	inputNome.required = 'true';
	inputNome.placeholder = 'Nome do produto';
	form.appendChild(inputNome);
	let duasColunas1 = document.createElement('span');
	duasColunas1.className = 'duas-colunas';
	let inputValor = document.createElement('input');
	inputValor.name = 'valor';
	inputValor.id = 'input-valor';
	inputValor.type = 'number';
	inputValor.step = "0.01";
	inputValor.required = 'true';
	inputValor.placeholder = 'Valor';
	duasColunas1.appendChild(inputValor);
	let inputCategoria = document.createElement('select');
	inputCategoria.id = 'select-categoria';
	inputCategoria.name = 'categoria'	
	inputCategoria.required = 'true';
	duasColunas1.appendChild(inputCategoria);
	form.appendChild(duasColunas1);
	let duasColunas2 = document.createElement('span');
	duasColunas2.className = 'duas-colunas';
	let inputEstoque = document.createElement('input');
	inputEstoque.name = 'estoque';
	inputEstoque.id = 'input-estoque';
	inputEstoque.placeholder = 'Estoque';
	inputEstoque.type = 'number';
	inputEstoque.required = 'true';
	duasColunas2.appendChild(inputEstoque);
	let inputTags = document.createElement('select');
	inputTags.id = 'select-tags';
	inputTags.name = 'tag[]';
	inputTags.multiple = 'true';
	inputTags.required = 'true';
	duasColunas2.appendChild(inputTags);
	let divSelectTags = document.createElement('div');
	divSelectTags.id = 'div-select-tags';
	let btnSelectTags = document.createElement('span');
	btnSelectTags.id = 'btn-select-tags';
	btnSelectTags.setAttribute('onclick', 'dropdownTags()');
	btnSelectTags.innerText = 'Tags';
	divSelectTags.appendChild(btnSelectTags);
	let divDropdownTags = document.createElement('div');
	divDropdownTags.id = 'dropdown-options-tags';
	let searchTags = document.createElement('input');
	searchTags.id = 'search-tags';
	searchTags.setAttribute('onkeyup', 'buscaTags()');
	searchTags.placeholder = 'Pesquise aqui';
	divDropdownTags.appendChild(searchTags);
	divSelectTags.appendChild(divDropdownTags);
	duasColunas2.appendChild(divSelectTags);
	form.appendChild(duasColunas2);

	let inputThumb = document.createElement('input');
	inputThumb.type = 'file';
	inputThumb.name = 'thumb-image';
	inputThumb.accept = '.jpg';
	inputThumb.id = 'input-thumb';
	if (!window.location.href.includes('editar')) {
		inputThumb.addEventListener('change', previewImagens);
		inputThumb.required = 'true';
	} else {
		inputThumb.addEventListener('change', mudarThumb)
	}
	form.appendChild(inputThumb);
	let inputImagens = document.createElement('input');
	inputImagens.type = 'file';
	inputImagens.name = 'images[]';
	inputImagens.accept = '.jpg';
	inputImagens.id = 'input-imgs';
	inputImagens.multiple = 'true';
	if (!window.location.href.includes('editar')) {
		inputImagens.addEventListener('change', previewImagens);
	} else {
		inputImagens.addEventListener('change', mudarImagens);
	}
	form.appendChild(inputImagens);

	let duasColunasBotoes = document.createElement('span');
	duasColunasBotoes.className = 'duas-colunas-botoes';
	let btn_reset = document.createElement('button');
	btn_reset.className = 'btn-padrao';
	btn_reset.type = 'reset';
	btn_reset.setAttribute('onclick', 'limpaPreview();limpaTags()');
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

function selecionaTag(id) {
	let opcao = document.getElementById('t' + id).selected;
	if (opcao) {
		document.getElementById('t' + id).selected = false;
		document.querySelector('#drop-t' + id + ' #check-option').style.display = 'none';
		--tagsChecked;
	} else {
		document.getElementById('t' + id).selected = true;
		document.querySelector('#drop-t' + id + ' #check-option').style.display = 'flex';
		++tagsChecked;
	}

	if (tagsChecked) {
		if (tagsChecked > 1) {
			document.getElementById('btn-select-tags').innerText = tagsChecked + ' tags selecionadas';
		} else {
			document.getElementById('btn-select-tags').innerText = tagsChecked + ' tag selecionada';
		}
	} else {
		document.getElementById('btn-select-tags').innerText = 'Nenhuma tag selecionada';
	}
}

function limpaTags() {
	tagsChecked = 0;
	document.getElementById('btn-select-tags').innerText = 'Nenhuma tag selecionada';
	document.querySelectorAll('#dropdown-options-tags #check-option').forEach(option => option.style.display = 'none');
}

function dropdownTags() {
	let menu = document.getElementById('dropdown-options-tags').style.display;
	document.getElementById('dropdown-options-tags').style.display = menu == 'flex' ? 'none' : 'flex';
}

function buscaTags() {
	let busca = document.getElementById('search-tags').value.toLowerCase();
	document.querySelectorAll('#dropdown-options-tags .option').forEach(option => {
		let label = option.innerText.toLowerCase()
		if (label.includes(busca)) {
			option.style.display = 'flex';
		} else {
			option.style.display='none'
		}
	});
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
		if (request.readyState == request.DONE) {
			if (document.querySelectorAll('#select-tags option').length > 0) {
				document.querySelectorAll('#select-tags option').forEach(element => element.remove());
			}
			let response = JSON.parse(request.responseText);

			let dropdownTags = document.getElementById('dropdown-options-tags');
			response.tags.forEach(tag => {
				let option = document.createElement('option');
				option.id = 't'+ tag.id;
				option.value = tag.id;
				select.appendChild(option);

				let optionSpan = document.createElement('span');
				optionSpan.className = 'option';
				optionSpan.id = 'drop-t' + tag.id;
				optionSpan.setAttribute('onclick', 'selecionaTag(' + tag.id + ')');
				let labelOption = document.createElement('span');
				labelOption.id = 'label-option';
				labelOption.innerText = tag.nome[0].toUpperCase() + tag.nome.slice(1).toLowerCase();
				optionSpan.appendChild(labelOption);
				let checkOption = document.createElement('span');
				checkOption.id = 'check-option';
				checkOption.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>';
				optionSpan.appendChild(checkOption);
				dropdownTags.appendChild(optionSpan);
			});
		}
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
		let btnAcaoImg = document.createElement('span');
		btnAcaoImg.className = 'icon';
		btnAcaoImg.id = 'acao-img';
		boxImagens.appendChild(btnAcaoImg);
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
		if (window.location.href.includes('editar')) {
			let url = new URLSearchParams(window.location.search);
			let id_prod = url.get('id');
	
			lista_imagens = Array();
			let buscaImagens = new XMLHttpRequest();
			buscaImagens.onreadystatechange = () => {
				let imagens = JSON.parse(buscaImagens.responseText);
				lista_imagens = Array();
				imagens.imagens.forEach(imagem => lista_imagens.push(imagem.caminho) );

				let imagemPreview = document.getElementById('img-preview');
				imagemPreview.src = lista_imagens[index_img];
				controladorBotoes(lista_imagens.length);
			}

			buscaImagens.open('GET', '/ecommerce/php/view/requests/buscaImagens.php?id='+id_prod, true);
			buscaImagens.send();
		}
	}

	let edicao = window.location.href.includes('editar');
	if (!edicao) {
		thumb = document.getElementById('input-thumb').files;
		imagens = document.getElementById('input-imgs').files;
		lista_imagens = Array(thumb[0]);

		for (let i = 0; i < imagens.length; i++) {
			lista_imagens.push(imagens[i]);
		}

		document.getElementById('box-imagens').style.display = 'flex';
		let imagemPreview = document.getElementById('img-preview');
		imagemPreview.src = URL.createObjectURL(lista_imagens[index_img]);
		controladorBotoes(lista_imagens.length);
	} else {
		document.getElementById('box-imagens').style.display = 'flex';
		let btnAcaoImg = document.getElementById('acao-img');
		if (index_img == 0) {
			btnAcaoImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#097d1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
			btnAcaoImg.setAttribute('onclick', 'selecionarThumb()');
		} else {
			btnAcaoImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4E4E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
			btnAcaoImg.setAttribute('onclick', 'removerImagem()');
		}
		
		let imagemPreview = document.getElementById('img-preview');
		try {
			imagemPreview.src = URL.createObjectURL(lista_imagens[index_img]);
		} catch (error) {
			imagemPreview.src = lista_imagens[index_img];
		}
		controladorBotoes(lista_imagens.length);
	}
}

function limpaPreview() {
	let preview = document.getElementById('box-imagens');
	if (preview) {
		preview.style.display = 'none';
		index_img = 0;
	}
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
var tagsChecked = 0;
