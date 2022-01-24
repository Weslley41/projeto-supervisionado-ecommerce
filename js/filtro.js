function alterar_modo_filtro() {
	let btn_filtro = document.getElementById("btn-filtro").checked;
	let sidebar = document.getElementById("box-sidebar");
	if (btn_filtro) {
		sidebar.style.display = "block";
	} else {
		sidebar.style.display = "none";
	}
}

function criarCategoria(id, nome) {
	let formSidebar = document.getElementById('form-sidebar');
	let boxCategoria = document.createElement('span');
	boxCategoria.className = 'box-btn-categoria';
	let inputCategorias = document.createElement('input');
	inputCategorias.type = 'radio';
	inputCategorias.className = 'btn-categoria';
	inputCategorias.id = 'c' + id;
	inputCategorias.name = 'categoria'
	inputCategorias.value = id;
	inputCategorias.addEventListener('click', function() {menu_categoria(id)});
	let labelCategoria = document.createElement('label');
	labelCategoria.className = 'label-categoria';
	labelCategoria.id = 'label-categoria';
	labelCategoria.innerText = nome[0].toUpperCase() + nome.slice(1).toLowerCase();
	let menuCategoria = document.createElement('div');
	menuCategoria.className = 'menu-categoria';
	menuCategoria.id = 'menu-categoria' + id;

	boxCategoria.appendChild(inputCategorias);
	boxCategoria.appendChild(labelCategoria);
	formSidebar.appendChild(boxCategoria);
	formSidebar.appendChild(menuCategoria);
}

function criarTag(categoriaId, id, nome) {
	let formSidebar = document.getElementById('menu-categoria' + categoriaId);
	let boxTag = document.createElement('span');
	boxTag.className = 'box-btn-tag';
	let inputTags = document.createElement('input')
	inputTags.type = 'checkbox';
	inputTags.className = 'btn-tag';
	inputTags.id = 't' + id;
	inputTags.name = 'tag[]';
	inputTags.value = id;
	let labelTag = document.createElement('label');
	labelTag.className = 'label-tag';
	labelTag.id = 'label-tag';
	labelTag.innerText = nome[0].toUpperCase() + nome.slice(1).toLowerCase();

	boxTag.appendChild(inputTags);
	boxTag.appendChild(labelTag);
	formSidebar.appendChild(boxTag);
}

function exibirFiltros() {
	let formSidebar = new XMLHttpRequest();
	formSidebar.onreadystatechange = () =>  {
		if (document.querySelectorAll('.menu-categoria, .box-btn-categoria').length > 0) {
			document.querySelectorAll('.menu-categoria, .box-btn-categoria').forEach(element => element.remove());
		}

		let response = JSON.parse(formSidebar.responseText);

		response.categorias.forEach(categoria => {
			criarCategoria(categoria.id, categoria.nome);
			categoria.tags.forEach(tag => {
				criarTag(categoria.id, tag.id, tag.nome);
			})
		});
	}

	formSidebar.open('GET', '/ecommerce/php/view/requests/filtro.php?busca=' + getBuscaURL(), true);
	formSidebar.send();
	filtrosAtivos();
}

function getBuscaURL() {
	let filtros = new URLSearchParams(window.location.search);
	let busca = filtros.get('busca');
	busca = busca != undefined ? busca : '';

	return busca;
}

function filtrosAtivos() {
	let filtros = new URLSearchParams(window.location.search);
	let busca = filtros.get('busca');
	let categoria = filtros.get('categoria');
	let tags = filtros.getAll('tag[]');

	if (busca != null) {
		document.querySelector('input#busca').value = busca;
	}
	if (categoria != null) {
		document.querySelector('input#c' + categoria).click();
	}
	if (tags.length > 0) {
		tags.forEach(tag => document.querySelector('input#t' + tag).click());
	}
}

function aplicarFiltro() {
	let categoria = undefined;
	document.querySelectorAll('.btn-categoria').forEach(btnCategoria => {
		if (btnCategoria.checked) {
			categoria = btnCategoria.value;
		}
	});

	let tags = Array();
	document.querySelectorAll('.btn-tag').forEach(btnTag => {
		if (btnTag.checked) {
			tags.push(btnTag.value);
		}
	});

	if (categoria != undefined) {
		let str_filtro = '?busca=' + getBuscaURL() + '&categoria=' + categoria;

		if (tags.length > 0) {
			tags.forEach(tag => {
				str_filtro += '&tag[]=' + tag;
			});
		}

		window.location.href = '/ecommerce/php/view/user/busca.php' + str_filtro;
	}
}
