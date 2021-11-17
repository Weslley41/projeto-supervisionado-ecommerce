function alterar_modo_filtro() {
	let btn_filtro = document.getElementById("btn-filtro").checked;
	let sidebar = document.getElementById("box-sidebar");
	if (btn_filtro) {
		sidebar.style.display = "block";
	} else {
		sidebar.style.display = "none";
	}
}
