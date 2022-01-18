<?php
	require '../../../vendor/autoload.php';
	session_start();

	echo !empty($_SESSION['loginUser']);
?>
