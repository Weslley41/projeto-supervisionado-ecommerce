<?php
	include_once('../../login/login_admin.php');
	include_once('../../db/conexao.php');
	include_once('../../model/produtos.php');
	$conexao = (new Conexao())->getConexao();
	$produtos = new Produtos($conexao);

	$acao = $_GET['acao'];
	$id = $_GET['id'];

	if ($acao == 'desabilitar') {
		$produtos->desabilitar($id);
	} else if ($acao == 'habilitar') {
		$produtos->habilitar($id);
	}
?>
