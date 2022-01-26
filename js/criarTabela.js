function criar_tabela(disponiveis=true) {
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
		title.innerText = 'Lista de Produtos';
		cabecalhoTabela.appendChild(title);

		let formBusca = document.createElement('span');
		formBusca.id = 'form-busca';
		let inputBusca = document.createElement('input');
		inputBusca.className = 'busca-tabela';
		inputBusca.name = 'busca';
		inputBusca.placeholder = 'Pesquise aqui';
		inputBusca.setAttribute('onkeyup', 'criar_tabela(' + disponiveis + ')');
		formBusca.appendChild(inputBusca);
		let btn_busca = document.createElement('button');
		btn_busca.type = 'submit';
		btn_busca.id = 'btn-busca';
		btn_busca.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
		formBusca.appendChild(btn_busca);
		cabecalhoTabela.appendChild(formBusca);

		let span_btn_novo = document.createElement('span');
		span_btn_novo.id = 'btn-novo';
		if (disponiveis) {
			let btn_novo = document.createElement('button');
			btn_novo.id = 'btn-novo-produto';
			btn_novo.value = 'novo-produto';
			btn_novo.setAttribute('onclick', "location.href='novo_produto.php'");
			btn_novo.innerHTML = 'Novo produto <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>';
			span_btn_novo.appendChild(btn_novo);
		}
			cabecalhoTabela.appendChild(span_btn_novo);
		divTabela.appendChild(cabecalhoTabela);

		let table = document.createElement('table');
		let thead = document.createElement('thead');
		let labels = document.createElement('tr');
		labels.id = 'labels';
		let lista_labels;
		if (disponiveis) {
			lista_labels = [
				'ID', 'Nome', 'Categoria', 'Tag', 'Estoque',
				'Visitas', 'Valor', 'Postagem', 'Editar', 'Excluir'
			];
		} else {
			lista_labels = [
				'ID', 'Nome', 'Categoria', 'Tag', 'Estoque',
				'Visitas', 'Valor', 'Postagem', 'Habilitar'
			];
		}
		lista_labels.forEach(label => {
			let th = document.createElement('th');
			th.id = 'coluna-'+label.toLowerCase();
			th.innerText = label;
			labels.appendChild(th)
		});

		thead.appendChild(labels);
		table.appendChild(thead);
		let tbody = document.createElement('tbody');
		tbody.id = 'tbody';
		table.appendChild(tbody);
		divTabela.appendChild(table);
		boxConteudo.appendChild(divTabela);
		body.appendChild(boxConteudo);
	}

	let dadosDaTabela = new XMLHttpRequest();
	dadosDaTabela.onreadystatechange = () => {
		if (document.querySelectorAll('#tbody tr').length > 0) {
			document.querySelectorAll('#tbody tr').forEach(element => element.remove());
		}
		response = JSON.parse(dadosDaTabela.responseText);

		let tbody = document.getElementById('tbody');
		let lista_labels = [
			'id', 'nome', 'categoria', 'tag',
			'estoque', 'visitas', 'valor', 'postagem'
		];
		response.produtos.forEach(produto => {
			let tr = document.createElement('tr');
			lista_labels.forEach(coluna => {
				let td = document.createElement('td');
				td.id = 'coluna-' + coluna;
				if (coluna == 'tag') {
					let tags = formata(produto, coluna);
					td.innerText = tags[0];
					td.title = tags[1];
				} else {
					td.innerText = formata(produto, coluna);
				}
				tr.appendChild(td);
			});
			if (disponiveis) {
				let editar = document.createElement('td');
				editar.id = 'coluna-editar';
				editar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
				editar.setAttribute('onclick', 'window.location.href="editar_produto.php?id=' + produto.id + '"');
				tr.appendChild(editar);
				let excluir = document.createElement('td');
				excluir.id = 'coluna-excluir';
				excluir.setAttribute('onclick', 'popupMudarEstadoProduto(' + produto.id + ',"' + capitalize(produto.nome) + '", "Desabilitar")');
				excluir.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>';
				tr.appendChild(excluir);
			} else {
				let habilitar = document.createElement('td');
				habilitar.id = 'coluna-habilitar';
				habilitar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-unlock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>';
				habilitar.setAttribute('onclick', 'popupMudarEstadoProduto(' + produto.id + ',"' + capitalize(produto.nome) + '", "Habilitar")');
				tr.appendChild(habilitar);
			}
			tbody.appendChild(tr);
		});

		if (disponiveis) {
			criarControlador(response.quantidade, 10, 'criar_tabela()');
		} else {
			criarControlador(response.quantidade, 10, 'criar_tabela(false)');
		}
	};

	if (disponiveis) {
		dadosDaTabela.open('GET', '/ecommerce/php/view/requests/buscaProduto.php?busca=' + getPesquisa() + '&tipo=tabela&order=nome0&limite=' + pagina * 10, true);
	} else {
		dadosDaTabela.open('GET', '/ecommerce/php/view/requests/buscaProduto.php?busca=' + getPesquisa() + '&tipo=tabelaDesabilitados&order=nome0&limite=' + pagina * 10, true);
	}
	dadosDaTabela.send();
}

function getPesquisa() {
	return document.getElementsByName('busca')[0].value;
}

function formata(produto, coluna) {
	let colunaProduto;
	switch (coluna) {
		case 'nome':
			colunaProduto = capitalize(produto.nome);
			break;

		case 'categoria':
			colunaProduto = capitalize(produto.categoria[0].nome);
			break;

		case 'tag':
			let nome = capitalize(produto.tags[0].nome);
			let title = '';
			produto.tags.forEach(tag => title += capitalize(tag.nome) + '\n');
			colunaProduto = [nome, title];
			break;

		case 'valor':
			colunaProduto = 'R$ ' + Number(produto.valor).toFixed(2).replace(',', '.')
			break;

		case 'postagem':
			let date = new Date(produto.data_cadastro);
			colunaProduto = date.toLocaleDateString('br');
			break;

		default:
			colunaProduto = produto[coluna];
			break;
	}

	return colunaProduto;
}

function capitalize(nome) {
	return nome[0].toUpperCase() + nome.slice(1).toLowerCase();
}
