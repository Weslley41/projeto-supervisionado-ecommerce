function exibirProduto() {
	conteudo = new XMLHttpRequest();
	conteudo.onreadystatechange = () =>  {
		if (conteudo.readyState == conteudo.DONE) {
			if (document.querySelector('#box-conteudo') != null) {
				document.querySelector('#box-conteudo').innerHTML = '';
			} else {
				let body = document.querySelector('body');
				let boxConteudo = document.createElement('div');
				boxConteudo.id = 'box-conteudo';
				body.appendChild(boxConteudo);
			}
			
			let response = JSON.parse(conteudo.responseText);
			adicionaImagens(response);
			adicionaDescricao(response);
			mudaBtnFav(response.produto.id, true);
		}
	}

	conteudo.open('GET', '/ecommerce/php/view/requests/buscaProduto.php?id=' + getID(), true);
	conteudo.send();
}

function getID() {
	let url = window.location.search;
	let searchParams = new URLSearchParams(url);
	let id = searchParams.get('id');

	return id;
}

function adicionaImagens(response) {
	let boxConteudo = document.getElementById('box-conteudo');
	let boxImagens = document.createElement('div');
	boxImagens.id = 'imagens';
	let thumbImage = document.createElement('img');
	thumbImage.className = 'thumb-image';
	thumbImage.src = response.produto.imagens[0].caminho;
	thumbImage.setAttribute('onclick', 'abre_imagens()');
	boxImagens.appendChild(thumbImage);
	let menuImagens = document.createElement('span');
	menuImagens.id = 'menu-sub-image';
	let len = response.produto.imagens.length > 3 ? 3 : response.produto.imagens.length;
	for (let i = 0; i < len; i++) {
		let subimage = document.createElement('img');
		subimage.className = 'sub-image';
		subimage.src = response.produto.imagens[i].caminho;
		subimage.setAttribute('onclick', 'altera_thumb('+i+')');

		if (i == 2) {
			let lastImage = document.createElement('span');
			lastImage.id = 'last-image';
			subimage.classList.add('last-image');
			subimage.setAttribute('onclick', 'abre_imagens()');
			let label = document.createElement('label');
			label.innerText = 'Mais fotos';

			lastImage.appendChild(subimage);
			lastImage.appendChild(label);
			menuImagens.appendChild(lastImage);
		} else {
			menuImagens.appendChild(subimage);
		}
	};
	boxImagens.appendChild(menuImagens);
	boxConteudo.appendChild(boxImagens);
	criarPopupImagens(response.produto.imagens);
}

function adicionaDescricao(response) {
	let boxConteudo = document.getElementById('box-conteudo');
	let conteudoProduto = document.createElement('div');
	conteudoProduto.id = 'conteudo-produto';
	let titulo = document.createElement('span');
	titulo.className = 'titulo-produto';
	titulo.innerText = response.produto.nome[0].toUpperCase() + response.produto.nome.slice(1).toLowerCase();
	let valor = document.createElement('span');
	valor.id = 'valor';
	valor.innerText = 'R$ ' + Number(response.produto.valor).toFixed(2).replace('.', ',');
	let botoes = document.createElement('span');
	botoes.id = 'btns-produto';
	let btn_cart = document.createElement('button');
	let btn_fav = document.createElement('button');
	disponivel = response.produto.disponivel
	if (!response.produto.disponivel) {
		btn_cart.className = 'btn-padrao indisponivel';
		btn_cart.innerText = 'Produto indisponível';
		btn_cart.disabled = true;
		btn_fav.className = 'btn-padrao indisponivel';
		btn_fav.innerText = 'Produto indisponível';
		btn_cart.disabled = true;
	} else {
		btn_cart.className = 'btn-padrao';
		btn_cart.innerText = 'Adicionar ao carrinho';
		btn_cart.setAttribute('onclick', 'adicionarAoCarrinho(' + response.produto.id + ')')
		btn_fav.className = 'btn-padrao';
		btn_fav.innerText = 'Adicionar aos favoritos';
		btn_fav.setAttribute('onclick', 'favoritar(' + response.produto.id + ', true)');
	}
	btn_cart.id = 'btn-add-cart';
	btn_fav.id = 'btn-prod-fav';
	botoes.appendChild(btn_cart);
	botoes.appendChild(btn_fav);

	conteudoProduto.appendChild(titulo);
	conteudoProduto.appendChild(valor);
	conteudoProduto.appendChild(botoes);
	boxConteudo.appendChild(conteudoProduto);

	verificaProdCart();
}

function criarPopupImagens(imagens) {
	if (document.querySelector('.popup.imagens-open') != null) {
		document.querySelector('.popup.imagens-open').remove();
	}

	let body = document.querySelector('body');
	let contentImagens = document.createElement('div');
	contentImagens.className = 'popup imagens-open';
	let btn_close = document.createElement('div');
	btn_close.id = 'btn-close';
	btn_close.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
	btn_close.setAttribute('onclick', 'fecha_imagens()');
	contentImagens.appendChild(btn_close);

	let boxImagens = document.createElement('div');
	boxImagens.id = 'imagens';
	let thumbImage = document.createElement('img');
	thumbImage.className = 'thumb-image';
	thumbImage.src = imagens[0].caminho;
	boxImagens.appendChild(thumbImage);

	let menuImagens = document.createElement('span');
	menuImagens.id = 'menu-sub-image';
	for (let i = 0; i < imagens.length; i++) {
		let subImage = document.createElement('img');
		subImage.className = 'sub-image';
		subImage.src = imagens[i].caminho;
		subImage.setAttribute('onclick', 'altera_thumb('+i+', ".imagens-open ")');
		menuImagens.appendChild(subImage);
	}
	boxImagens.appendChild(menuImagens);
	contentImagens.appendChild(boxImagens);
	body.appendChild(contentImagens);
}

function abre_imagens() {
	document.querySelector('.popup.imagens-open').style.display = 'flex';
}

function fecha_imagens() {
	document.querySelector('.popup.imagens-open').style.display = 'none';
}

function altera_thumb(id, local='') {
	let srcSubImage = document.querySelectorAll(local+'.sub-image')[id].src;

	let imagens = document.querySelectorAll(local+'.sub-image');
	imagemAtiva(id, imagens)

	document.querySelector(local+'.thumb-image').src = srcSubImage;
}

function imagemAtiva(id, imagens) {
	imagens.forEach(imagem => {
		imagem.style.outline = 'none';
		imagem.style.opacity = .8;
	});

	imagens[id].style.outline = '3px solid var(--tertiary-color)';
	imagens[id].style.opacity = 1;
}
