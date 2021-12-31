function criarControlador(qntd_prod, qntd_limite, func) {
	let qntd_paginas = Math.ceil(qntd_prod / qntd_limite);
	if (document.getElementById('paginas') == null) {
		let boxConteudo = document.getElementById('box-conteudo');
		let boxControlador = document.createElement('div');
		boxControlador.id = 'paginas';
		boxConteudo.appendChild(boxControlador);
	} else {
		document.getElementById('paginas').innerHTML = '';
	}

	let boxControlador = document.getElementById('paginas');
	let anterior = document.createElement('button');
	anterior.className = 'controlador-paginas';
	anterior.id = 'pagina-anterior';
	anterior.setAttribute('onclick', 'diminui();'+func);
	anterior.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>';
	boxControlador.appendChild(anterior);

	for (let i = 0; i < qntd_paginas; i++) {
		let button = document.createElement('button');
		button.className = 'controlador-paginas numero-pagina';
		button.setAttribute('onclick', 'definePagina('+i+');'+func);
		button.value = i;
		button.innerText = i + 1;
		
		boxControlador.appendChild(button);
	}

	let proximo = document.createElement('button');
	proximo.className = 'controlador-paginas';
	proximo.id = 'pagina-proximo';
	proximo.setAttribute('onclick', 'acrescenta();'+func);
	proximo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>';
	boxControlador.appendChild(proximo);
	controladorBotoes(qntd_paginas);
}

function controladorBotoes(len) {
	if (pagina == 0) {
		let btn = document.getElementById('pagina-anterior');
		btn.disabled = true;
		btn.style.opacity = .5;
	} else {
		let btn = document.getElementById('pagina-anterior');
		btn.disabled = false;
		btn.style.opacity = 1;
	}

	if (pagina == len - 1) {
		let btn = document.getElementById('pagina-proximo');
		btn.disabled = true;
		btn.style.opacity = .5;
	} else {
		let btn = document.getElementById('pagina-proximo');
		btn.disabled = false;
		btn.style.opacity = 1;
	}

	let btnNumeroPaginas = document.querySelectorAll('.numero-pagina');
	btnNumeroPaginas.forEach(btnPagina => {
		if (btnPagina.value == pagina) {
			btnPagina.disabled = true;
			btnPagina.style.opacity = .5;
		} else {
			btnPagina.disabled = false;
			btnPagina.style.opacity = 1;
		}
	});
}

function acrescenta() {
	++pagina;
}

function diminui() {
	--pagina;
}

function definePagina(value) {
	pagina = value;
}

var pagina = 0;
