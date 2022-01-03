<?php
	include_once('../../db/conexao.php');
	include_once('../../model/tag.php');

	$conexao = (new Conexao())->getConexao();
	$tag = new Tag($conexao);

	if ($_GET['acao'] == 'cadastrar') {
		$tag->cadastrar($_GET['nome']);
	} else if ($_GET['acao'] == 'editar') {
		$tag->editar($_GET['id'], $_GET['nome']);
	} else if ($_GET['acao'] == 'excluir') {
		$tag->excluir($_GET['id']);
	}
?>
