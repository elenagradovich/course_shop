const {Router} = require('express')
const router = Router()
const Course = require('../models/course')

function mapCartItems(cart) {
  return cart.items.map(item => ({
    ...item.courseId._doc,
    count: item.count
  }))
}

function countPrice(courses) {
  return courses.reduce((total, course) => {
    return total += course.price*course.count
  }, 0)
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

    console.log('user:', user)
    const courses = mapCartItems(user.cart);

    console.log('courses:', courses)
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
  // const cart = await Cart.remove(req.params.id);
  // res.status(200).json(cart)
  res.json({test: true})
})

module.exports = router