<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="/ecommerce/assets/favicon/favicon.ico" type="image/x-icon">
	<title>Pedidos</title>
	<!-- Fonte -->
	<link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap" rel="stylesheet">
	<!-- CSS -->
	<link rel="stylesheet" href="../../../css/cores.css">
	<link rel="stylesheet" href="../../../css/header.css">
	<link rel="stylesheet" href="../../../css/tabela.css">
	<link rel="stylesheet" href="../../../css/lista_produtos.css">
	<link rel="stylesheet" href="../../../css/pedidos.css">
	<link rel="stylesheet" href="../../../css/header_admin.css">
	<link rel="stylesheet" href="../../../css/switch_theme.css">
	<link rel="stylesheet" href="../../../css/btn_padrao.css">
	<link rel="stylesheet" href="../../../css/popup.css">
	<!-- JS -->
	<script src="../../../js/mostrarPedidos.js"></script>
	<script src="../../../js/controladorPaginas.js"></script>
	<script src="../../../js/popup.js"></script>
</head>
<body onload="criarTabelaPedidos(false)">
	<?php
		include_once('../../login/login_admin.php');
		include_once('../../../html/header_admin.html');
	?>
</body>
</html>
