const mongoose = require('mongoose');

const userQuestionSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  province: String,
  address: String,
  select: String,
  message: String,
  isAnswered: { 
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserQuestion', userQuestionSchema);
