<?php
	include_once('../../model/pedidos.php');
	class controllerPedidos
	{
		function __construct($conexao, $user_id) {
			$this->conexao = $conexao;
			$this->pedidos = new Pedidos($conexao, $user_id);
		}

		function verPedidos($limite) {
			$pedidos = $this->pedidos->getPedidos($limite);
			$qntd_pedidos = $this->pedidos->getQntdPedidos($limite);

			$json = '{ "qntd_pedidos": ' . $qntd_pedidos . ', "pedidos": ' . json_encode($pedidos) . '}';
			return $json;
		}

		function detalhesPedido($id_pedido) {
			$pedido = $this->pedidos->getDetalhesPedido($id_pedido);
			$valor_total = $this->pedidos->getValorPedido($id_pedido);

			$json = '{ "pedido": ' . json_encode($pedido) . ', "valor_total": ' . $valor_total . '}';
			return $json;
		}

		function pedidosUsuario($limite) {
			$pedidos = $this->pedidos->getUserPedidos($limite);
			$qntd_pedidos = $this->pedidos->getQntdUserPedidos();

			$json = '{ "qntd_pedidos": ' . $qntd_pedidos . ', "pedidos": ' . json_encode($pedidos) . '}';
			return $json;
		}
	}
?>
