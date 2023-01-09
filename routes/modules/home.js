const express = require('express')
const router = express.Router()

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

const record = [
  {
    id: 1,
    name: '午餐',
    amount: '60',
    categoryId: 4
  },
  {
    id: 2,
    name: '晚餐',
    amount: '60',
    categoryId: 4
  },
  {
    id: 3,
    name: '捷運',
    amount: '120',
    categoryId: 2
  },
  {
    id: 4,
    name: '電影:驚奇隊長',
    amount: '220',
    categoryId: 3
  },
  {
    id: 5,
    name: '租金',
    amount: '25000',
    categoryId: 1
  }
]

router.get('/', (req, res) => {
  const login = true
  res.render('index', { login })
})



module.exports = router