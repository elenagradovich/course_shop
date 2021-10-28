const {Router} = require('express')
const Course = require('../models/course')
const router = Router()
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
  res.render('add_course', {
    title: 'Добавить курс',
    isAdd: true
  })
})

router.post('/', auth, async (req, res) => {

  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    description: req.body.description,
    userId: req.user
  })
   try {
     await course.save() //сохранение коллекции в БД
   } catch (e) {
    console.log(e)
   }

  res.redirect('/courses')
})

module.exports = router