function criarSelect(localSelect, selectName, btnText, idSelect, multiple=false, search=false) {
	let divPrincipal = document.querySelector(localSelect);
	let select = document.createElement('select');
	select.id = idSelect;
	select.name = selectName;
	select.multiple = multiple;
	select.required = true;
	divPrincipal.appendChild(select);

	let divSelect = document.createElement('div');
	divSelect.id = 'div-' + idSelect;
	divSelect.className = 'div-select';
	let btnSelect = document.createElement('span');
	btnSelect.className = 'btn-select';
	btnSelect.innerText = btnText;
	btnSelect.setAttribute('onclick', 'dropdownOptions("div-' + idSelect + '")');
	divSelect.appendChild(btnSelect);
	let dropdownOptions = document.createElement('div');
	dropdownOptions.className = 'dropdown-options';
	if (search) {
		let searchOptions = document.createElement('input');
		searchOptions.className = 'search-options';
		searchOptions.setAttribute('onkeyup', 'buscaOpcoes("div-' + idSelect + '")');
		searchOptions.placeholder = 'Pesquise aqui';
		dropdownOptions.appendChild(searchOptions);
	}
	divSelect.appendChild(dropdownOptions);

	divPrincipal.appendChild(divSelect);
}

function selecionaOption(idSelect, idOption, multiple) {
	let opcao = document.getElementById(idOption).selected;
	if (multiple) {
		if (opcao) {
			document.getElementById(idOption).selected = false;
			document.querySelector('#drop-' + idOption + ' .check-option').style.display = 'none';
			--tagsChecked;
		} else {
			document.getElementById(idOption).selected = true;
			document.querySelector('#drop-' + idOption + ' .check-option').style.display = 'flex';
			++tagsChecked;
		}

		if (tagsChecked) {
			if (tagsChecked > 1) {
				document.querySelector('#div-' + idSelect + ' .btn-select').innerText = tagsChecked + ' tags selecionadas';
			} else {
				document.querySelector('#div-' + idSelect + ' .btn-select').innerText = tagsChecked + ' tag selecionada';
			}
		} else {
			document.querySelector('#div-' + idSelect + ' .btn-select').innerText = 'Nenhuma tag selecionada';
		}
	} else {
		document.getElementById(idOption).selected = true;
		document.querySelectorAll('#' + idSelect + ' option').forEach(option => {
			if (option.selected) {
				document.querySelector('#drop-' + option.id + ' .check-option').style.display = 'flex';
				document.querySelector('#div-' + idSelect + ' .btn-select').innerText = option.innerText;
			} else {
				document.querySelector('#drop-' + option.id + ' .check-option').style.display = 'none';
			}
		});
	}
}

function limpaOptions() {
	tagsChecked = 0;
	document.querySelectorAll('.btn-select').forEach(btn => btn.innerText = 'Nada selecionado');
	document.querySelectorAll('.dropdown-options .check-option').forEach(option => option.style.display = 'none');
}

function dropdownOptions(idSelect, fechar=false) {
	if (fechar) {
		document.querySelector('#' + idSelect + ' .dropdown-options').style.display = 'none';
	} else {
		let menu = document.querySelector('#' + idSelect + ' .dropdown-options').style.display;
		document.querySelector('#' + idSelect + ' .dropdown-options').style.display = menu == 'flex' ? 'none' : 'flex';
	}
}

function buscaOpcoes(idSelect) {
	let busca = document.querySelector('#' + idSelect + ' .search-options').value.toLowerCase();
	document.querySelectorAll('#' + idSelect + ' .dropdown-options .option').forEach(option => {
		let label = option.innerText.toLowerCase();
		if (label.includes(busca)) {
			option.style.display = 'flex';
		} else {
			option.style.display='none';
		}
	});
}

var tagsChecked = 0;
