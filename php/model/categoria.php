<?php
	include_once('../../model/busca.php');
	class Categoria
	{
		function __construct($conexao) {
			$this->conexao = $conexao;
			$this->busca = new Busca($conexao);
		}

		function cadastrar($nome) {
			$sql = "INSERT INTO categorias(nome) VALUES(?)";
			$insercao = $this->conexao->prepare($sql);
			$insercao->bindParam(1, $nome);
			$insercao->execute();
		}

		function editar($id, $nome) {
			$sql = "UPDATE categorias SET nome = ? WHERE id = ?";
			$edicao = $this->conexao->prepare($sql);
			$edicao->bindParam(1, $nome);
			$edicao->bindParam(2, $id);
			$edicao->execute();
		}

		function excluir($id) {
			$qntd_usos = $this->busca->qntdProdutoPorCategoria(array($id));
			if ($qntd_usos > 0) {
				return 'false';
			} else {
				$sql = "DELETE FROM categorias WHERE id = ?";
				$exclusao = $this->conexao->prepare($sql);
				$exclusao->bindParam(1, $id);
				$exclusao->execute();

				return 'true';
			}
		}
	}
?>
