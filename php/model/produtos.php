<?php
	class Produtos
	{
		function __construct($conexao) {
			$this->conexao = $conexao;
		}

		function novoProduto() {
			// Coletando as informações do formulário
			$nome = $_POST['nome'].trim(' ');
			$valor = $_POST['valor'].trim(' ');
			$estoque = $_POST['estoque'].trim(' ');
			$categoria = $_POST['categoria'];
			$tags = $_POST['tag'];
			$thumb_image = $_FILES['thumb-image']['tmp_name'];
			$images = $_FILES['images']['tmp_name'];

			// Inserindo produto
			$insercao = $this->conexao->prepare('INSERT INTO produtos(nome, id_categoria, valor, estoque, data_cadastro) VALUES (?, ?, ?, ?, ?)');
			$parametros = array($nome, $categoria, $valor, $estoque, date('Y-m-d H-m-s'));
			$insercao->execute($parametros);

			// Pegando a ID do produto inserido
			$id = $this->conexao->lastInsertId();
			// Criando relacionamento com a categoria/tags
			foreach ($tags as $tag) {
				$insercao = $this->conexao->prepare("INSERT INTO prod_tags VALUES (?, ?)");
				$parametros = array($id, $tag);
				$insercao->execute($parametros);
			}
			// Salvando e inserindo imagens
			$path = "../../../assets/produtos/";
			$filename = "P$id" . "_I0.jpg";
			$caminho = $path . $filename;

			move_uploaded_file($thumb_image, $caminho);
			$insercao = $this->conexao->prepare("INSERT INTO imagens(id_produto, caminho) VALUES (?, ?)");
			$parametros = array($id, $caminho);
			$insercao->execute($parametros);

			foreach ($images as $key => $image) {
				$i = $key + 1;
				$filename = "P$id" . "_I$i.jpg";
				$caminho = $path . $filename;
				
				if (move_uploaded_file($image, $caminho)) {
					$insercao = $this->conexao->prepare("INSERT INTO imagens(id_produto, caminho) VALUES (?, ?)");
					$parametros = array($id, $caminho);
					$insercao->execute($parametros);
				}
			}
		}

		function atualizaProduto() {
			// Coletando as informações do formulário
			$id = $_GET['id'];
			$nome = $_POST['nome'].trim(' ');
			$valor = $_POST['valor'].trim(' ');
			$estoque = $_POST['estoque'].trim(' ');
			$categoria = $_POST['categoria'];
			$parametros = array($nome, $categoria, $valor, $estoque, $id);
			// $tags = $_POST['tag'];
			// $thumb_image = $_FILES['thumb-image']['tmp_name'];
			// $images = $_FILES['images']['tmp_name'];

			$sql = "UPDATE produtos SET nome = ?, id_categoria = ?, valor = ?, estoque = ? WHERE id = ?";
			$update = $this->conexao->prepare($sql);
			$update->execute($parametros);
		}

		function excluir($id) {
			$sqlProdutos = "DELETE FROM produtos WHERE id = ?";
			$sqlImagens = "DELETE FROM imagens WHERE id_produto = ?";
			$sqlRelacionamento = "DELETE FROM prod_tags WHERE id_produto = ?";

			$prepareProdutos = $this->conexao->prepare($sqlProdutos);
			$prepareProdutos->bindParam(1, $id);
			$prepareImagens = $this->conexao->prepare($sqlImagens);
			$prepareImagens->bindParam(1, $id);
			$prepareRelacionamento = $this->conexao->prepare($sqlRelacionamento);
			$prepareRelacionamento->bindParam(1, $id);

			$prepareProdutos->execute();
			$prepareImagens->execute();
			$prepareRelacionamento->execute();

			// Exclusão de imagens no disco
			foreach (glob("../../../assets/produtos/P".$id."_*.jpg") as $filename) {
				unlink($filename);
			}
		}
	}
?>
