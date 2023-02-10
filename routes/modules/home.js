const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  return Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
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

router.post('/', (req, res) => {
  const category = req.body.category
  const userId = req.user._id
  if (category === '0') {
    return res.redirect('/')
  }
  // console.log('當前類別:', category) // 測試
  return Record.find({ userId, categoryId: category })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      if (!records.length) {
        const isEmptyRecord = true
        return res.render('index', { records, isEmptyRecord, category })
      }
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
      });
      res.render('index', { records, totalAmount, category })
    })
})

module.exports = router
