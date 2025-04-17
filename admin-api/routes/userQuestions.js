const express = require('express');
const router = express.Router();
const UserQuestion = require('../models/UserQuestion');

// POST: Submit a new user question
router.post('/add', async (req, res) => {
  try {
    const newQ = new UserQuestion(req.body);
    await newQ.save();
    res.status(201).json({ message: 'Question submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: List all user questions
router.get('/', async (req, res) => {
  try {
    const questions = await UserQuestion.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PUT: Mark as answered
router.put('/mark-answered/:id', async (req, res) => {
  try {
    const updated = await UserQuestion.findByIdAndUpdate(
      req.params.id,
      { isAnswered: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE: Delete a user question
router.delete('/:id', async (req, res) => {
  try {
    await UserQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
