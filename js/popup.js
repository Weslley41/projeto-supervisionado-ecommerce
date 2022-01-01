function criarPopup(textoTitulo, textoConteudo) {
	if (document.querySelector('.bg-popup') == null) {
		let body = document.querySelector('body');
		let bgPopup = document.createElement('div');
		bgPopup.className = 'bg-popup';
		body.appendChild(bgPopup);
	}

	let bgPopup = document.querySelector('.bg-popup');
	bgPopup.style.display = 'flex';
	let popup = document.createElement('div');
	popup.className = 'popup';
	let titulo = document.createElement('div');
	titulo.id = 'popup-titulo';
	titulo.innerText = textoTitulo;
	let conteudo = document.createElement('div');
	conteudo.id = 'popup-conteudo';
	conteudo.innerText = textoConteudo;
	let boxBotoes = document.createElement('div');
	boxBotoes.id = 'popup-boxBotoes';

	popup.appendChild(titulo);
	popup.appendChild(conteudo);
	popup.appendChild(boxBotoes);
	bgPopup.appendChild(popup);
}

function criarBotoes(botoes) {
	let boxBotoes = document.getElementById('popup-boxBotoes');
	botoes.forEach(dadosBotao => {
		let botao = document.createElement('button');
		botao.innerText = dadosBotao[0];
		botao.id = dadosBotao[1];
		botao.className = 'btn-padrao';
		botao.setAttribute('onclick', dadosBotao[2]);

		boxBotoes.appendChild(botao);
	});
}

function fecharPopup() {
	let bgPopup = document.querySelector('.bg-popup');
	bgPopup.style.display = 'none';
	bgPopup.innerHTML = '';
	document.querySelector('body').style.overflow = 'auto';
}
