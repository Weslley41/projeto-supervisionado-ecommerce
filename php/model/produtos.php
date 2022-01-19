<?php
	include_once('../../model/busca.php');
	class Produtos
	{
		function __construct($conexao) {
			$this->conexao = $conexao;
			$this->busca = new Busca($conexao);
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
			$tags = $_POST['tag'];
			$thumb_image = $_FILES['thumb-image']['tmp_name'];
			$images = $_FILES['images']['tmp_name'];

			$sql = "UPDATE produtos SET nome = ?, id_categoria = ?, valor = ?, estoque = ? WHERE id = ?";
			$update = $this->conexao->prepare($sql);
			$update->execute($parametros);

			// Removendo tags que não serão mais usadas
			$parametros = array_merge(array($id), $tags);
			$place_tags = implode(',', array_fill(0, count($tags), '?'));
			$sqlDeleteTags = "DELETE FROM prod_tags WHERE id_produto = ? AND id_tag NOT IN ($place_tags)";
			$deleteTags = $this->conexao->prepare($sqlDeleteTags);
			$deleteTags->execute($parametros);

			// Analisando diferença entre tags novas e antigas
			$tags_antigas = array();
			$resultado = $this->busca->tagsPorProdID($id);
			foreach ($resultado as $tag) {
				array_push($tags_antigas, $tag['id']);
			}
			$diff = array_diff($tags, $tags_antigas);

			// Adicionando novas tags
			foreach ($diff as $tag) {
				$insercao = $this->conexao->prepare("INSERT INTO prod_tags VALUES (?, ?)");
				$parametros = array($id, $tag);
				$insercao->execute($parametros);
			}

			// Alteração de imagens
			$remaining_imgs = explode(',', $_POST['remaining-imgs']);

			// Remoção de imagens não utilizadas
			foreach (glob("../../../assets/produtos/P".$id."_*.jpg") as $filename) {
				$start = strpos($filename, 'I') + 1;
				$len = strpos($filename, '.jpg') - $start;
				$index_img = substr($filename, $start, $len);

				if (!in_array($index_img, $remaining_imgs)) {
					unlink($filename);

					$sql = "DELETE FROM imagens WHERE caminho = ?";
					$excluirImg = $this->conexao->prepare($sql);
					$excluirImg->bindParam(1, $filename, PDO::PARAM_STR);
					$excluirImg->execute();
				}
			}

			// Alteração de thumbnail
			if (isset($thumb_image)) {
				$path = "../../../assets/produtos/";
				$filename = "P$id" . "_I0.jpg";
				$caminho = $path . $filename;

				move_uploaded_file($thumb_image, $caminho);
			}

			// Adição de novas imagens
			foreach ($images as $image) {
				$index_img += 1;
				$filename = "P$id" . "_I$index_img.jpg";
				$caminho = $path . $filename;
				
				if (move_uploaded_file($image, $caminho)) {
					$insercao = $this->conexao->prepare("INSERT INTO imagens(id_produto, caminho) VALUES (?, ?)");
					$parametros = array($id, $caminho);
					$insercao->execute($parametros);
				}

			}
		}

		function excluir($id) {
			$sqlProdutos = "DELETE FROM produtos WHERE id = ?";
			$sqlImagens = "DELETE FROM imagens WHERE id_produto = ?";
			$sqlRelacionamento = "DELETE FROM prod_tags WHERE id_produto = ?";
			$sqlCarrinho = "DELETE FROM user_cart WHERE id_produto = ?";

			$prepareProdutos = $this->conexao->prepare($sqlProdutos);
			$prepareProdutos->bindParam(1, $id);
			$prepareImagens = $this->conexao->prepare($sqlImagens);
			$prepareImagens->bindParam(1, $id);
			$prepareRelacionamento = $this->conexao->prepare($sqlRelacionamento);
			$prepareRelacionamento->bindParam(1, $id);
			$prepareCarrinho = $this->conexao->prepare($sqlCarrinho);
			$prepareCarrinho->bindParam(1, $id);

			$prepareProdutos->execute();
			$prepareImagens->execute();
			$prepareRelacionamento->execute();
			$prepareCarrinho->execute();

			// Exclusão de imagens no disco
			foreach (glob("../../../assets/produtos/P".$id."_*.jpg") as $filename) {
				unlink($filename);
			}
		}
	}
?>
