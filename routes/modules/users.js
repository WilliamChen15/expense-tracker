const express = require('express')
const router = express.Router()

const passport = require('passport')
const userController = require('../../controllers/user')

router.get('/login', userController.getLogin)

router.get('/register', userController.getRegister)

router.post('/register', userController.postRegister)

router.get('/active/:activeToken', userController.getActive)

router.get('/logout', userController.getLogout)

router.get('/reset', userController.getResetPassword)

router.post('/reset', userController.postResetPassword)

router.get('/new-password/:resetToken', userController.getNewPassword)

router.post('/new-password', userController.postNewPassword)

router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/users/login',
    badRequestMessage: '信箱及密碼皆不得為空', // missing credentials
    failureFlash: true,
  }
))

module.exports = router
