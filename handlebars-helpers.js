const Handlebars = require('handlebars')

Handlebars.registerHelper('getIcon', function (categoryId) {
  return categoryId === 1 ? `<i class="fas fa-home text-danger"></i>`
    : categoryId === 2 ? `<i class="fas fa-shuttle-van text-primary"></i>`
      : categoryId === 3 ? `<i class="fas fa-grin-beam text-purple"></i>`
        : categoryId === 4 ? `<i class="fas fa-utensils text-orange"></i>`
          : `<i class="fas fa-pen text-success"></i>`
})

Handlebars.registerHelper('isSelected', function (currentSelection, selection) {
  return (currentSelection === selection) ? "selected" : "";
})

Handlebars.registerHelper('isChecked', function (currentCheck, check) {
  return (currentCheck === check) ? "checked" : "";
})

Handlebars.registerHelper('isIncome', function (type) {
  return (type === "income") ? "收入" : "支出";
})

Handlebars.registerHelper('getDisplayDate', function (date) {
  // if 'August 19, 1975 23:15:30'
  const year = date.getFullYear() // 1975
  const month = date.getMonth() + 1  // 8
  const day = date.getDate() // 19
  return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}` // 1975/08/19
})

Handlebars.registerHelper('getInputDate', function (date) {
  if (!date) { return '' }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`  // 轉成字串才能用padStart
})
