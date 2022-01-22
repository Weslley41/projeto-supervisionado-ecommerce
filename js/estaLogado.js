function estaLogado() {
	let logado = new XMLHttpRequest();
	logado.open('GET', '/ecommerce/php/view/requests/esta_logado.php', true)
	logado.send();

	logado.onreadystatechange = () => {
		if (logado.readyState == 4) {
			let user = logado.responseText;
			if (user) {
				document.getElementById('label-user').innerText = user;
				document.getElementById('box-user').href = "/ecommerce/php/login/logout.php";
			} else {
				userMenu = () => {
					open('/ecommerce/php/login/', '_self');
				};
			}
		}
	}
}
