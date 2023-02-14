const express = require('express')
const router = express.Router()

const passport = require('passport')
const userController = require('../../controllers/user')

router.get('/login', userController.getLogin)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', userController.getRegister)

router.post('/register', userController.postRegister)

router.get('/logout', userController.getLogout)

module.exports = router