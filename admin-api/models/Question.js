const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategories: [{ type: String, required: true }],
  question: { type: String, required: true },
  answer: { type: String, required: true },
  reference: { type: String, required: true },
  fatwaTitle: { type: String },
  arabicReferences: { type: String },
  fatwaSolvedDate: { type: Date }
});


module.exports = mongoose.model('Question', questionSchema);
