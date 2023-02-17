const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(null, false, req.flash('warning_msg', '帳號或密碼錯誤。'))
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, req.flash('warning_msg', '帳號或密碼錯誤。'))
      }
      if (!user.active) {
        return done(null, false, req.flash('warning_msg', '帳號未開通，請至信箱確認。'))
      }
      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  }))
  // FB
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, async (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    try {
      const user = await User.findOne({ email })
      // 這個信箱已有註冊，確認開通後，回傳現有資料
      if (user) {
        user.active = true
        await user.save()
        return done(null, user)
      }
      // 未註冊
      const randomPassword = Math.random().toString(36).slice(-8)
      await User.create({
        active: true,
        name,
        email,
        password: bcrypt.hashSync(randomPassword, 10)
      })
      const newUser = await User.findOne({ email })
      return done(null, newUser)
    } catch (err) { return done(err, false) }
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    try {
      return done(null, user.toJSON())
    } catch (err) {
      return done(err, null)
    }
  })
}