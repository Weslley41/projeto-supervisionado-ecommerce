<?php
	include_once('../../model/busca.php');
	class Tag
	{
		function __construct($conexao) {
			$this->conexao = $conexao;
			$this->busca = new Busca($conexao);
		}

		function cadastrar($nome) {
			$sql = "INSERT INTO tags(nome) VALUES(?)";
			$insercao = $this->conexao->prepare($sql);
			$insercao->bindParam(1, $nome);
			$insercao->execute();
		}

		function editar($id, $nome) {
			$sql = "UPDATE tags SET nome = ? WHERE id = ?";
			$edicao = $this->conexao->prepare($sql);
			$edicao->bindParam(1, $nome);
			$edicao->bindParam(2, $id);
			$edicao->execute();
		}

		function excluir($id) {
			$qntd_usos = $this->busca->qntdProdutoPorTag('?', array($id));
			if ($qntd_usos > 0) {
				return 'false';
			} else {
				$sql = "DELETE FROM tags WHERE id = ?";
				$exclusao = $this->conexao->prepare($sql);
				$exclusao->bindParam(1, $id);
				$exclusao->execute();

				$sql = "DELETE FROM prod_tags WHERE id_tag = ?";
				$exclusao = $this->conexao->prepare($sql);
				$exclusao->bindParam(1, $id);
				$exclusao->execute();

				return 'true';
			}
		}
	}
?>
