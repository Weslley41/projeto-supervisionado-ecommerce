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
	}
?>
