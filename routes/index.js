// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/users')
const { authenticator } = require('./modules/auth')

router.use('/', authenticator, home) // 登入後才能用
router.use('/expense', authenticator, expense)
// router.use('/auth', auth) // FB登入
router.use('/users', users)
// 匯出路由器
module.exports = router