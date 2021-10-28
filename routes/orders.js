const {Router} = require('express')
const router = Router()
const Order = require('../models/order')

router.get('/', async (req, res) => {
  try {
    //поиск по БД Order.find
    const orders = await Order.find({'user.userId': req.user._id})
      .populate('user.userId')

    //'orders' - страница
    res.render('orders', {
      isOrder: true,
      orders: orders.map((order) => ({
        ...order._doc,
        price: order.courses.reduce((total, course) => {

          return total += course.count * course.course.price
        }, 0)
      }))
    })
  } catch (e) {
    console.log(e)
  }
})
router.post('/', async (req, res) => {
  try {
    const user = await req.user
      .populate('cart.items.courseId')
      .execPopulate()
  const courses = user.cart.items.map( (cartItem) => ({
    count: cartItem.count,
    course: {...cartItem.courseId._doc}
  }))

  const order = new Order({
    user: {
      name: req.user.name,
      userId: req.user
    },
    courses: courses
  })

  await order.save()

  await req.user.clearCart()

  res.redirect('/orders')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router