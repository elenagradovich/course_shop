module.exports = function(req, res, next) {
  console.log('middle req.session.isAuthenticated: ', req.session.isAuthenticated)
  res.locals.isAuth = req.session.isAuthenticated
  next()
}