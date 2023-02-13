const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '請確認完成必填欄位。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10)
      })
        .then(() => res.redirect('/users/login'))
    })
})

router.get('/logout', (req, res) => {
  req.logout() // Passport.js 提供的函式，清除 session
  req.flash('success_msg', '你已經登出。')
  res.redirect('/users/login')
})

module.exports = router