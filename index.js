const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars');

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
//обработка get запроса
app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Main page',
    isHome: true
  });
});

app.get('/courses', (req, res, next) => {
  res.render('courses', {
    title: 'Courses',
    isCourses: true
  });
});

app.get('/add', (req, res, next) => {
  res.render('add', {
    title: 'Add course',
    isAdd: true
  });
});

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})