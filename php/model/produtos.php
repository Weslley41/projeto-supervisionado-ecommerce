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
			$insercao = $this->conexao->prepare('INSERT INTO produtos(nome, valor, estoque, data_cadastro) VALUES (?, ?, ?, ?)');
			$parametros = array($nome, $valor, $estoque, date('Y-m-d H-m-s'));
			$insercao->execute($parametros);

			// Pegando a ID do produto inserido
			$id = $this->conexao->lastInsertId();
			// Criando relacionamento com a categoria/tags
			foreach ($tags as $tag) {
				$insercao = $this->conexao->prepare("INSERT INTO relacionamento VALUES (?, ?, ?)");
				$parametros = array($id, $categoria, $tag);
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
	}
?>
