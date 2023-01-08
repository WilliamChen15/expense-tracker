const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({
    name,
    email,
    password
  })
    .then(() => res.redirect('/users/login'))
})

router.get('/logout', (req, res) => {
  req.logout() // Passport.js 提供的函式，清除 session
  req.flash('success_msg', '你已經登出。')
  res.redirect('/users/login')
})

module.exports = router