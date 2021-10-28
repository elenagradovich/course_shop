const {Router} = require('express')
const router = Router()
const User = require('../models/user')

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true
  })
})
//req.session.isAuthenticated = true - если залогинен в системе
router.post('/login', async (req, res)=> {
  const user = await User.findById('61642c3a057c7fd4f3f8fa3c')
  req.session.user = user
  req.session.isAuthenticated = true
  req.session.save(err => {
    if(err) {
      throw err
    }
    res.redirect('/')
  })

})

router.get('/logout', async (req, res) => {

  //req.session.isAuthenticated = false === req.session.destroy
  req.session.destroy(() => {
    res.redirect('/auth/login')
  })
})

router.post('/register', async (req, res) => {
  try {
    const { email, password, repeat, name } = req.body
    const candidate = await User.findOne({email})
    if(candidate) {
      res.redirect('/auth/login#registration')
    } else {
      const user = new User({
        email,
        name,
        password,
        cart: {items: []}
      })
      await user.save()
      res.redirect('/auth/login#login')
    }
    res.redirect('/')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;