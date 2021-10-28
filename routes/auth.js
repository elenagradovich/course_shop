const {Router} = require('express')
const router = Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true
  })
})
//req.session.isAuthenticated = true - если залогинен в системе
router.post('/login', async (req, res)=> {
  req.session.isAuthenticated = true
  console.log('login req.session.isAuthenticated:', req.session.isAuthenticated)
  res.redirect('/')
})

router.get('/logout', async (req, res) => {
  //req.session.isAuthenticated = false
  req.session.destroy(() => {
    res.redirect('/auth/login')
  })
})

module.exports = router;