let html = document.querySelector("html") 
let checkbox = document.getElementById("switch-theme")
checkbox.addEventListener('change', function() {
	html.classList.toggle('dark_mode')
})
