<?php
	class Usuario
	{
		function __construct($conexao, $id) {
			$this->conexao = $conexao;
			$this->id = $id;
		}

		function favoritarProduto($idProduto) {
			$favoritos = $this->getFavoritos();
			if (!in_array($idProduto, $favoritos)) {
				$sql = "INSERT INTO fav_user (id_usuario, id_produto) VALUES (?, ?)";
				$favoritar = $this->conexao->prepare($sql);
				$favoritar->execute(array($this->id, $idProduto));
			}
		}

		function removerFavorito($idProduto) {
			$sql = "DELETE FROM fav_user WHERE id_usuario = ? AND id_produto = ?";
			$remover = $this->conexao->prepare($sql);
			$remover->execute(array($this->id, $idProduto));
		}

		function getFavoritos() {
			$sql = "SELECT id_produto FROM fav_user WHERE id_usuario = ?";
			$favoritos = $this->conexao->prepare($sql);
			$favoritos->bindParam(1, $this->id);
			$favoritos->execute();

			$favoritos_array = array();
			foreach ($favoritos->fetchAll(PDO::FETCH_ASSOC) as $favorito) {
				$favoritos_array[] = $favorito['id_produto'];
			}

			return $favoritos_array;
		}

		function isFav($prod_id) {
			$sql = "SELECT prod.id, prod.disponivel AS disponivel
			FROM fav_user fav JOIN produtos prod ON fav.id_produto = prod.id
			WHERE fav.id_usuario = ? AND fav.id_produto = ?";
			$isFav = $this->conexao->prepare($sql);
			$isFav->execute(array($this->id, $prod_id));

			$resultado = $isFav->fetchAll(PDO::FETCH_ASSOC);
			return $resultado;
		}

		function adicionarAoCarrinho($idProduto, $qntd_produto) {
			[$in_cart, $qntd_atual] = $this->prod_inCart($idProduto);

			if (!$in_cart) {
				$sql = "INSERT INTO user_cart (id_usuario, id_produto, qntd_produto) VALUES (?, ?, ?)";
				$adicionar = $this->conexao->prepare($sql);
				$adicionar->execute(array($this->id, $idProduto, $qntd_produto));
			} else if ($qntd_atual != $qntd_produto) {
				$sql = "UPDATE user_cart SET qntd_produto = ? WHERE id_usuario = ? AND id_produto = ?";
				$atualizar = $this->conexao->prepare($sql);
				$atualizar->execute(array($qntd_produto, $this->id, $idProduto));
			}
		}

		function removerDoCarrinho($idProduto) {
			$sql = "DELETE FROM user_cart WHERE id_usuario = ? AND id_produto = ?";
			$remover = $this->conexao->prepare($sql);
			$remover->execute(array($this->id, $idProduto));
		}

		function getCarrinho() {
			$sql = "SELECT p.id, cart.qntd_produto, p.nome, p.valor, img.caminho AS imagem FROM produtos p
			JOIN user_cart cart ON cart.id_produto = p.id AND cart.id_usuario = ?
			JOIN imagens img ON img.id_produto = p.id AND img.caminho LIKE '%I0.jpg'";
			$carrinho = $this->conexao->prepare($sql);
			$carrinho->bindParam(1, $this->id);
			$carrinho->execute();

			return $carrinho->fetchAll(PDO::FETCH_ASSOC);
		}

		function prod_inCart($idProduto, $only_cart=false) {
			$sql = "SELECT qntd_produto, prod.disponivel AS disponivel
			FROM user_cart JOIN produtos prod ON prod.id = ?
			WHERE id_usuario = ? AND id_produto = ?";
			$prepare_in_cart = $this->conexao->prepare($sql);
			$prepare_in_cart->execute(array($idProduto, $this->id, $idProduto));

			$resultado = $prepare_in_cart->fetchAll(PDO::FETCH_ASSOC);
			if ($resultado) {
				$prod_disponivel = $resultado[0]['disponivel'];
				$in_cart = $prod_disponivel ? true : 'indisponivel';
				$qntd_atual = $resultado[0]['qntd_produto'];
			} else {
				$in_cart = false;
				$qntd_atual = 0;
			}
			if ($only_cart) {
				return $in_cart;
			} else {
				return [$in_cart, $qntd_atual];
			}
		}

		function getValoresCarrinho() {
			$sql = "SELECT p.valor, cart.qntd_produto FROM user_cart cart
			JOIN produtos p ON p.id = cart.id_produto
			WHERE cart.id_usuario = ?";
			$carrinho = $this->conexao->prepare($sql);
			$carrinho->bindParam(1, $this->id);
			$carrinho->execute();

			return $carrinho->fetchAll(PDO::FETCH_ASSOC);
		}

		function limpaCarrinho() {
			$sql = "DELETE FROM user_cart WHERE id_usuario = ?";
			$limpar = $this->conexao->prepare($sql);
			$limpar->bindParam(1, $this->id);
			$limpar->execute();
		}

		function fazerPedido() {
			$valoresCarrinho = $this->getValoresCarrinho();
			$valor = 0;
			foreach($valoresCarrinho as $produto) {
				$valor += $produto['valor'] * $produto['qntd_produto'];
			}
			$parametros = array($this->id, $valor, date('Y-m-d H-m-s'));
			$sql = "INSERT INTO pedidos(id_usuario, valor, data_pedido) VALUES(?, ?, ?)";
			$pedido = $this->conexao->prepare($sql);
			$pedido->execute($parametros);

			$id_pedido = $this->conexao->lastInsertId();
			$carrinho = $this->getCarrinho();
			foreach($carrinho as $produto) {
				$parametros = array($id_pedido, $produto['id'], $produto['nome'],
														$produto['qntd_produto'], $produto['valor'],
														$produto['valor'] * $produto['qntd_produto']);
				$sql = "INSERT INTO produtos_pedidos VALUES(?, ?, ?, ?, ?, ?)";
				$ref_prod = $this->conexao->prepare($sql);
				$ref_prod->execute($parametros);
			}

			$this->limpaCarrinho();
		}
	}
?>
