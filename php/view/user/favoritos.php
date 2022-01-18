<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="/ecommerce/assets/favicon/favicon.ico" type="image/x-icon">
	<title>Favoritos</title>
	<!-- Fonte -->
	<link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap" rel="stylesheet">
	<!-- CSS -->
	<link rel="stylesheet" href="../../../css/cores.css">
	<link rel="stylesheet" href="../../../css/header.css">
	<link rel="stylesheet" href="../../../css/switch_theme.css">
	<link rel="stylesheet" href="../../../css/produtos.css">
	<link rel="stylesheet" href="../../../css/busca.css">
	<link rel="stylesheet" href="../../../css/favoritos.css">
	<!-- JS -->
	<script src="../../../js/favoritos.js"></script>
	<script src="../../../js/criarProduto.js"></script>
	<script src="../../../js/controladorPaginas.js"></script>
	<script src="../../../js/estaLogado.js"></script>
</head>
<body onload="mostraFavoritos();estaLogado()">
	<?php
		require '../../../vendor/autoload.php';
		session_start();
		if (empty($_SESSION['loginUser'])) {
			header("Location: /ecommerce/php/login/");
		} else {
			include_once('../../../html/header.html');
		}
	?>
</body>
</html>
