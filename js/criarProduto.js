function criarProduto(localConteudo, id, p_nome, p_valor, srcImagem) {
	// Seleciona onde os produtos serão inseridos
	let boxConteudo = document.querySelector(localConteudo);
	let nome = p_nome[0].toUpperCase() + p_nome.slice(1).toLowerCase();
	let valor = 'R$ ' + Number(p_valor).toFixed(2).replace('.', ',');

	// Cria o elemento Produto
	let novoProduto = document.createElement("div");
	novoProduto.className = "produto";
	novoProduto.title = nome + '\n' + valor;
	
	// Imagem do produto
	let imagemProduto = document.createElement("div");
	imagemProduto.className = "imagem-produto";
	imagemProduto.innerHTML = "<img src='" + srcImagem + "'>";
	imagemProduto.setAttribute("onclick", "location.href='detalhes_produto.php?id="+id+"'");
	novoProduto.appendChild(imagemProduto);

	// Descrição do produto
	let descricaoProduto = document.createElement("div");
	descricaoProduto.className = "produto-descricao";
	// Nome e valor do produto
	let boxDescricao = document.createElement("span");
	boxDescricao.className = "box-descricao";
	boxDescricao.setAttribute("onclick", "location.href='detalhes_produto.php?id="+id+"'");
	let nomeProduto = document.createElement("span");
	nomeProduto.className = "nome-produto";
	nomeProduto.innerText = nome;
	let valorProduto = document.createElement("span");
	valorProduto.className = "valor-produto";
	valorProduto.innerText = valor;
	boxDescricao.appendChild(nomeProduto);
	boxDescricao.appendChild(valorProduto);
	descricaoProduto.appendChild(boxDescricao);
	// Adiciona o botão de favoritar produto
	let favoritarProduto = document.createElement("input");
	favoritarProduto.type = "checkbox";
	favoritarProduto.id = "fav-produto" + id;
	favoritarProduto.className = "fav-icon";
	descricaoProduto.appendChild(favoritarProduto);

	// Adiciona o novo produto ao conteúdo
	novoProduto.appendChild(descricaoProduto);
	boxConteudo.appendChild(novoProduto);
}
