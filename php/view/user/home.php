<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="/ecommerce/assets/favicon/favicon.ico" type="image/x-icon">
	<title>Ecommerce</title>
	<!-- Fonte -->
	<link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap" rel="stylesheet">
	<!-- CSS -->
	<link rel="stylesheet" href="../../../css/home.css">
	<link rel="stylesheet" href="../../../css/cores.css">
	<link rel="stylesheet" href="../../../css/header.css">
	<link rel="stylesheet" href="../../../css/switch_theme.css">
	<link rel="stylesheet" href="../../../css/sidebar.css">
	<link rel="stylesheet" href="../../../css/btn_categoria.css">
	<link rel="stylesheet" href="../../../css/btn_tag.css">
	<link rel="stylesheet" href="../../../css/produtos.css">
	<link rel="stylesheet" href="../../../css/scroll_produtos.css">
	<!-- JS -->
	<script src="../../../js/criarProduto.js"></script>
	<script src="../../../js/criarBoxScroll.js"></script>
	<script src="../../../js/menu_categoria.js"></script>
	<script src="../../../js/filtro.js"></script>
	<script src="../../../js/favoritos.js"></script>
</head>

<body>
	<?php
		include_once('../../../html/header.html');
		include_once('../../../html/sidebar.html');
	?>
	<script src="../../../js/scroll.js"></script>
	<script>
		criarBoxSroll('#box-conteudo', 'Novidades');
		criarBoxSroll('#box-conteudo', 'Destaques');
		exibirFiltros();
		selecionaFavoritos();
	</script>
</body>
</html>
