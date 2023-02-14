const express = require('express')
const router = express.Router()

const expenseController = require('../../controllers/expense')

// 新增頁面
router.get('/new', expenseController.getNewExpense)

//新增行為
router.post('/new', expenseController.postNewExpense)

//編輯頁面
router.get('/edit/:id', expenseController.getEditExpense)

//編輯行為
router.put('/edit/:id', expenseController.putEditExpense)

// 刪除
router.delete('/:id', expenseController.deleteExpense)

module.exports = router


