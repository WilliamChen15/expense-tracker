// 主程式入口
// session 還沒裝
const express = require('express')

const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')

const session = require('express-session')

const methodOverride = require('method-override')

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

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(express.static('public'))

usePassport(app)

require('./config/mongoose')

app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})