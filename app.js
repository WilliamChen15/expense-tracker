// 主程式入口

const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT
const exphbs = require('express-handlebars')
const usePassport = require('./config/passport')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
usePassport(app)
require('./config/mongoose')
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})