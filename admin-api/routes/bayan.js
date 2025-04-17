const express = require('express');
const router = express.Router();
const Bayan = require('../models/Bayan');

// Add new bayan
router.post('/add', async (req, res) => {
  const { title, tafseel, date, writerName, category, subcategories } = req.body;
  const newBayan = new Bayan({ title, tafseel, date, writerName, category, subcategories });
  await newBayan.save();
  res.status(201).json({ message: 'Bayan added successfully', newBayan });
});

// Get all bayans
router.get('/', async (req, res) => {
  try {
    const bayans = await Bayan.find().populate('category', 'name');
    res.json(bayans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update bayan
router.put('/:id', async (req, res) => {
  try {
    const updated = await Bayan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete bayan
router.delete('/:id', async (req, res) => {
  try {
    await Bayan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bayan deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
