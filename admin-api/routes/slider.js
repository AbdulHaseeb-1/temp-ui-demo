const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const sliderFilePath = path.join(__dirname, '../slider-images.json');
const sliderDir = path.join(__dirname, '../public/slider');

// Ensure slider directory exists
if (!fs.existsSync(sliderDir)) {
  fs.mkdirSync(sliderDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, sliderDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ✅ Upload new image
router.post('/upload', upload.single('image1'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  let images = fs.existsSync(sliderFilePath)
    ? JSON.parse(fs.readFileSync(sliderFilePath, 'utf-8'))
    : [];

  if (images.length >= 4) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Maximum 4 images allowed' });
  }

  images.push(req.file.filename);
  fs.writeFileSync(sliderFilePath, JSON.stringify(images));
  res.json({ message: 'Image uploaded', filename: req.file.filename });
});

// ✅ Get images
router.get('/images', (req, res) => {
  const images = fs.existsSync(sliderFilePath)
    ? JSON.parse(fs.readFileSync(sliderFilePath, 'utf-8'))
    : [];
  res.json(images);
});

// ✅ Delete image
router.delete('/delete/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(sliderDir, filename);

  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    let images = fs.existsSync(sliderFilePath)
      ? JSON.parse(fs.readFileSync(sliderFilePath, 'utf-8'))
      : [];

    images = images.filter(img => img !== filename);
    fs.writeFileSync(sliderFilePath, JSON.stringify(images));

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// ✅ Replace image (in-place)
router.post('/replace/:oldFilename', upload.single('image1'), (req, res) => {
  const oldFilename = req.params.oldFilename;
  const newFilename = req.file?.filename;
  const filePath = path.join(sliderDir, oldFilename);

  if (!newFilename) return res.status(400).json({ error: 'No new file uploaded' });

  let images = fs.existsSync(sliderFilePath)
    ? JSON.parse(fs.readFileSync(sliderFilePath, 'utf-8'))
    : [];

  const index = images.indexOf(oldFilename);
  if (index === -1) return res.status(404).json({ error: 'Old image not found' });

  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  images[index] = newFilename;
  fs.writeFileSync(sliderFilePath, JSON.stringify(images));

  res.json({ message: 'Image replaced successfully', newFilename });
});

module.exports = router;
