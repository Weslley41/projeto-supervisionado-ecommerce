function popupCadastrarFiltro() {
	let conteudo = "<input type='text' id='inputNovo' placeholder='Nome da categoria ou tag'><span><input type='radio' name='tipo' id='radio-categoria' value='categoria'> Categoria <input type='radio' name='tipo' id='radio-tag' value='tag'> Tag</span>"
	criarPopup('Cadastrar', conteudo);
	let botoes = [['Cancelar', 'btn-cancelar', 'fecharPopup()'], ['Cadastrar', 'btn-confirmar', 'cadastrarFiltro()']];
	criarBotoes(botoes);
}

function popupEditarFiltro(id, nome, tipo) {
	tipo = tipo.substring(0, tipo.length - 1);
	let conteudo = "<input type='text' id='inputNovo' placeholder='Nome da categoria ou tag'><span><input type='radio' name='tipo' id='radio-categoria' value='categoria'> Categoria <input type='radio' name='tipo' id='radio-tag' value='tag'> Tag</span>"
	criarPopup('Cadastrar', conteudo);
	document.getElementById('popup-titulo').innerText = 'Editar';
	document.getElementById('inputNovo').value = nome;
	document.getElementsByName('tipo').forEach(radio => { radio.disabled = true })
	document.getElementById('radio-' + tipo).checked = true;
	
	let botoes = [
		['Cancelar', 'btn-cancelar', 'fecharPopup()'],
		['Editar', 'btn-confirmar', `editarFiltro(${id}, '${tipo}')`]
	];
	criarBotoes(botoes);
}

function popupExcluirFiltro(id, nome, tipo) {
	tipo = tipo.substring(0, tipo.length - 1);
	let titulo = 'Você tem certeza?';
	let conteudo = 'Excluir a ' + tipo + ':<br>ID: ' + id + '<br>Nome: ' + nome;

	criarPopup(titulo, conteudo);
	let botoes = [
		['Cancelar', 'btn-cancelar', 'fecharPopup()'],
		['Excluir', 'btn-confirmar', `excluirFiltro(${id}, '${tipo}')`]
	];
	criarBotoes(botoes);
}

function cadastrarFiltro() {
	let cadastrar = new XMLHttpRequest();

	let nome = document.getElementById('inputNovo').value;
	document.getElementsByName('tipo').forEach(radio => {
		if (radio.checked) {
			tipo = radio.value;
		}
	})

	cadastrar.open('GET', '/ecommerce/php/view/requests/gerenciamento_' + tipo + '.php?acao=cadastrar&nome=' + nome, true);
	cadastrar.send();

	fecharPopup();
	let titulo = tipo[0].toUpperCase() + tipo.slice(1) + 's';
	criarTabelaUnica(titulo);
}

function editarFiltro(id, tipo) {
	let cadastrar = new XMLHttpRequest();

	let nome = document.getElementById('inputNovo').value;

	cadastrar.open('GET', '/ecommerce/php/view/requests/gerenciamento_' + tipo + '.php?acao=editar&id=' + id + '&nome=' + nome, true);
	cadastrar.send();

	fecharPopup();
	let titulo = tipo[0].toUpperCase() + tipo.slice(1) + 's';
	criarTabelaUnica(titulo);
}

function excluirFiltro(id, tipo) {
	cadastrar = new XMLHttpRequest();
	
	cadastrar.onreadystatechange = () => {
		if (cadastrar.responseText == 'false') {
			fecharPopup();
			criarPopup('Erro', 'Verifique se não há nenhum produto vinculado à esse filtro antes de tentar apagá-lo.');
			criarBotoes([['Fechar', 'btn-cancelar', 'fecharPopup()']]);
		} else {
			fecharPopup();
			let titulo = tipo[0].toUpperCase() + tipo.slice(1) + 's';
			criarTabelaUnica(titulo);
		}
	}

	cadastrar.open('GET', '/ecommerce/php/view/requests/gerenciamento_' + tipo + '.php?acao=excluir&id=' + id, true);
	cadastrar.send();
}
