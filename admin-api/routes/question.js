const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// POST route (already working)
router.post('/add', async (req, res) => {
  const { category, subcategories, question, answer, reference, fatwaTitle, arabicReferences, fatwaSolvedDate } = req.body;

const newQuestion = new Question({ category, subcategories, question, answer, reference, fatwaTitle, arabicReferences, fatwaSolvedDate });

  await newQuestion.save();
  res.status(201).json({ message: 'Question added successfully', newQuestion });
});

// ✅ Add this GET route
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().populate('category', 'name');
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: err.message });
  }
});
router.put('/:id', async (req, res) => {
    try {
      const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
      await Question.findByIdAndDelete(req.params.id);
      res.json({ message: 'Question deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
    
module.exports = router;
