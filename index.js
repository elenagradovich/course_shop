const express = require('express')
const path = require('path')
const session = require('express-session')//middleware
const MongoStore = require('connect-mongodb-session')(session)//connect-mongodb-session синхронизирует session с БД

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

const MONGODB_URI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000'

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

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI
})
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
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

async function start () {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })//открыть соединение с БД

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

