let html = document.querySelector("html");
let checkbox = document.getElementById("switch-theme");
checkbox.addEventListener('change', function() {
	html.classList.toggle('dark_mode');

	let novoEstado = html.className == 'dark_mode' ? 'on' : 'off';
	document.cookie = 'dark_mode=' + novoEstado;
})

function mudaTema() {
	let dark_mode = document.cookie;
	let estadoAtual = dark_mode.substring(dark_mode.indexOf('=') + 1);
	if (estadoAtual == 'on') {
		checkbox.click();
	}
}
