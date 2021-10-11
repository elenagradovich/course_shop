const express = require('express')
const path = require('path')

const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')
const coursesRoutes = require('./routes/courses')
const mongoose = require('mongoose')

const app = express()

const exphbs = require('express-handlebars')
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)

const DEFAULT_PORT = 3000
const PORT = process.env.PORT || DEFAULT_PORT
//const LOG_ID = '61601e5b73bb67b593c4744d'

function start () {
  try {
    const URL = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000'
    mongoose.connect(URL, function (err) {
      if (err) throw err;
      console.log('DB successfully connected');
    })//открыть соединение с БДgit
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()

