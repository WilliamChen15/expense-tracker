// 主程式入口
const express = require('express')

const exphbs = require('express-handlebars')

const handlebarHelpers = require('./handlebars-helpers')

const bodyParser = require('body-parser')

const session = require('express-session')

const methodOverride = require('method-override')

const flash = require('connect-flash')

const csrf = require('csurf') // 有漏洞因此被棄用，但不知道有什麼替代套件，先將就一下

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT || 3000

const usePassport = require('./config/passport')
const cookieParser = require('cookie-parser')
const csrfProtection = csrf({ cookie: true })

const app = express()
const routes = require('./routes')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// body-parser 解析 req
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(csrfProtection)

app.use(methodOverride('_method'))

app.use(express.static('public'))

usePassport(app)

app.use(flash())

// res.locals中的資料，所有view都能存取
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error');
  res.locals.csrfToken = req.csrfToken()
  next()
})

require('./config/mongoose')

app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})