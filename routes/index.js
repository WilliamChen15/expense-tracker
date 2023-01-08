// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')


router.use('/users', users)
// router.use('/auth', auth) // FB登入
router.use('/', home) // 登入後才能用
// 匯出路由器
module.exports = router