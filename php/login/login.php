<?php
	use League\OAuth2\Client\Provider\Google;
	require '../../vendor/autoload.php';
	include_once('config_oauth.php');
	include_once('../model/usuario.php');
	include_once('../db/conexao.php');

	session_start();

	if (empty($_SESSION['loginUser'])) {
		$google = new Google(GOOGLE);
		$authUrl = $google->getAuthorizationUrl();
		$code = filter_input(INPUT_GET, 'code');

		if ($code) {
			$token = $google->getAccessToken('authorization_code', ['code' => $code]);

			$_SESSION['loginUser'] = serialize($google->getResourceOwner($token));
			header('Location: index.php');
			die();
		} else {
			echo "<a href='$authUrl'><button class='g-signin2'></button></a>";
		}

	} else {
		$conexao = (new Conexao())->getConexao();
		$user = unserialize($_SESSION['loginUser']);
		
		try {
			$sql = "INSERT INTO usuarios (id, nome) VALUES (?, ?)";
			$novo_usuario = $conexao->prepare($sql);
			$novo_usuario->execute([$user->getId(), $user->getName()]);
		} catch (Exception $e) {
			// usuário já cadastrado
		}

		header('Location: /ecommerce/php/view/user/home.php');
	}
?>
