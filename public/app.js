const formatCurrency = price => {
  return new Intl.NumberFormat('ru-Ru', {
    currency: 'rub',
    style: 'currency',
  }).format(price)
}

document.querySelectorAll('.price').forEach((node) => {
  node.textContent = formatCurrency(node.textContent)
})

const $cart = document.querySelector('#cart');

const deleteCartItem = (e) => {

  if(e.target.classList.contains('js-remove')) {
    const id = e.target.dataset.id
    //fetch returns promise, async await нельзя, тк работаем в браузере
    fetch('/cart/remove/' + id, {
      method: 'delete'
    }).then(res => {
      return res.json()
    })
      .then(cart => {
        if (cart.courses.length) {
          const newTable = cart.courses.map(course => {
            return (
              `<tr>
                <td>${course.title}</td>
                <td>${course.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-id="${course.id}">Удалить</button>
                </td>
              </tr>
              </tr>`)
          }).join()

          $cart.querySelector('tbody').innerHTML = newTable;
          $cart.querySelector('.price').textContent = formatCurrency(cart.price);
        } else {
          document.querySelector('#cart').innerHTML = '<p>Корзина  пуста</p>';
        }
      })
  }
}


if($cart) {
  $cart.addEventListener('click', (e) => deleteCartItem(e))
}

