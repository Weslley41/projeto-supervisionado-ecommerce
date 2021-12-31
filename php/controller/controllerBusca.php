<?php
	ini_set('display_errors', 1);
	ini_set('serialize_precision', -1);
	include_once('../../model/busca.php');

	class controllerBusca {
		function __construct($conexao) {
			$this->conexao = $conexao;
			$this->pesquisa = new Busca($conexao);
		}

		function buscaProduto($parametros) {
			$param_keys = array_keys($parametros);
			$lista_ordenacao = array(
				"postagem1" => "prod.data_cadastro DESC",
				"postagem0" => "prod.data_cadastro",
				"popularidade1" => "prod.visitas DESC",
				"popularidade0" => "prod.visitas",
				"valor1" => "prod.valor DESC",
				"valor0" => "prod.valor",
				"nome1" => "prod.nome",
				"nome0" => "prod.nome DESC"
			);

			if (in_array("id", $param_keys)) {
				$produto = $this->pesquisa->produtoPorID($parametros);

				return $this->produtoPorIdJSON($produto);
			} else
				$ordenacao = $lista_ordenacao[$parametros['order']];

			if (in_array("busca", $param_keys)) {
				$busca = $parametros['busca'];
				if (in_array("categoria", $param_keys)) {
					$categoria = $parametros['categoria'];
					if (in_array("tag", $param_keys)) {
						$tags = $parametros['tag'];
						$parametros = array_merge(array($categoria), $tags, array("'%$busca%'", $ordenacao, $parametros['limite']));
						$parametros_qntd = array_merge(array($categoria), $tags, array("'%$busca%'"));
						$place_tags = implode(',', array_fill(0, count($tags), '?'));

						$resultado = $this->pesquisa->produtoPorTagsEnome($place_tags, $parametros);
						$qntd_resultados = $this->pesquisa->qntdProdutoPorTagsEnome($place_tags, $parametros_qntd);
					} else {
						$parametros = array($categoria, "%$busca%", $ordenacao, $parametros['limite']);
						$parametros_qntd = array($categoria, "%$busca%");
		
						$resultado = $this->pesquisa->produtoPorCategoriaEnome($parametros);
						$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoriaEnome($parametros_qntd);
					}
				} else {
					$parametros = array("%$busca%", $ordenacao, $parametros['limite']);
					$parametros_qntd = array("%$busca%");
		
					$resultado = $this->pesquisa->produtoPorNome($parametros);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorNome($parametros_qntd);
				}
			} else if (in_array("categoria", $param_keys)) {
				$categoria = $parametros['categoria'];
				if (in_array("tag", $param_keys)) {
					$tags = $parametros['tag'];
					$parametros = array_merge(array($categoria), $tags, array($ordenacao, $parametros['limite']));
					$parametros_qntd = array_merge(array($categoria), $tags);
					$place_tags = implode(',', array_fill(0, count($tags), '?'));
		
					$resultado = $this->pesquisa->produtoPorCategoriaTag($place_tags, $parametros);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoriaTag($place_tags, $parametros_qntd);
				} else {
					$parametros = array($categoria, $ordenacao, $parametros['limite']);
					$parametros_qntd = array($categoria);
		
					$resultado = $this->pesquisa->produtoPorCategoria($parametros);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoria($parametros_qntd);
				}
			} else if (in_array("tag", $param_keys)){
				$tags = $parametros['tag'];
				$parametros = array_merge($tags, array($ordenacao, $parametros['limite']));
				$parametros_qntd = $tags;
				$place_tags = implode(',', array_fill(0, count($tags), '?'));
		
				$resultado = $this->pesquisa->produtoPorTag($place_tags, $parametros);
				$qntd_resultados = $this->pesquisa->qntdProdutoPorTag($place_tags, $parametros_qntd);
			} else {
				$parametros = array("%%", $ordenacao, $parametros['limite']);
				$parametros_qntd = array("%%");
		
				$resultado = $this->pesquisa->produtoPorNome($parametros);
				$qntd_resultados = $this->pesquisa->qntdProdutoPorNome($parametros_qntd);
			}

			return $this->produtosComImagemJSON($qntd_resultados, $resultado);
		}

		function buscaDestaques() {
			$produtos = $this->pesquisa->produtosDestaques();

			return $this->produtosComImagemJSON(10, $produtos);
		}

		function buscaNovidades() {
			$produtos = $this->pesquisa->produtosNovidades();

			return $this->produtosComImagemJSON(10, $produtos);
		}

		function buscaProdutoTabela($parametros) {
			$param_keys = array_keys($parametros);
			$lista_ordenacao = array(
				"postagem1" => "prod.data_cadastro DESC",
				"postagem0" => "prod.data_cadastro",
				"popularidade1" => "prod.visitas DESC",
				"popularidade0" => "prod.visitas",
				"valor1" => "prod.valor DESC",
				"valor0" => "prod.valor",
				"nome1" => "prod.nome",
				"nome0" => "prod.nome DESC"
			);
			$ordenacao = $lista_ordenacao[$parametros['order']];

			if (in_array("busca", $param_keys)) {
				$busca = $parametros['busca'];
				if (in_array("categoria", $param_keys)) {
					$categoria = $parametros['categoria'];
					if (in_array("tag", $param_keys)) {
						$tags = $parametros['tag'];
						$parametros = array_merge(array($categoria), $tags, array("'%$busca%'", $ordenacao, $parametros['limite']));
						$parametros_qntd = array_merge(array($categoria), $tags, array("'%$busca%'"));
						$place_tags = implode(',', array_fill(0, count($tags), '?'));

						$resultado = $this->pesquisa->tabelaProdutoPorTagsEnome($place_tags, $parametros);
						$qntd_resultados = $this->pesquisa->qntdProdutoPorTagsEnome($place_tags, $parametros_qntd);
					} else {
						$parametros = array($categoria, "%$busca%", $ordenacao, $parametros['limite']);
						$parametros_qntd = array($categoria, "%$busca%");

						$resultado = $this->pesquisa->tabelaProdutoPorCategoriaEnome($parametros);
						$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoriaEnome($parametros_qntd);
					}
				} else {
					$parametros = array("%$busca%", $ordenacao, $parametros['limite']);
					$parametros_qntd = array("%$busca%");
		
					$resultado = $this->pesquisa->tabelaProdutoPorNome($parametros);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorNome($parametros_qntd);
				}
			} else if (in_array("categoria", $param_keys)) {
				$categoria = $parametros['categoria'];
				if (in_array("tag", $param_keys)) {
					$tags = $parametros['tag'];
					$parametros = array_merge(array($categoria), $tags, array($ordenacao, $parametros['limite']));
					$parametros_qntd = array_merge(array($categoria), $tags);
					$place_tags = implode(',', array_fill(0, count($tags), '?'));
		
					$resultado = $this->pesquisa->tabelaProdutoPorCategoriaTag($place_tags, $parametros);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoriaTag($place_tags, $parametros_qntd);
				} else {
					$parametros = array($categoria, $ordenacao, $parametros['limite']);
					$parametros_qntd = array($categoria);
		
					$resultado = $this->pesquisa->tabelaProdutoPorCategoria($parametros);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoria($parametros_qntd);
				}
			} else if (in_array("tag", $param_keys)){
				$tags = $parametros['tag'];
				$parametros = array_merge($tags, array($ordenacao, $parametros['limite']));
				$parametros_qntd = $tags;
				$place_tags = implode(',', array_fill(0, count($tags), '?'));
		
				$resultado = $this->pesquisa->tabelaProdutoPorTag($place_tags, $parametros);
				$qntd_resultados = $this->pesquisa->qntdProdutoPorTag($place_tags, $parametros_qntd);
			} else {
				$parametros = array("%%", $ordenacao, $parametros['limite']);
				$parametros_qntd = array("%%");
		
				$resultado = $this->pesquisa->tabelaProdutoPorNome($parametros);
				$qntd_resultados = $this->pesquisa->qntdProdutoPorNome($parametros_qntd);
			}

			return $this->produtosToJSON($qntd_resultados, $resultado);
		}

		function buscaImagens($parametros) {
			$resultado = $this->pesquisa->imagens($parametros);
			
			return $this->toJSON('imagens', $resultado);
		}

		function buscaCategorias() {
			$categorias = $this->pesquisa->categorias();

			return $this->toJSON('categorias', $categorias);
		}

		function buscaTags() {
			$tags = $this->pesquisa->tags();

			return $this->toJSON('tags', $tags);
		}

		function filtrosJSON($parametros) {
			$param_keys = array_keys($parametros);
			if (in_array('busca', $param_keys))
				$busca = '%' . $parametros['busca'] . '%';
			else
				$busca = '%%';

			$json = '{"categorias":[';
			$categorias = $this->pesquisa->categoriasPorProdNome($busca);

			foreach($categorias as $categoria) {
				$json .= json_encode($categoria);
				$parametros = array($categoria['id'], $busca);
				$tags = $this->pesquisa->tagsPorCategoria($parametros);
				$json[-1] = ',';
				$json .= '"tags": [';
				foreach($tags as $tag) {
					$json .= json_encode($tag) . ",";
				}
				$json[-1] = ']';
				$json .= '},';
			}
			$json[-1] = ']';
			$json .= '}';

			return $json;
		}

		private function produtosToJSON($qntd_resultados, $resultado) {
			$json = '{ "quantidade": ' . $qntd_resultados . ', "produtos": [';
			foreach($resultado as $produto) {
				$categoria = $this->pesquisa->categoriaPorProdID($produto['id']);
				$tags = $this->pesquisa->tagsPorProdID($produto['id']);
				$produto = array_merge($produto, array('categoria' => $categoria), array('tags' => $tags));
				$json .= json_encode($produto) . ',';
			}
			$json[-1] = ']';
			$json .= "}";
		
			return $json;
		}

		private function produtosComImagemJSON($qntd_resultados, $resultado, $qntd_imagens = 1) {
			$json = '{ "quantidade": ' . $qntd_resultados . ', "produtos": [';
				foreach($resultado as $produto) {
					$json .= json_encode($produto);
					$json[-1] = ' ';
					$imagens = $this->buscaImagens(array($produto['id'], $qntd_imagens));
					$imagens[0] = ',';
					$json .= $imagens;
					$json .= ',';
				}
				$json[-1] = ']';
				$json .= "}";
			
				return $json;
		}

		private function produtoPorIdJSON($resultado) {
			$parametros = array($resultado[0]['id'], 10);
			$json = '{ "produto": ' . json_encode($resultado[0]);
			$json[-1] = ',';
			$imagens = $this->buscaImagens($parametros) . '}';
			$imagens[0] = ' ';
			$json .= $imagens;

			return $json;
		}

		private function toJSON($rotulo, $resultado) {
			$json = '{"' . $rotulo .'":[';
			foreach($resultado as $item) {
				$json .= json_encode($item) . ',';
			}
			$json[-1] = "]";
			$json .= "}";

			return $json;
		}
	}
?>
