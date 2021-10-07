document.querySelectorAll('.price').forEach((node) => {
  node.textContent = new Intl.NumberFormat('ru-Ru', {
    currency: 'rub',
    style: 'currency',
  }).format(node.textContent)
})

const deleteCartItem = (e) => {
  if(e.target.classList.contains('js-remove')) {
    const id = e.target.dataset.id
    //fetch returns promise, async await нельзя, тк работаем в браузере
    fetch('/cart/remove/' + id, {
      method: 'delete'
    }).then(res => res.json())
      .then(cart => console.log('cart:', cart))
  }
}

const $cart = document.querySelector('#cart');
if($cart) {
  $cart.addEventListener('click', (e) => deleteCartItem(e))
}

