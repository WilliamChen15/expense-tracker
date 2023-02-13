const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  type: {
    type: String,
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
})
module.exports = mongoose.model('Record', recordSchema)