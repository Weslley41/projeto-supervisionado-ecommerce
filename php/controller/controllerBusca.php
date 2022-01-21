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
				"nome1" => "prod.nome DESC",
				"nome0" => "prod.nome"
			);

			if (in_array("user_busca", $param_keys)) {
				require '../../../vendor/autoload.php';
				session_start();
				$user = unserialize($_SESSION['loginUser']);
				$user_id = $user->getId();
				if ($parametros['user_busca'] == 'favoritos') {
					$limite = $parametros['limite'];
					$parametros = array($user_id, $limite);

					$resultado = $this->pesquisa->produtosFavoritos($parametros);
					$qntd_resultados = $this->pesquisa->qntdProdutosFavoritos($user_id);

					return $this->produtosComImagemJSON($qntd_resultados, $resultado);
				}
			}
			if (in_array("id", $param_keys)) {
					if (in_array("edicao", $param_keys))
						$produto = $this->pesquisa->produtoParaEdicao($parametros);
					else
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
						$parametros = array_merge(array($categoria), $tags, array("%$busca%", $parametros['limite']));
						$parametros_qntd = array_merge(array($categoria), $tags, array("%$busca%"));
						$place_tags = implode(',', array_fill(0, count($tags), '?'));

						$resultado = $this->pesquisa->produtoPorTagsEnome($place_tags, $parametros, $ordenacao);
						$qntd_resultados = $this->pesquisa->qntdProdutoPorTagsEnome($place_tags, $parametros_qntd);
					} else {
						$parametros = array($categoria, "%$busca%", $parametros['limite']);
						$parametros_qntd = array($categoria, "%$busca%");
		
						$resultado = $this->pesquisa->produtoPorCategoriaEnome($parametros, $ordenacao);
						$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoriaEnome($parametros_qntd);
					}
				} else {
					$parametros = array("%$busca%", $parametros['limite']);
					$parametros_qntd = array("%$busca%");

					$resultado = $this->pesquisa->produtoPorNome($parametros, $ordenacao);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorNome($parametros_qntd);
				}
			} else if (in_array("categoria", $param_keys)) {
				$categoria = $parametros['categoria'];
				if (in_array("tag", $param_keys)) {
					$tags = $parametros['tag'];
					$parametros = array_merge(array($categoria), $tags, array($parametros['limite']));
					$parametros_qntd = array_merge(array($categoria), $tags);
					$place_tags = implode(',', array_fill(0, count($tags), '?'));
		
					$resultado = $this->pesquisa->produtoPorCategoriaTag($place_tags, $parametros, $ordenacao);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoriaTag($place_tags, $parametros_qntd);
				} else {
					$parametros = array($categoria, $parametros['limite']);
					$parametros_qntd = array($categoria);
		
					$resultado = $this->pesquisa->produtoPorCategoria($parametros, $ordenacao);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoria($parametros_qntd);
				}
			} else if (in_array("tag", $param_keys)){
				$tags = $parametros['tag'];
				$parametros = array_merge($tags, array($parametros['limite']));
				$parametros_qntd = $tags;
				$place_tags = implode(',', array_fill(0, count($tags), '?'));
		
				$resultado = $this->pesquisa->produtoPorTag($place_tags, $parametros, $ordenacao);
				$qntd_resultados = $this->pesquisa->qntdProdutoPorTag($place_tags, $parametros_qntd);
			} else {
				$parametros = array("%%", $parametros['limite']);
				$parametros_qntd = array("%%");
		
				$resultado = $this->pesquisa->produtoPorNome($parametros, $ordenacao);
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
				"nome1" => "prod.nome DESC",
				"nome0" => "prod.nome"
			);
			$ordenacao = $lista_ordenacao[$parametros['order']];

			if (in_array("busca", $param_keys)) {
				$busca = $parametros['busca'];
				if (in_array("categoria", $param_keys)) {
					$categoria = $parametros['categoria'];
					if (in_array("tag", $param_keys)) {
						$tags = $parametros['tag'];
						$parametros = array_merge(array($categoria), $tags, array("'%$busca%'", $parametros['limite']));
						$parametros_qntd = array_merge(array($categoria), $tags, array("'%$busca%'"));
						$place_tags = implode(',', array_fill(0, count($tags), '?'));

						$resultado = $this->pesquisa->tabelaProdutoPorTagsEnome($place_tags, $parametros, $ordenacao);
						$qntd_resultados = $this->pesquisa->qntdProdutoPorTagsEnome($place_tags, $parametros_qntd);
					} else {
						$parametros = array($categoria, "%$busca%", $parametros['limite']);
						$parametros_qntd = array($categoria, "%$busca%");

						$resultado = $this->pesquisa->tabelaProdutoPorCategoriaEnome($parametros, $ordenacao);
						$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoriaEnome($parametros_qntd);
					}
				} else {
					$parametros = array("%$busca%", $parametros['limite']);
					$parametros_qntd = array("%$busca%");
		
					$resultado = $this->pesquisa->tabelaProdutoPorNome($parametros, $ordenacao);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorNome($parametros_qntd);
				}
			} else if (in_array("categoria", $param_keys)) {
				$categoria = $parametros['categoria'];
				if (in_array("tag", $param_keys)) {
					$tags = $parametros['tag'];
					$parametros = array_merge(array($categoria), $tags, array($parametros['limite']));
					$parametros_qntd = array_merge(array($categoria), $tags);
					$place_tags = implode(',', array_fill(0, count($tags), '?'));
		
					$resultado = $this->pesquisa->tabelaProdutoPorCategoriaTag($place_tags, $parametros, $ordenacao);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoriaTag($place_tags, $parametros_qntd);
				} else {
					$parametros = array($categoria, $parametros['limite']);
					$parametros_qntd = array($categoria);
		
					$resultado = $this->pesquisa->tabelaProdutoPorCategoria($parametros, $ordenacao);
					$qntd_resultados = $this->pesquisa->qntdProdutoPorCategoria($parametros_qntd);
				}
			} else if (in_array("tag", $param_keys)){
				$tags = $parametros['tag'];
				$parametros = array_merge($tags, array($parametros['limite']));
				$parametros_qntd = $tags;
				$place_tags = implode(',', array_fill(0, count($tags), '?'));
		
				$resultado = $this->pesquisa->tabelaProdutoPorTag($place_tags, $parametros, $ordenacao);
				$qntd_resultados = $this->pesquisa->qntdProdutoPorTag($place_tags, $parametros_qntd);
			} else {
				$parametros = array("%%", $parametros['limite']);
				$parametros_qntd = array("%%");
		
				$resultado = $this->pesquisa->tabelaProdutoPorNome($parametros, $ordenacao);
				$qntd_resultados = $this->pesquisa->qntdProdutoPorNome($parametros_qntd);
			}

			return $this->produtosToJSON($qntd_resultados, $resultado);
		}

		function buscaImagens($parametros) {
			$resultado = $this->pesquisa->imagens($parametros);
			
			return $this->toJSON('imagens', $resultado);
		}

		function buscaCategorias($show_count=false) {
			$categorias = $this->pesquisa->categorias();

			return $this->toJSON('categorias', $categorias, $show_count);
		}

		function buscaTags($show_count=false) {
			$tags = $this->pesquisa->tags();

			return $this->toJSON('tags', $tags, $show_count);
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
			$produto = $resultado[0];
			$parametros = array($produto['id'], 10);
			$imagens = $this->pesquisa->imagens($parametros);
			$categoria = $this->pesquisa->categoriaPorProdID($produto['id']);
			$tags = $this->pesquisa->tagsPorProdID($produto['id']);

			$produtoCompleto = array_merge($produto, array('categoria' => $categoria, 'tags' => $tags, 'imagens' => $imagens));
			$json = '{"produto":' . json_encode($produtoCompleto) . '}';

			return $json;
		}

		private function toJSON($rotulo, $resultado, $show_count=false) {
			$json = '{"' . $rotulo .'":[';
			foreach($resultado as $item) {
				if ($show_count) {
					if ($rotulo == 'categorias')
						$count = $this->pesquisa->qntdProdutoPorCategoria(array($item['id']));
					else
						$count = $this->pesquisa->qntdProdutoPorTag('?', array($item['id']));
					
					$item = array_merge($item, array('usos' => $count));
				}
				$json .= json_encode($item) . ',';
			}
			$json[-1] = "]";
			$json .= "}";

			return $json;
		}
	}
?>
