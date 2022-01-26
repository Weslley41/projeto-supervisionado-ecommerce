function criarTabelaUtilizacoes() {
	if (document.getElementById("box-conteudo") == null) {
		let body = document.querySelector('body');
		let boxConteudo = document.createElement('div');
		boxConteudo.id = 'box-conteudo';

		let tabela = document.createElement('div');
		tabela.className = 'div-table';

		let cabecalhoTabela = document.createElement('div');
		cabecalhoTabela.className = 'div-thead';
		let tituloTabela = document.createElement('span');
		tituloTabela.className = 'span-tr';
		let titulo = document.createElement('th');
		titulo.className = 'span-th';
		titulo.id = 'titulo-tabela';
		titulo.colSpan = 7;
		titulo.innerText = 'Utilizações de categorias e tags em produtos';
		tituloTabela.appendChild(titulo);
		cabecalhoTabela.appendChild(tituloTabela);

		let inputsFiltros = document.createElement('span');
		inputsFiltros.className = 'span-tr';
		inputsFiltros.id = 'input-filtros';
		let thInputs = document.createElement('span');
		thInputs.className = 'span-th';
		thInputs.id = 'th-inputs';
		thInputs.colSpan = 7;
		let qntdResultados = document.createElement('span');
		qntdResultados.id = 'qntd-resultados';
		thInputs.appendChild(qntdResultados);
		inputsFiltros.appendChild(thInputs);
		cabecalhoTabela.appendChild(inputsFiltros);

		let labels = document.createElement('span');
		labels.className = 'span-tr';
		labels.id = 'labels';
		let lista_labels = [
			'ID', 'Nome', 'Categoria', 'Tag',
			'Estoque', 'Editar', 'Excluir'
		];
		lista_labels.forEach(label => {
			let th = document.createElement('span');
			th.className = 'span-th';
			th.id = 'coluna-'+label.toLowerCase();
			th.innerText = label;
			labels.appendChild(th)
		});
		cabecalhoTabela.appendChild(labels);
		
		tabela.appendChild(cabecalhoTabela);
		let tbody = document.createElement('div');
		tbody.className = 'div-tbody';
		tabela.appendChild(tbody);

		boxConteudo.appendChild(tabela);
		body.appendChild(boxConteudo);
	}

	criarSelect('#th-inputs', 'input-value', 'Escolha', 'input-value', false, true);
	criarSelect('#th-inputs', 'input-tipo', 'Tipo', 'input-tipo', false, false);
	let inputTipo = document.getElementById('input-tipo');
	opcoes = ['Categorias', 'Tags'];
	let dropdownTipos = document.querySelector('#div-input-tipo .dropdown-options');
	opcoes.forEach(opcao => {
		let selectOption = document.createElement('option');
		selectOption.value = opcao.toLowerCase();
		selectOption.id = opcao.toLowerCase();
		selectOption.innerText = opcao;
		inputTipo.appendChild(selectOption);

		let optionSpan = document.createElement('span');
		optionSpan.className = 'option';
		optionSpan.id = 'drop-' + opcao.toLowerCase();
		optionSpan.setAttribute('onclick', 'selecionaOption("input-tipo", "' + opcao.toLowerCase() + '", false);preencheValues()');
		let labelOption = document.createElement('span');
		labelOption.id = 'label-option';
		labelOption.innerText = opcao;
		optionSpan.appendChild(labelOption);
		let checkOption = document.createElement('span');
		checkOption.className = 'check-option';
		checkOption.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>';
		optionSpan.appendChild(checkOption);
		dropdownTipos.appendChild(optionSpan);
	});
	preencheValues();
}

function preencheValues() {
	let tipo = document.getElementById('input-tipo');
	tipo = tipo.options[tipo.selectedIndex].value;
	selecionaOption('input-tipo', tipo, false);

	let selectValues = document.getElementById('input-value');
	let options = new XMLHttpRequest();
	options.onreadystatechange = () => {
		if (options.readyState == options.DONE) {
			if (document.querySelectorAll('#input-value option').length > 0) {
				document.querySelectorAll('#input-value option').forEach(element => { element.remove() })
				document.querySelectorAll('#div-input-value .dropdown-options .option').forEach(element => { element.remove() })
			}
			let response = JSON.parse(options.responseText);

			let dropdownValues = document.querySelector('#div-input-value .dropdown-options');
			response[tipo].forEach(opcao => {
				let option = document.createElement('option');
				option.value = opcao.id;
				option.id = 'o' + opcao.id;
				option.innerText = capitalize(opcao.nome);
				selectValues.appendChild(option);
				
				let optionSpan = document.createElement('span');
				optionSpan.className = 'option';
				optionSpan.id = 'drop-o' + opcao.id;
				optionSpan.setAttribute('onclick', 'selecionaOption("input-value", "o' + opcao.id + '", false);exibirProdutos()');
				let labelOption = document.createElement('span');
				labelOption.id = 'label-option';
				labelOption.innerText = capitalize(opcao.nome);
				optionSpan.appendChild(labelOption);
				let checkOption = document.createElement('span');
				checkOption.className = 'check-option';
				checkOption.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>';
				optionSpan.appendChild(checkOption);
				dropdownValues.appendChild(optionSpan);
			});
			
			exibirProdutos();
			let selectedOption = document.getElementById('input-value');
			selectedOption = selectedOption.options[selectedOption.selectedIndex].id;
			selecionaOption('input-value', selectedOption, false);
		}
	}

	options.open('GET', '/ecommerce/php/view/requests/buscaCategoriasTags.php?tipo=' + tipo, true);
	options.send();
}

function exibirProdutos() {
	document.getElementById('qntd-resultados').innerText = '0 Resultados encontrados';
	let tipo = document.getElementById('input-tipo');
	let value = document.getElementById('input-value');
	tipo = tipo.options[tipo.selectedIndex].value;
	tipo = tipo.substring(0, tipo.length - 1);
	tipo = tipo == 'categoria' ? tipo : tipo + '[]';
	value = value.options[value.selectedIndex].value;

	let corpoTabela = new XMLHttpRequest();
	corpoTabela.onreadystatechange = () => {
		if (document.querySelector('.div-tbody').innerHTML != '') {
			document.querySelector('.div-tbody').innerHTML = '';
		}

		let response = JSON.parse(corpoTabela.responseText);
		document.getElementById('qntd-resultados').innerText = response.quantidade + ' Resultados encontrados';

		let tbody = document.querySelector('.div-tbody');
		let lista_labels = ['id', 'nome', 'categoria', 'tag', 'estoque'];
		response.produtos.forEach(produto => {
			let tr = document.createElement('span');
			tr.className = 'span-tr';
			lista_labels.forEach(coluna => {
				let td = document.createElement('span');
				td.className = 'span-td';
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
			let editar = document.createElement('span');
			editar.className = 'span-td';
			editar.id = 'coluna-editar';
			editar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
			editar.setAttribute('onclick', 'window.location.href="editar_produto.php?id=' + produto.id + '"');
			tr.appendChild(editar);
			let excluir = document.createElement('span');
			excluir.className = 'span-td';
			excluir.id = 'coluna-excluir';
			excluir.setAttribute('onclick', 'popupMudarEstadoProduto(' + produto.id + ',"' + capitalize(produto.nome) + '", "Desabilitar")');
			excluir.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>';
			tr.appendChild(excluir);
			tbody.appendChild(tr);
		});
		criarControlador(response.quantidade, 8, 'exibirProdutos()');
	}

	corpoTabela.open('GET', '/ecommerce/php/view/requests/buscaProduto.php?tipo=tabela&order=nome0&limite=' + pagina * 8 + '&' + tipo + '=' + value, true);
	corpoTabela.send();
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

document.addEventListener('click', function(event) {
	let inputs = ['div-input-tipo', 'div-input-value'];
	inputs.forEach(input => {
		let ignorar = document.getElementById(input);
		let clicado = ignorar.contains(event.target);
		if (!clicado) {
			dropdownOptions(input, true);
		}
	});
});
