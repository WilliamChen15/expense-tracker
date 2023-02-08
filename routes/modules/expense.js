const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 新增頁面
router.get('/new', (req, res) => {
  // 另外寫然後引入會不會比較好?
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const currentTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

  res.render('form', { currentTime })
})

//新增行為
router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  Record.create({
    name,
    amount,
    userId,
    categoryId,
    date
  })
    .then(() => res.redirect('/'))
})

//編輯頁面
router.get('/edit/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      res.render('form', { record })
    })
})

//編輯行為
router.put('/edit/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router


