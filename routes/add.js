const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true
  })
})

router.post('/', async (req, res) => {

  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    description: req.body.description
  })
   try {
     await course.save() //сохранение коллекции в БД
   } catch (e) {
    console.log(e)
   }

  res.redirect('/courses')
})

module.exports = router