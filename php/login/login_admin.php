<?php
	require '../../../vendor/autoload.php';
	session_start();
	if (empty($_SESSION['loginUser'])){
		header("Location: /ecommerce/php/login/");
		die();
	} else {
		include_once('../../db/conexao.php');

		$conexao = (new Conexao())->getConexao();
		$user = unserialize($_SESSION['loginUser']);
		$userID = $user->getId();

		$sql = "SELECT adm FROM usuarios WHERE id = ?";
		$adm = $conexao->prepare($sql);
		$adm->execute([$userID]);

		$adm = $adm->fetch(PDO::FETCH_ASSOC);
		
		if ($adm['adm'] != 1) {
			header("Location: /ecommerce/php/view/user/unauthorized.php");
		}
	}
?>
