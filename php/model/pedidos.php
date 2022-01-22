<?php
	class Pedidos
	{
		function __construct($conexao, $id) {
			$this->conexao = $conexao;
			$this->id = $id;
		}

		function getPedidos($limite) {
			$sql = "SELECT id_pedido, id_usuario, valor, data_pedido FROM pedidos LIMIT ?, 10";
			$pedidos = $this->conexao->prepare($sql);
			$pedidos->bindParam(1, $limite, PDO::PARAM_INT);
			$pedidos->execute();

			return $pedidos->fetchAll(PDO::FETCH_ASSOC);
		}

		function getQntdPedidos() {
			$sql = "SELECT count(id_pedido) AS qntd_pedidos FROM pedidos";
			$qntd = $this->conexao->query($sql)->fetchAll(PDO::FETCH_ASSOC)[0]['qntd_pedidos'];

			return $qntd;
		}

		function getUserPedidos($limite) {
			$sql = "SELECT id_pedido, id_usuario, valor, data_pedido
			FROM pedidos WHERE id_usuario = ? LIMIT ?, 10";
			$pedidos = $this->conexao->prepare($sql);
			$pedidos->bindParam(1, $this->id);
			$pedidos->bindParam(2, $limite, PDO::PARAM_INT);
			$pedidos->execute();

			return $pedidos->fetchAll(PDO::FETCH_ASSOC);
		}

		function getQntdUserPedidos() {
			$sql = "SELECT count(id_pedido) AS qntd_pedidos FROM pedidos WHERE id_usuario = ?";
			$pedidos = $this->conexao->prepare($sql);
			$pedidos->bindParam(1, $this->id);
			$pedidos->execute();
			$qntd = $pedidos->fetchAll(PDO::FETCH_ASSOC)[0]['qntd_pedidos'];

			return $qntd;
		}

		function getDetalhesPedido($id_pedido) {
			$sql = "SELECT ref_prod, nome_produto, qntd_pedido, valor_unit
			FROM produtos_pedidos WHERE id_pedido = ?";
			$pedidos = $this->conexao->prepare($sql);
			$pedidos->bindParam(1, $id_pedido);
			$pedidos->execute();

			return $pedidos->fetchAll(PDO::FETCH_ASSOC);
		}

		function getValorPedido($id_pedido) {
			$sql = "SELECT valor FROM pedidos WHERE id_pedido = ?";
			$valor = $this->conexao->prepare($sql);
			$valor->bindParam(1, $id_pedido, PDO::PARAM_INT);
			$valor->execute();
			$valor = $valor->fetchAll(PDO::FETCH_ASSOC)[0]['valor'];

			return $valor;
		}
	}
?>
