const db = require('../../config/mongoose')
const raw = require('../raw')

const raws = [
  {
    data1: "",
    data2: ""
  },
  {
    data1: "",
    data2: ""
  },
  {
    data1: "",
    data2: ""
  }
]

db.on("error", () => {
  console.log("mongodb error!")
})

db.once('open', () => {
  raw.create(raws)
    .then(() => {
      console.log("done.")
      db.close()
    })
    .catch(err => console.log(err))
})