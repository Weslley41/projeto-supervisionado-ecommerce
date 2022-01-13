function menu_categoria(index) {
	let radio = document.getElementsByName("categoria")
	let display_menu_clicado = document.getElementById('menu-categoria' + index).style.display

	if (ultimo_clicado == index && display_menu_clicado == 'flex') {
		radio.forEach(element => {
			if (element.value == index) {
				element.checked = false
			}
		});
	}

	document.querySelectorAll('.box-btn-categoria').forEach (element => {
    let inputElement = element.children[0];
		
		if (inputElement.checked) {
			document.getElementById('menu-categoria' + inputElement.value).style.display = 'flex'
		} else {
			document.getElementById('menu-categoria' + inputElement.value).style.display = 'none'
			document.querySelectorAll('#menu-categoria' + inputElement.value + ' .btn-tag').forEach(tag => tag.checked = false)
		}
	})

	ultimo_clicado = index
}

ultimo_clicado = null
