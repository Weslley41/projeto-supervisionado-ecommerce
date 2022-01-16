<?php
	include_once(__DIR__ . '/config.php');
	class Conexao
	{
		private $conexao;
		function __construct() {
			$this->conexao = new PDO("mysql:host=" . HOST . ";dbname=" . DB, USER, PASS);
			$this->conexao->exec("set names utf8");
		}

		function getConexao() {
			return $this->conexao;
		}
	}
?>
