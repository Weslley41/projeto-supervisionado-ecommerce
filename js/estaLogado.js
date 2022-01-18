function estaLogado() {
	let logado = new XMLHttpRequest();
	logado.open('GET', '/ecommerce/php/view/requests/esta_logado.php' , true)
	logado.send();

	logado.onreadystatechange = () => {
		if (logado.readyState == 4) {
			let isLogged = logado.responseText;
			if (isLogged) {
				document.getElementById('label-user').innerText = "Sair";
				document.getElementById('box-user').href = "/ecommerce/php/login/logout.php";
			}
		}
	}
}
