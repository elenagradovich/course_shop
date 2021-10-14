const {Router} = require('express')
const router = Router()
const Course = require('../models/course')

function mapCartItems(cart) {
  return cart.items.map(item => ({
    ...item.courseId._doc,
    id: item.courseId.id,
    count: item.count
  }))
}

function countPrice(courses) {
  return courses.reduce((total, course) => total += course.price*course.count
  , 0)
}

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
  try {
    const user = await req.user
      .populate('cart.items.courseId')
      .execPopulate()

    const courses = mapCartItems(user.cart);

    res.render('cart', {
        title: 'Корзина',
        isCart: true,
        courses,
        price: countPrice(courses)
    })

  } catch(e) {
    console.log(e)
  }
})

router.delete('/remove/:id', async (req, res) => {
  await req.user.removeFromCart(req.params.id)
  const user = await req.user.populate('cart.items.courseId').execPopulate()
  const courses = mapCartItems(user.cart)
  const cart = {
    courses, price: countPrice(courses)
  }
  res.status(200).json(cart)
})

module.exports = router