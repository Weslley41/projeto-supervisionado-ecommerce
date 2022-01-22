function mostrarPedidos(user) {
	let pedidos = new XMLHttpRequest();
	let acao = user ? 'pedidosUser' : 'verPedidos';
	pedidos.open('GET', '/ecommerce/php/view/requests/pedidos.php?acao=' + acao + '&limite=' + pagina * 10);
	pedidos.send();

	pedidos.onreadystatechange = () => {
		if (pedidos.readyState == pedidos.DONE) {
			let response = JSON.parse(pedidos.responseText);
			if (document.querySelectorAll('#tbody tr').length) {
				document.querySelectorAll('#tbody tr').forEach(linha => linha.remove());
			}

			let tbody = document.getElementById('tbody');
			response.pedidos.forEach(pedido => {
				let tr = document.createElement('tr');
				let tdID = document.createElement('td');
				tdID.id = 'coluna-pedido';
				tdID.innerText = pedido.id_pedido;
				tr.appendChild(tdID);
				let tdDetalhes = document.createElement('td');
				tdDetalhes.id = 'coluna-detalhes';
				tdDetalhes.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
				tdDetalhes.setAttribute('onclick', 'detalhesPedido(' + pedido.id_pedido + ')');
				tr.appendChild(tdDetalhes);
				let tdValor = document.createElement('td');
				tdValor.id = 'coluna-total';
				tdValor.innerText = 'R$ ' + pedido.valor.toFixed(2).replace('.', ',');
				tr.appendChild(tdValor);
				let tdData = document.createElement('td');
				tdData.id = 'coluna-data';
				let dataPedido = new Date(pedido.data_pedido);
				dataPedido = dataPedido.toLocaleDateString('br');
				tdData.innerText = dataPedido;
				tr.appendChild(tdData);
				tbody.appendChild(tr)
			});

			criarControlador(response.qntd_pedidos, 10, 'mostrarPedidos()');
		}
	}
}

function detalhesPedido(id_pedido) {
	let pedido = new XMLHttpRequest();
	pedido.open('GET', '/ecommerce/php/view/requests/pedidos.php?acao=detalhes&id=' + id_pedido);
	pedido.send();

	pedido.onreadystatechange = () => {
		if (pedido.readyState == pedido.DONE) {
			let response = JSON.parse(pedido.responseText);
			criarPopup('Pedido ' + id_pedido, '');
			criarBotoes([['Fechar', 'btn-confirmar', 'fecharPopup()']]);

			let popupConteudo = document.getElementById('popup-conteudo');
			let table = document.createElement('div');
			table.className = 'div-table';
			let thead = document.createElement('div');
			thead.className = 'div-thead';
			const colunas = [
				{
					"label": "Qntd",
					"id": "qntd-produto",
					"seletor": "qntd_pedido"
				},
				{
					"label": "Nome do produto",
					"id": "nome-produto",
					"seletor": "nome_produto"
				},
				{
					"label": "Valor unit.",
					"id": "valor-produto",
					"seletor": "valor_unit"
				}
			];
			colunas.forEach(coluna => {
				let th = document.createElement('span');
				th.className = 'span-th';
				th.id = coluna.id;
				th.innerText = coluna.label;
				thead.appendChild(th);
			});

			table.appendChild(thead)
			let separador = document.createElement('tr');
			separador.id = 'separador-popup';
			table.appendChild(separador);

			let tbody = document.createElement('div');
			tbody.className = 'div-tbody';

			response.pedido.forEach(produto => {
				let tr = document.createElement('span');
				tr.className = 'span-tr';

				colunas.forEach(coluna => {
					let td = document.createElement('span');
					td.className = 'span-td';
					td.id = coluna.id;
					if (coluna.id == 'nome-produto') {
						let url = "/ecommerce/php/view/user/detalhes_produto.php?id=" + produto.ref_prod;
						let nomeProduto = produto[coluna.seletor][0].toUpperCase() + produto[coluna.seletor].slice(1).toLowerCase();
						td.innerHTML = "<a href='" + url + "'>" + nomeProduto + "</a>";
						td.title = nomeProduto;
					} else if (coluna.id == 'valor-produto') {
						td.innerText = 'R$ ' + produto[coluna.seletor].toFixed(2).replace('.', ',');
					} else {
						td.innerText = produto[coluna.seletor];
					}

					tr.appendChild(td);
				});
				tbody.appendChild(tr);

			});
			table.appendChild(tbody);
			popupConteudo.appendChild(table);
			popupConteudo.appendChild(separador);

			let total = document.createElement('div');
			total.id = 'box-valor-total';
			let labelTotal = document.createElement('span');
			labelTotal.id = 'label-valor-total';
			labelTotal.innerText = 'Total';
			total.appendChild(labelTotal);
			let valorTotal = document.createElement('span');
			valorTotal.id = 'valor-total';
			valorTotal.innerText = 'R$ ' + response.valor_total.toFixed(2).replace('.', ',');
			total.appendChild(valorTotal);
			popupConteudo.appendChild(total);

		}
	}
}

function criarTabelaPedidos(user) {
	if (!document.getElementById('#box-conteudo')) {
		let body = document.querySelector('body');
		let boxConteudo = document.createElement('div');
		boxConteudo.id = 'box-conteudo';

		let table = document.createElement('table');
		table.id = 'tabela';
		boxConteudo.appendChild(table);
		let thead = document.createElement('thead');
		thead.id = 'cabecalho-tabela';
		let labels = [
			'Pedido', 'Detalhes', 'Total', 'Data'
		];
		labels.forEach(label => {
			let td = document.createElement('td');
			td.innerText = label;
			td.id = 'coluna-' + label.toLowerCase();
			
			thead.appendChild(td);
		});
		table.appendChild(thead);
		let tbody = document.createElement('tbody');
		tbody.id = 'tbody';
		table.appendChild(tbody)

		body.appendChild(boxConteudo);
	}
	mostrarPedidos(user);
}
