function menu_categoria(index) {
	let radio = document.getElementsByName("categoria")
	let display_menu_clicado = document.getElementById('categoria' + index).style.display

	if (ultimo_clicado == index && display_menu_clicado == 'flex') {
		radio[index].checked = false
	}

	for (let i = 0; i < radio.length; i++) {
		if (radio[i].checked == true) {
			document.getElementById('categoria' + i).style.display = 'flex'
		} else {
			document.getElementById('categoria' + i).style.display = 'none'
			document.querySelectorAll('#categoria' + i + ' .btn-tag').forEach (tag => tag.checked = false)
		}
	}
	ultimo_clicado = index
}

ultimo_clicado = null
