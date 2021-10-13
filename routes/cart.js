const {Router} = require('express')
const router = Router()
const Course = require('../models/course')

router.post('/add', async (req, res) => {
 try {
   const course = await Course.findById(req.body.id) //find метод mongoose
   await req.user.addToCart(course)
   res.redirect('/cart')
 } catch(e) {
   console.log(e)
 }
})

router.get('/', async (req, res) => {
  // const cart = await Cart.getAll()
  // res.render('cart', {
  //   title: 'Корзина',
  //   isCart: true,
  //   courses: cart.courses,
  //   price: cart.price
  // })
  res.json({test: true})
})

router.delete('/remove/:id', async (req, res) => {
  // const cart = await Cart.remove(req.params.id);
  // res.status(200).json(cart)
  res.json({test: true})
})

module.exports = router