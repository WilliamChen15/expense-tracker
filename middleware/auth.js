module.exports = {
  authenticator: (req, res, next) => { // 只要判斷不成立，就導向登入頁
    if (req.isAuthenticated()) { // req.isAuthenticated() 是 Passport.js 提供的函式，會根據 request 的登入狀態回傳 true 或 false。
      return next()
    }
    res.redirect('/users/login')
  }
}