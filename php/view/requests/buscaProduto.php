<?php
	include_once('../../db/conexao.php');
	include_once('../../controller/controllerBusca.php');

	$conexao = (new Conexao())->getConexao();
	$pesquisa = new controllerBusca($conexao);
	$parametros = $_GET;

	if (in_array('tipo', array_keys($parametros))) {
		if (in_array('tipo', array_keys($parametros)) and $parametros['tipo'] == 'tabela')
			echo $pesquisa->buscaProdutoTabela($parametros);
		else
			echo $pesquisa->buscaProdutoTabela($parametros, false);
	}	else
		echo $pesquisa->buscaProduto($parametros);
?>
