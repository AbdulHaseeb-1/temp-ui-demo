const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create category
router.post('/add', async (req, res) => {
  const { name, subcategories } = req.body;
  try {
    const category = new Category({ name, subcategories });
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a category
router.put('/:id', async (req, res) => {
  const { name, subcategories } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, subcategories },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a category
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
