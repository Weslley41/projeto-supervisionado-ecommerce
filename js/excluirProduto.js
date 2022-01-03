function popupExcluirProduto(id, nome) {
	let titulo = 'Você tem certeza?';
	let conteudo = 'Excluir o produto:<br>ID: ' + id + '<br>Nome: ' + nome;

	criarPopup(titulo, conteudo);
	let btnCancelar = ['Cancelar', 'btn-cancelar', 'fecharPopup()'];
	let btnExcluir = ['Excluir', 'btn-confirmar', 'excluirProduto(' + id + ')'];
	criarBotoes([btnCancelar, btnExcluir]);
	document.querySelector('body').style.overflow = 'hidden';
}

function excluirProduto(id) {
	let apagar = new XMLHttpRequest();

	apagar.open('GET', '/ecommerce/php/view/requests/apagarProduto.php?id=' + id, true);
	apagar.send();

	fecharPopup();
	criar_tabela();
}
