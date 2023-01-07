// 主程式入口

const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})