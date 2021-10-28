module.exports = function (req, res, next) {
  // закрываем роуты неавторизованным юзерам
  if(!req.session.isAuthenticated) {
    return res.redirect('/auth/login')
  }

  next()
}