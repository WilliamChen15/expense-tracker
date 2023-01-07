const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  categoryId:{
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('record', recordSchema)