const express = require('express')
const record = require('../../models/record')
const router = express.Router()
const Record = require('../../models/record')

// 新增頁面
router.get('/new', (req, res) => {

  res.render('form')
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
  const _id = req.params.id
  Record.findOne({ _id })
    .lean()
    .then(record => {
      res.render('form', { record })
    })
})

//編輯行為
router.put('/edit/:id', (req, res) => {
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body
  return Record.findOne({ _id })
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
  const _id = req.params.id
  return Record.findOne({ _id })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 篩選
router.get('/category/:sort', (req, res) => {

  res.render('')
})


module.exports = router


