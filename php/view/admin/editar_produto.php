<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="/ecommerce/assets/favicon/favicon.ico" type="image/x-icon">
	<title>Editar produto</title>
	<!-- Fonte -->
	<link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap" rel="stylesheet">
	<!-- CSS -->
	<link rel="stylesheet" href="../../../css/cores.css">
	<link rel="stylesheet" href="../../../css/header.css">
	<link rel="stylesheet" href="../../../css/header_admin.css">
	<link rel="stylesheet" href="../../../css/switch_theme.css">
	<link rel="stylesheet" href="../../../css/btn_padrao.css">
	<link rel="stylesheet" href="../../../css/novo_produto.css">
	<link rel="stylesheet" href="../../../css/select.css">
	<!-- JS -->
	<script src="../../../js/select.js"></script>
	<script src="../../../js/novoProduto.js"></script>
	<script src="../../../js/editarProduto.js"></script>
</head>
<body onload="editarProduto()">
	<?php
		include_once('../../login/login_admin.php');
		include_once('../../../html/header_admin.html');

		include_once('../../db/conexao.php');
		include_once('../../model/produtos.php');
		$conexao = (new Conexao())->getConexao();
		$produtos = new Produtos($conexao);
		if (isset($_POST['btn-atualizar'])) {
			$produtos->atualizaProduto();
			header('Location: lista_produtos.php');
		}
	?>
</body>
</html>
