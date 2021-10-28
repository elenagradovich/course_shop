const express = require('express')
const path = require('path')
const session = require('express-session')//middleware

const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')
const coursesRoutes = require('./routes/courses')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')

const app = express()
const mongoose = require('mongoose')
const handlebars = require('handlebars')
const varMiddleware = require('./middleware/varaibles')



const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// app.use(async (req, res,  next) => {
//  try {
//    const user = await User.findById('61642c3a057c7fd4f3f8fa3c')
//    req.user = user
//    next()
//  } catch (e) {
//    console.log(e)
//  }
// })
//middleware - если не выполнится он, дальше выполнение прервется
//secret: 'some secret value' - параметр на основе которого будет шифроваться

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false
}))
app.use(varMiddleware)

// Регистрация роутов
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const DEFAULT_PORT = 3000
const PORT = process.env.PORT || DEFAULT_PORT
//const LOG_ID = '61601e5b73bb67b593c4744d'

async function start () {
  try {
    const URL = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000'
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })//открыть соединение с БД

    // const candidate = await User.findOne()
    // if (!candidate) {
    //   const user = new User({
    //     email: 'elena@gmail.com',
    //     name: 'elena',
    //     cart: {items: []}
    //   })
    //   await user.save()
    // }


    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

