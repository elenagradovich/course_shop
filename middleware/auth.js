module.exports = function (req, res, next) {
  // закрываем роуты неавторизованным юзерам
  console.log('req.session.isAuthenticated:', req.session.isAuthenticated)
  if(!req.session.isAuthenticated) {
    return res.redirect('/auth/login')
  }

  next()
}