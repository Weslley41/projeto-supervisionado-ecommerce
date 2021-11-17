<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Ecommerce</title>
	<!-- Fonte -->
	<link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap" rel="stylesheet">
	<!-- CSS -->
	<link rel="stylesheet" href="../css/home.css">
	<link rel="stylesheet" href="../css/cores.css">
	<link rel="stylesheet" href="../css/header.css">
	<link rel="stylesheet" href="../css/switch_theme.css">
	<link rel="stylesheet" href="../css/sidebar.css">
	<link rel="stylesheet" href="../css/btn_categoria.css">
	<link rel="stylesheet" href="../css/btn_tag.css">
	<link rel="stylesheet" href="../css/produtos.css">
	<link rel="stylesheet" href="../css/busca.css">
	<!-- JS -->
	<script src="../js/filtro.js"></script>
</head>
<body>
	<?php
		echo '<div id="box-header">';
		include_once('../html/hard_coded/header.html');
		echo '</div>';

		echo '<div id="box-sidebar-conteudo">';
		echo '<div id="box-sidebar">';
		include_once('../html/hard_coded/sidebar.html');
		echo '</div>';

		echo '<div id="box-conteudo">';
		include_once('../html/hard_coded/busca.html');
		echo '</div></div>';
	?>
</body>
</html>
