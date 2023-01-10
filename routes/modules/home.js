const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Record = require('../../models/record')
const record = require('../../models/record')

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}


router.get('/', (req, res) => {
  const userId = req.user._id
  return Record.find({ userId })
    .lean()
    .sort({ createdAt: 'desc' })
    .then(records => {
      if (!records.length) {
        const isEmptyRecord = true
        return res.render('index', { records, isEmptyRecord })
      }
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
      });
      res.render('index', { records, totalAmount })
    })
})



module.exports = router