const express = require('express');
const multer = require('multer');
const path = require('path');
const Course = require('../models/Course');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/courses'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const { title, tafseel } = req.body;
    const imageUrl = `/uploads/courses/${req.file.filename}`;

    const newCourse = new Course({ imageUrl, title, tafseel });
    await newCourse.save();

    res.status(201).json({ message: 'Course added', newCourse });
  } catch (error) {
    console.error('❌ Error in POST /api/courses/add:', error.message);
    res.status(500).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      console.error('❌ Error in GET /api/courses:', error.message);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  });
  
module.exports = router;
