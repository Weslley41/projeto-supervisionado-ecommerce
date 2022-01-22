<?php
	require '../../../vendor/autoload.php';
	session_start();
	include_once('../../controller/controllerPedidos.php');
	include_once('../../db/conexao.php');

	$acao = $_GET['acao'];
	$conexao = (new Conexao())->getConexao();
	$user_session = unserialize($_SESSION['loginUser']);
	$pedidos = new controllerPedidos($conexao, $user_session->getId());

	if ($acao == 'verPedidos') {
		include_once('../../login/login_admin.php');
		$limite = $_GET['limite'];
		echo $pedidos->verPedidos($limite);
	} else if ($acao == 'pedidosUser') {
		$limite = $_GET['limite'];
		echo $pedidos->pedidosUsuario($limite);
	} else if ($acao == 'detalhes') {
		$id_pedido = $_GET['id'];
		echo $pedidos->detalhesPedido($id_pedido);
	}
?>
