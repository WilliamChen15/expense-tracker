const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


router.get('/', (req, res) => {
  const userId = req.user._id
  const indexCSS = true
  return Record.find({ userId })
    .lean()
    .sort({ createdAt: 'desc' })
    .then(records => {
      if (!records.length) {
        const isEmptyRecord = true
        return res.render('index', { records, isEmptyRecord })
      }
      let totalAmount = 1
      records.forEach(record => {
        totalAmount += record.amount
      });

      res.render('index', { records, totalAmount, indexCSS })
    })
})



module.exports = router