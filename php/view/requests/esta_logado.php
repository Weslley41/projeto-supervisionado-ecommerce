<?php
	require '../../../vendor/autoload.php';
	session_start();

	if (empty($_SESSION['loginUser'])) {
		echo false;
	} else {
		$user = unserialize($_SESSION['loginUser']);
		echo $user->getFirstName();
	}
?>
