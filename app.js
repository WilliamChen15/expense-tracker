// 主程式入口
// session 還沒裝
const express = require('express')

const exphbs = require('express-handlebars')

const handlebarHelpers = require('./handlebars-helpers')

const bodyParser = require('body-parser')

const session = require('express-session')

const methodOverride = require('method-override')

const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT

const usePassport = require('./config/passport')

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

app.use(methodOverride('_method'))

app.use(express.static('public'))

usePassport(app)

app.use(flash())

// res.locals中的資料，所有view都能存取
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.date = 
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

require('./config/mongoose')

app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})