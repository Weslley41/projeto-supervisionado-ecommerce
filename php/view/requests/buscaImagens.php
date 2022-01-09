<?php
	include_once('../../db/conexao.php');
	include_once('../../model/busca.php');

	$conexao = (new Conexao())->getConexao();
	$busca = new Busca($conexao);

	$parametros = array($_GET['id'], 10);
	$imagens = $busca->imagens($parametros);

	echo '{ "imagens":' . json_encode($imagens) . '}';
?>
