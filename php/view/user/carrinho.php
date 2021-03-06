<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="/ecommerce/assets/favicon/favicon.ico" type="image/x-icon">
	<title>Carrinho de compras</title>
	<!-- Fonte -->
	<link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap" rel="stylesheet">
	<!-- CSS -->
	<link rel="stylesheet" href="../../../css/cores.css">
	<link rel="stylesheet" href="../../../css/header.css">
	<link rel="stylesheet" href="../../../css/switch_theme.css">
	<link rel="stylesheet" href="../../../css/produtos.css">
	<link rel="stylesheet" href="../../../css/busca.css">
	<link rel="stylesheet" href="../../../css/favoritos.css">
	<link rel="stylesheet" href="../../../css/carrinho.css">
	<link rel="stylesheet" href="../../../css/btn_padrao.css">
	<link rel="stylesheet" href="../../../css/popup.css">
	<!-- JS -->
	<script src="../../../js/carrinho.js"></script>
	<script src="../../../js/criarProduto.js"></script>
	<script src="../../../js/controladorPaginas.js"></script>
	<script src="../../../js/estaLogado.js"></script>
	<script src="../../../js/popup.js"></script>
</head>
<body onload="mostraCarrinho();estaLogado()">
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
