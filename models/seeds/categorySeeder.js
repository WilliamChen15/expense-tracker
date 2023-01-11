const db = require('../../config/mongoose')
const Category = require('../category') 
const category = require('../../category.json')

db.on("error", () => {
  console.log("mongodb error!")
})

db.once('open', () => {
  Category.create(category)
    .then(() => {
      console.log("category done.")
      db.close()
    })
    .catch(err => console.log(err))
})