function criarTabelaDupla() {
	if (document.getElementById("box-conteudo") == null) {
		let body = document.querySelector('body');
		let boxConteudo = document.createElement('div');
		boxConteudo.id = 'box-conteudo';

		let divTabela = document.createElement('div');
		divTabela.id = 'tabela';

		let cabecalhoTabela = document.createElement('div');
		cabecalhoTabela.id = 'cabecalho-tabela';
		let title = document.createElement('span');
		title.id = 'titulo-tabela';
		title.innerText = 'Lista de categorias e tags';
		cabecalhoTabela.appendChild(title);
		
		let span_btn_novo = document.createElement('span');
		span_btn_novo.id = 'btn-novo';
		let btn_novo = document.createElement('button');
		btn_novo.id = 'btn-novo-produto';
		btn_novo.value = 'novo-produto';
		btn_novo.setAttribute('onclick', "popupCadastrarFiltro()");
		btn_novo.innerHTML = 'Novo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>';
		span_btn_novo.appendChild(btn_novo);
		cabecalhoTabela.appendChild(span_btn_novo);
		divTabela.appendChild(cabecalhoTabela);

		let divTabelaDupla = document.createElement('div');
		divTabelaDupla.id = 'tabela-dupla';
		divTabela.appendChild(divTabelaDupla);

		boxConteudo.appendChild(divTabela);
		body.appendChild(boxConteudo);
	}

	criarTabelaUnica('Categorias');
	criarTabelaUnica('Tags');
}

function criarTabelaUnica(titulo) {
	if (document.querySelector('table#'+titulo.toLowerCase()) == null) {
		let divTabelaDupla = document.getElementById('tabela-dupla');
		let table = document.createElement('table');
		table.className = 'tabela-unica';
		table.id = titulo.toLowerCase();
		let thead = document.createElement('thead');
		let trTitulo = document.createElement('tr');
		let thTitulo = document.createElement('th');
		thTitulo.innerText = titulo;
		thTitulo.colSpan = 5;
		trTitulo.appendChild(thTitulo)
		thead.appendChild(trTitulo);

		let trLabel = document.createElement('tr');
		let labels = ['ID', 'Nome', 'Usos', 'Editar', 'Excluir'];
		labels.forEach(label => {
			let thLabel = document.createElement('th');
			thLabel.innerText = label;
			thLabel.id = 'coluna-' + label.toLowerCase();
			trLabel.appendChild(thLabel)
			thead.appendChild(trLabel);
		})
		table.appendChild(thead);
		let tbody = document.createElement('tbody');
		table.appendChild(tbody);

		divTabelaDupla.appendChild(table);
	}

	titulo = titulo.toLowerCase();
	let dados = new XMLHttpRequest();
	dados.onreadystatechange = () => {
		let tbody = document.querySelector('table#' + titulo + ' > tbody');
		if (document.querySelectorAll('table#' + titulo + ' > tbody tr').length > 0) {
			document.querySelectorAll('table#' + titulo + ' > tbody tr').forEach(element => element.remove());
		}

		response = JSON.parse(dados.responseText);
		response[titulo].forEach(element => {
			let tr = document.createElement('tr');
			let colunas = ['id', 'nome', 'usos'];
			colunas.forEach(coluna => {
				let td = document.createElement('td');
				td.innerText = element[coluna];
				td.id = 'coluna-' + coluna;
				tr.appendChild(td);
			});

			let editar = document.createElement('td');
			editar.id = 'coluna-editar';
			editar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
			editar.setAttribute('onclick', `popupEditarFiltro(${element.id}, '${element.nome}', '${titulo}')`);
			tr.appendChild(editar);
			let excluir = document.createElement('td');
			excluir.id = 'coluna-excluir';
			excluir.setAttribute('onclick', `popupExcluirFiltro(${element.id}, '${element.nome}', '${titulo}')`);
			excluir.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>';
			tr.appendChild(excluir);

			tbody.appendChild(tr);
		});
	}

	dados.open('GET', '/ecommerce/php/view/requests/buscaCategoriasTags.php?show_counts=true&tipo=' + titulo, true);
	dados.send();
}
