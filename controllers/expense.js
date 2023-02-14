const Record = require('../models/record')
const { currentTime } = require('../date')

module.exports = {
  getNewExpense: (req, res) => {
    res.render('form', { currentTime })
  },

  postNewExpense: (req, res) => {
    const userId = req.user._id
    const { type, name, date, categoryId, amount } = req.body
    Record.create({
      type,
      name,
      amount,
      userId,
      categoryId,
      date
    })
      .then(() => res.redirect('/'))
  },

  getEditExpense: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Record.findOne({ _id, userId })
      .lean()
      .then(record => {
        res.render('form', { record })
      })
  },

  putEditExpense: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const { type, name, date, categoryId, amount } = req.body
    return Record.findOne({ _id, userId })
      .then(record => {
        record.type = type
        record.name = name
        record.date = date
        record.categoryId = categoryId
        record.amount = amount
        return record.save()
      })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  },

  deleteExpense: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
      .then(record => record.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
}