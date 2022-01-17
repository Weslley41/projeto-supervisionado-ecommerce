<?php
	require '../../../vendor/autoload.php';
	session_start();
	if (!empty($_SESSION['loginUser'])) {
		include_once('../../model/usuario.php');
		include_once('../../db/conexao.php');

		$user_session = unserialize($_SESSION['loginUser']);
		$conexao = (new Conexao())->getConexao();
		$usuario = new Usuario($conexao, $user_session->getId());

		$acao = $_GET['acao'];
		
		if ($acao == 'adicionar') {
			$prod_id = $_GET['prod_id'];
			$usuario->favoritarProduto($prod_id);
		} else if ($acao == 'remover') {
			$prod_id = $_GET['prod_id'];
			$usuario->removerFavorito($prod_id);
		} else if ($acao == 'visualizar') {
			echo json_encode($usuario->getFavoritos());
		}
	}
?>
