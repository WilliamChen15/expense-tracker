const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')

const SEED_USER = 
  {
    name: '老爸',
    email: 'dad@example.com',
    password: '12345678',
  }

const record = [
  {
    id: 1,
    name: '午餐',
    amount: '60',
    categoryId: 4
  },
  {
    id: 2,
    name: '晚餐',
    amount: '60',
    categoryId: 4
  },
  {
    id: 3,
    name: '捷運',
    amount: '120',
    categoryId: 2
  },
  {
    id: 4,
    name: '電影:驚奇隊長',
    amount: '220',
    categoryId: 3
  },
  {
    id: 5,
    name: '租金',
    amount: '25000',
    categoryId: 1
  }
]

db.on("error", () => {
  console.log("mongodb error!")
})

db.once('open', () => {
  User.create(SEED_USER)
  .then(user)
  Record.create(record)
    .then(() => {
      console.log("done.")
      db.close()
    })
    .catch(err => console.log(err))
})