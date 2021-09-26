const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');

const app = express();

//express-handlebars движок для рендеренга html страниц
const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

app.engine('hbs', hbs.engine); //регистрируем в express движок расширения
app.set('view engine', 'hbs');
app.set('views', 'views'); // установка пути к представлениям

app.use(express.static('public')); //добавляет новые мидлвере
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes); //'/' префиксы
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})