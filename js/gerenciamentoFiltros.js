function popupCadastrarFiltro() {
	let conteudo = "<input type='text' id='inputNovo' placeholder='Nome da categoria ou tag'><span><input type='radio' name='tipo' id='radio-categoria' value='categoria'> Categoria <input type='radio' name='tipo' id='radio-tag' value='tag'> Tag</span>"
	criarPopup('Cadastrar', conteudo);
	let botoes = [['Cancelar', 'btn-cancelar', 'fecharPopup()'], ['Cadastrar', 'btn-confirmar', 'cadastrarFiltro()']];
	criarBotoes(botoes);
}

function popupEditarFiltro(id, nome, tipo) {
	tipo = tipo.substring(0, tipo.length - 1);
	popupCadastrarFiltro();
	document.getElementById('popup-titulo').innerText = 'Editar';
	document.getElementById('inputNovo').value = nome;
	document.getElementsByName('tipo').forEach(radio => { radio.disabled = true })
	document.getElementById('radio-' + tipo).checked = true;
}

function popupExcluirFiltro(id, nome, tipo) {
	tipo = tipo.substring(0, tipo.length - 1);
	let titulo = 'Você tem certeza?';
	let conteudo = 'Excluir a ' + tipo + ':<br>ID: ' + id + '<br>Nome: ' + nome;

	criarPopup(titulo, conteudo);
	let btnCancelar = ['Cancelar', 'btn-cancelar', 'fecharPopup()'];
	let btnExcluir = ['Excluir', 'btn-confirmar', 'excluirFiltro()'];
	criarBotoes([btnCancelar, btnExcluir]);
}

function cadastrarFiltro() {
	fecharPopup();
}

function editarFiltro() {
	fecharPopup();
}

function excluirFiltro() {
	fecharPopup();
}
