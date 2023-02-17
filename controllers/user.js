const User = require('../models/user')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD
  },
  tls: {
    // 不檢查伺服器  // 開發與測試中使用
    rejectUnauthorized: false
  }
})

module.exports = {
  getLogin: (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    res.render('login')
  },

  getRegister: (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    res.render('register')
  },

  postRegister: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body
      const errors = []
      if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '請確認完成必填欄位。' })
      }
      if (password.length < 8 || password.length > 12) {
        errors.push({ message: '請輸入8-12位的密碼！' })
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

      const user = await User.findOne({ email })
      if (user) {
        req.flash('warning_msg', '您輸入的 Email 已經註冊過了，請直接登入。')
        return res.redirect('/users/login')
      }

      const activeToken = crypto.randomBytes(32).toString('hex')
      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(password, salt)

      await User.create({
        activeToken,
        name,
        email,
        password: hash
      })

      // 重新導向登入頁並提示
      req.flash('success_msg', '已發送驗證信，請至信箱收信並開通帳號。')
      res.redirect('/users/login')

      const link = process.env.PORT ? `http://localhost:3000/users/active/${activeToken}` : `https://powerful-stream-78506.herokuapp.com/users/active/${activeToken}`

      // 取出新造好的user
      const newUser = await User.findOne({ email })

      transporter.sendMail({
        from: 'expense-tracker@email.com',
        to: email,
        subject: '開通帳號',
        html: `
          <p>${newUser.name} 您好。</p>
          <p>請點擊<a href=${link}> 此連結 </a>以開通帳號。</p>
          `
      })
    } catch (err) {
      res.redirect('/users/register')
      console.log(err)
    }
  },

  getActive: async (req, res) => {
    try {

      const activeToken = req.params.activeToken

      const user = await User.findOne({ activeToken })

      user.active = true
      user.activeToken = null

      await user.save()

      req.flash('success_msg', '帳號已開通，可以登入並開始使用。')
      res.redirect('/users/login')
    } catch (err) {
      res.redirect('/user/login')
      console.log(err)
    }
  },

  getLogout: (req, res) => {
    req.logout() // Passport.js 提供的函式，清除 session
    req.flash('success_msg', '你已經登出。')
    res.redirect('/users/login')
  },

  getResetPassword: (req, res) => {
    res.render('reset')
  },

  postResetPassword: async (req, res) => {
    try {
      const email = req.body.email

      // 未輸入信箱
      if (!email) {
        req.flash('error', '請輸入 Email ')
        return res.redirect('/users/reset')
      }
      // 產生隨機 token 
      const resetToken = crypto.randomBytes(32).toString('hex')

      // 將 token 於欲重設密碼的 user 中存起
      const user = await User.findOne({ email })

      // 查無此信箱使用者
      if (!user) {
        req.flash('warning_msg', '此 Email 未註冊過')
        return res.redirect('/users/reset')
      }

      // 查有使用者，加入 resetToken 屬性
      user.resetToken = resetToken

      // 加入時效 : 10 分鐘
      user.resetTokenExpiration = Date.now() + 10 * 60 * 1000

      // 存起
      await user.save()

      // 重新導向登入頁並提示
      req.flash('success_msg', '已發送驗證信，請至信箱收信並重設密碼。')
      res.redirect('/users/login')

      // 判斷應該給哪份連結
      const link = process.env.PORT ? `http://localhost:3000/users/new-password/${resetToken}` : `https://powerful-stream-78506.herokuapp.com/users/new-password/${resetToken}`

      // 寄信
      transporter.sendMail({
        from: 'expense-tracker@email.com',
        to: email,
        subject: '重設密碼',
        html: `
          <p>${user.name} 您好。</p>
          <p>請點擊<a href=${link}> 此連結 </a>以重設密碼。</p>
          `
      })
    } catch (err) {
      res.redirect('/users/reset')
      console.log(err)
    }
  },

  getNewPassword: async (req, res) => {
    // 取得Token
    const resetToken = req.params.resetToken

    try {
      // 找到對應使用者
      const user = await User.findOne({ resetToken, resetTokenExpiration: { $gt: Date.now() } })
      res.render('new-password', {
        userId: user._id,
        passwordToken: resetToken
      })
    } catch (err) {
      res.redirect('/users/reset')
      console.log(err)
    }
  },

  postNewPassword: async (req, res) => {
    const { password, confirmPassword, userId, passwordToken } = req.body
    // 用req.flash會慢一個請求(上一次的錯誤在下一次刷新頁面才顯示)，猜測是因為直接render，所以req.flash還未存入res.local裡。
    const errors = []
    if (!password || !confirmPassword) {
      errors.push({ message: '請確認完成必填欄位。' })
      return res.render('new-password', {
        errors,
        userId,
        passwordToken
      })
    }
    if (password.length < 8 || password.length > 12) {
      errors.push({ message: '請輸入8-12位的密碼！' })
      return res.render('new-password', {
        errors,
        userId,
        passwordToken
      })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
      return res.render('new-password', {
        errors,
        userId,
        passwordToken
      })
    }

    // 沒有錯誤
    try {
      const salt = await bcrypt.genSalt(10)
      const user = await User.findOne({ resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now() }, _id: userId })
      if (!user) {
        req.flash('warning_msg', '憑證可能已經失效，請嘗試重新發出請求。')
        return res.redirect('/users/reset')
      }

      const hash = await bcrypt.hash(password, salt)

      user.password = hash
      user.resetToken = null
      user.resetTokenExpiration = null
      await user.save()

      res.redirect('/users/login')

    } catch (err) {
      res.redirect('/users/reset')
      console.log(err)
    }
  }
}