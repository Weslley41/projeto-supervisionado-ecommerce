<?php
	session_start();
	session_destroy();
	header('Location: /ecommerce/php/login/');
	die();
?>
