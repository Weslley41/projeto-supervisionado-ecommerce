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
			$sql = "SELECT id_produto, qntd_produto FROM user_cart WHERE id_usuario = ?";
			$carrinho = $this->conexao->prepare($sql);
			$carrinho->bindParam(1, $this->id);
			$carrinho->execute();

			return $carrinho->fetchAll(PDO::FETCH_ASSOC);
		}

		function prod_inCart($idProduto, $only_cart=false) {
			$carrinho = $this->getCarrinho();
			$in_cart = false;
			$qntd_atual = 0;
			foreach ($carrinho as $produto) {
				if ($produto['id_produto'] == $idProduto) {
					$in_cart = true;
					$qntd_atual = $produto['qntd_produto'];
					break;
				}
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
	}
?>
