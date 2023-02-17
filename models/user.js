const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // 判斷開通
  active: {
    type: Boolean,
    default: false,
    required: true
  },
  activeToken:{
    type: String
  },
  // 重設密碼
  resetToken: {
    type: String
  },
  resetTokenExpiration: {
    type: Date
  }
})
module.exports = mongoose.model('User', userSchema)