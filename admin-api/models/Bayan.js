const mongoose = require('mongoose');

const bayanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tafseel: { type: String, required: true },
  date: { type: Date, required: true },
  writerName: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategories: [{ type: String, required: true }]
});

module.exports = mongoose.model('Bayan', bayanSchema);
