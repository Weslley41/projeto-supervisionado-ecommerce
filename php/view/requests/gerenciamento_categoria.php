<?php
	include_once('../../db/conexao.php');
	include_once('../../model/categoria.php');

	$conexao = (new Conexao())->getConexao();
	$categoria = new Categoria($conexao);

	if ($_GET['acao'] == 'cadastrar') {
		$categoria->cadastrar($_GET['nome']);
	} else if ($_GET['acao'] == 'editar') {
		$categoria->editar($_GET['id'], $_GET['nome']);
	} else if ($_GET['acao'] == 'excluir') {
		echo $categoria->excluir($_GET['id']);
	}
?>
