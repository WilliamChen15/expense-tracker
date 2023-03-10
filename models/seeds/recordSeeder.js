const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const bcrypt = require('bcryptjs') // 種子資料的密碼也要加鹽雜湊

const users = require('../../user.json')
const records = require('../../record.json')

db.on("error", () => {
  console.log("mongodb error!")
})

db.once('open', () => {
  Promise.all(
    users.map((user, index) => {
      const { name, email, password } = user
      return User.create({
        active:true,
        activeToken:null,
        name,
        email,
        password: bcrypt.hashSync(password, 10)
      })
        .then(user => {
          const record = index ? records.slice(0, 7) : records.slice(7, 14) // 前7 : 後7
          record.map(expense => {
            expense.userId = user._id
            return expense
          })
          return Record.create(record)
        })
    })
  )
    .then(() => {
      console.log("record done.")
      db.close()
    })
    .catch(err => console.log(err))
})