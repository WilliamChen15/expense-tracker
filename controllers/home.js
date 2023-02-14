const Record = require('../models/record')

module.exports = {
  getHome: (req, res) => {
    const userId = req.user._id
    return Record.find({ userId })
      .lean()
      .sort({ date: 'desc' })
      .then(records => {
        if (!records.length) {
          const isEmptyRecord = true
          return res.render('index', { records, isEmptyRecord })
        }
        let totalAmount = 0, totalExpense = 0, totalIncome = 0
        records.forEach(record => {
          if (record.type === "expense") {
            totalExpense += record.amount
          } else {
            totalIncome += record.amount
          }
          totalAmount = totalIncome - totalExpense
        });
        res.render('index', { records, totalAmount, totalExpense, totalIncome })
      })
  },

  // 用於切換篩選模式
  postHome: (req, res) => {
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
        let totalAmount = 0, totalExpense = 0, totalIncome = 0
        records.forEach(record => {
          if (record.type === "expense") {
            totalExpense += record.amount
          } else {
            totalIncome += record.amount
          }
          totalAmount = totalIncome - totalExpense
        });
        res.render('index', { records, totalAmount, totalExpense, totalIncome, category })
      })
  }
}