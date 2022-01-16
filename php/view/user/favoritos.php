<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="/ecommerce/assets/favicon/favicon.ico" type="image/x-icon">
	<title>Favoritos</title>
</head>
<body>
	<?php
		require '../../../vendor/autoload.php';
		session_start();
		if (empty($_SESSION['loginUser'])) {
			header("Location: /ecommerce/php/login/");
		} else {
			echo "<h1>Favoritos</h1>";
		}
	?>
</body>
</html>
