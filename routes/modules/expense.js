const express = require('express')
const router = express.Router()

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

// 新增
router.get('/new', (req, res) => {

  res.render('new')
})

// 編輯
router.get('/edit', (req, res) => {

  res.render('edit')
})

// 刪除
router.delete('/', (req, res) => {

  res.render('')
})

// 篩選
router.get('/category/:sort', (req, res) => {

  res.render('')
})


module.exports = router


