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
			$id_prod = $_GET['id'];
			$qntd_prod = $_GET['qntd'];

			$usuario->adicionarAoCarrinho($id_prod, $qntd_prod);
		} else if ($acao == 'remover') {
			$id_prod = $_GET['id'];

			$usuario->removerDoCarrinho($id_prod);
		} else if ($acao == 'visualizar') {
			echo '{"produtos":' . json_encode($usuario->getCarrinho()) . '}';
		} else if ($acao == 'inCart') {
			$id_prod = $_GET['id'];
			echo $usuario->prod_inCart($id_prod, true);
		} else if ($acao == 'valores') {
			echo '{"produtos":' . json_encode($usuario->getValoresCarrinho()) . '}';
		} else if ($acao == 'fazerPedido') {
			$usuario->fazerPedido();
		} else if ($acao == 'limparCarrinho') {
			$usuario->limpaCarrinho();
		}
	}
?>
