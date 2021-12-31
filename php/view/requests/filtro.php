<?php
	include_once('../../db/conexao.php');
	include_once('../../controller/controllerBusca.php');

	$conexao = (new Conexao())->getConexao();
	$pesquisa = new controllerBusca($conexao);
	$parametros = $_GET;

	echo $pesquisa->filtrosJSON($parametros);
?>
