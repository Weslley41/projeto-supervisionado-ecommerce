<?php
	class Busca
	{
		function __construct($conexao) {
			$this->conexao = $conexao;
			$this->conexao->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
			$this->conexao->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_NAMED);
		}

		// Busca de exibição ao usuário
		function produtosNovidades() {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor FROM produtos prod
			ORDER BY prod.data_cadastro DESC LIMIT 10";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute();

			return $pesquisa->fetchAll();
		}

		function produtosDestaques() {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor FROM produtos prod ORDER BY prod.visitas DESC LIMIT 10";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute();

			return $pesquisa->fetchAll();
		}

		function produtoPorID($parametros) {
			$sql = "SELECT prod.id, prod.nome, prod.valor FROM produtos prod WHERE prod.id = :id";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function produtoPorNome($parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor FROM produtos prod
			WHERE prod.nome LIKE ? ORDER BY ? LIMIT ?, 20";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function produtoPorCategoria($parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ? ORDER BY ? LIMIT ?, 20";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function produtoPorTag($place_tags, $parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			AND rel.id_tag IN ($place_tags) ORDER BY ? LIMIT ?, 20";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function produtoPorCategoriaTag($place_tags, $parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ?
			AND rel.id_tag IN ($place_tags) ORDER BY ? LIMIT ?, 20";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function produtoPorCategoriaEnome($parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ?
			AND prod.nome LIKE ? ORDER BY ? LIMIT ?, 20";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function produtoPorTagsEnome($place_tags, $parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ?
			AND rel.id_tag IN ($place_tags)
			AND prod.nome LIKE ? ORDER BY ? LIMIT ?, 20";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function imagens($parametros) {
			$sql = "SELECT DISTINCT caminho FROM imagens WHERE id_produto = ? LIMIT ?";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		// Busca de exibição nas tabelas de administração
		function tabelaProdutoPorNome($parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor, prod.estoque, prod.data_cadastro, prod.visitas
			FROM produtos prod WHERE prod.nome LIKE ? ORDER BY ? LIMIT ?, 10";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function tabelaProdutoPorCategoria($parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor, prod.estoque, prod.data_cadastro, prod.visitas
			FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ? ORDER BY ? LIMIT ?, 10";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function tabelaProdutoPorTag($place_tags, $parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor, prod.estoque, prod.data_cadastro, prod.visitas
			FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			AND rel.id_tag IN ($place_tags) ORDER BY ? LIMIT ?, 10";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function tabelaProdutoPorCategoriaTag($place_tags, $parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor, prod.estoque, prod.data_cadastro, prod.visitas
			FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ?
			AND rel.id_tag IN ($place_tags) ORDER BY ? LIMIT ?, 10";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function tabelaProdutoPorCategoriaEnome($parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor, prod.estoque, prod.data_cadastro, prod.visitas
			FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ?
			AND prod.nome LIKE ? ORDER BY ? LIMIT ?, 10";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		function tabelaProdutoPorTagsEnome($place_tags, $parametros) {
			$sql = "SELECT DISTINCT prod.id, prod.nome, prod.valor, prod.estoque, prod.data_cadastro, prod.visitas
			FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ?
			AND rel.id_tag IN ($place_tags)
			AND prod.nome LIKE ? ORDER BY ? LIMIT ?, 10";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}

		// Quantidade de resultados
		function qntdProdutoPorNome($parametros) {
			$sql = "SELECT count(DISTINCT(prod.id)) FROM produtos prod WHERE prod.nome LIKE ?";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);
			$qntd = $pesquisa->fetchAll()[0]['count(DISTINCT(prod.id))'];

			return $qntd;
		}

		function qntdProdutoPorCategoria($parametros) {
			$sql = "SELECT count(DISTINCT(prod.id)) FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ?";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);
			$qntd = $pesquisa->fetchAll()[0]['count(DISTINCT(prod.id))'];

			return $qntd;
		}

		function qntdProdutoPorTag($place_tags, $parametros) {
			$sql = "SELECT count(DISTINCT(prod.id)) FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			AND rel.id_tag IN ($place_tags)";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);
			$qntd = $pesquisa->fetchAll()[0]['count(DISTINCT(prod.id))'];

			return $qntd;
		}

		function qntdProdutoPorCategoriaTag($place_tags, $parametros) {
			$sql = "SELECT count(DISTINCT(prod.id)) FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ?
			AND rel.id_tag IN ($place_tags)";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);
			$qntd = $pesquisa->fetchAll()[0]['count(DISTINCT(prod.id))'];

			return $qntd;
		}

		function qntdProdutoPorCategoriaEnome($parametros) {
			$sql = "SELECT count(DISTINCT(prod.id)) FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ? AND prod.nome LIKE ?";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);
			$qntd = $pesquisa->fetchAll()[0]['count(DISTINCT(prod.id))'];

			return $qntd;
		}

		function qntdProdutoPorTagsEnome($place_tags, $parametros) {
			$sql = "SELECT count(DISTINCT(prod.id)) FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			WHERE rel.id_categoria = ?
			AND rel.id_tag IN ($place_tags)
			AND prod.nome LIKE ?";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);
			$qntd = $pesquisa->fetchAll()[0]['count(DISTINCT(prod.id))'];

			return $qntd;
		}

		// Busca de categorias e tags
		function categorias() {
			$sql = "SELECT DISTINCT id, nome FROM categorias ORDER BY nome";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute();

			return $pesquisa->fetchAll();
		}

		function categoriasPorProdNome($parametro) {
			$sql = "SELECT DISTINCT categoria.id, categoria.nome FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			JOIN categorias categoria ON categoria.id = rel.id_categoria
			WHERE prod.nome LIKE ? ORDER BY categoria.nome";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->bindParam(1, $parametro);
			$pesquisa->execute();

			return $pesquisa->fetchAll();
		}

		function categoriaPorProdID($parametro) {
			$sql = "SELECT DISTINCT cat.id, cat.nome FROM categorias as cat
			JOIN relacionamento as rel ON rel.id_categoria = cat.id
			WHERE rel.id_produto = ?";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->bindParam(1, $parametro);
			$pesquisa->execute();

			return $pesquisa->fetchAll();
		}

		function tags() {
			$sql = "SELECT DISTINCT id, nome FROM tags ORDER BY nome";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute();

			return $pesquisa->fetchAll();
		}

		function tagsPorProdID($parametro) {
			$sql = "SELECT DISTINCT tag.id, tag.nome FROM tags as tag
			JOIN relacionamento as rel ON rel.id_tag = tag.id
			WHERE rel.id_produto = ?";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->bindParam(1, $parametro);
			$pesquisa->execute();

			return $pesquisa->fetchAll();
		}

		function tagsPorCategoria($parametros) {
			$sql = "SELECT DISTINCT tag.id, tag.nome FROM produtos prod
			JOIN relacionamento rel ON prod.id = rel.id_produto
			JOIN tags tag ON tag.id = rel.id_tag
			JOIN categorias categoria ON categoria.id = rel.id_categoria
			WHERE categoria.id = ? AND prod.nome LIKE ?
			ORDER BY tag.nome";

			$pesquisa = $this->conexao->prepare($sql);
			$pesquisa->execute($parametros);

			return $pesquisa->fetchAll();
		}
	}
?>
