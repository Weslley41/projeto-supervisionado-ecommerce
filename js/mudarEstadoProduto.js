function popupMudarEstadoProduto(id, nome, acao) {
	let titulo = 'Você tem certeza?';
	let conteudo = acao + ' o produto:<br>ID: ' + id + '<br>Nome: ' + nome;
	acao = acao.toLowerCase();

	criarPopup(titulo, conteudo);
	let btnCancelar = ['Cancelar', 'btn-cancelar', 'fecharPopup()'];
	let btnExcluir = ['Confirmar', 'btn-confirmar', 'mudarEstadoProduto(' + id + ', "' + acao + '")'];
	criarBotoes([btnCancelar, btnExcluir]);
	document.querySelector('body').style.overflow = 'hidden';
}

function mudarEstadoProduto(id, acao) {
	let change = new XMLHttpRequest();

	change.open('GET', '/ecommerce/php/view/requests/mudarEstadoProduto.php?acao=' + acao + '&id=' + id, true);
	change.send();

	fecharPopup();
	change.onreadystatechange = () => {
		if (change.readyState == change.DONE) {
			if (acao == 'desabilitar') {
				criar_tabela();
			} else {
				criar_tabela(false);
			}
		}
	}
}
