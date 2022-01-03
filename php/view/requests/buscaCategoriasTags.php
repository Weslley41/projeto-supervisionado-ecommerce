<?php
	include_once('../../db/conexao.php');
	include_once('../../controller/controllerBusca.php');

	$conexao = (new Conexao())->getConexao();
	$pesquisa = new controllerBusca($conexao);
	$parametros = $_GET;

	$categoria = array('categoria', 'categorias');
	if (in_array($parametros['tipo'], $categoria))
		echo $pesquisa->buscaCategorias();
	else
		echo $pesquisa->buscaTags();
?>
