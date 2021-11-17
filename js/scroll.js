function scrollProd(x, tipo) {
  let element = document.querySelector('.produtos-scroll.' + tipo)
  element.scrollLeft += x

  if (element.scrollLeft == 0) {
    blockButton('.' + tipo + '#btn-control-left')
  } else {
    unblockButton('.' + tipo + '#btn-control-left')
  }
  if (element.scrollLeft == element.scrollWidth - element.clientWidth) {
    blockButton('.' + tipo + '#btn-control-right')
  } else {
    unblockButton('.' + tipo + '#btn-control-right')
  }
}

function blockButton(element) {
  element = document.querySelector(element)
  element.style.pointerEvents = 'none'
  element.style.opacity = '0.5'
}

function unblockButton(element) {
  element = document.querySelector(element)
  element.style.pointerEvents = 'auto'
  element.style.opacity = '1'
}

scrollProd(0, 'novidades')
scrollProd(0, 'destaques')
