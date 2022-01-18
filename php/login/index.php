<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="/ecommerce/assets/favicon/favicon.ico" type="image/x-icon">
	<title>Página de login</title>
	<!-- Font -->
	<link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap" rel="stylesheet">
	<!-- CSS -->
	<link rel="stylesheet" href="../../css/cores.css">
	<link rel="stylesheet" href="../../css/login.css">
	<link rel="stylesheet" href="../../css/switch_theme.css">
</head>
<body onload="mudaTema()">
	<header>
		<span id="title">Página de Login</span>
		<input class="icon" type="checkbox" name="switch-theme" id="switch-theme">
		<script src="../../js/switch_theme.js"></script>
	</header>

	<main id="box-conteudo">
		<div id="box-login">
			<div id="header-login">Entrar com o Google</div>
			<div id="conteudo-login">
				<?php
					include_once('login.php');
				?>
			</div>
		</div>
	</main>
</body>
</html>
