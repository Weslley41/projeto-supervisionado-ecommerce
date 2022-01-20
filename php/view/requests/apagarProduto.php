<?php
	include_once('../../login/login_admin.php');
	include_once('../../db/conexao.php');
	include_once('../../model/produtos.php');
	$conexao = (new Conexao())->getConexao();
	$produtos = new Produtos($conexao);

	$id = $_GET['id'];
	$produtos->excluir($id);
?>
