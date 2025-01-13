const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up file upload (using multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Upload an image
router.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Fetch all images (mocked for now)
router.get('/', (req, res) => {
  // In production, you could list files from a database or directory
  res.json([
    { id: 1, url: '/uploads/image1.jpg' },
    { id: 2, url: '/uploads/image2.jpg' },
  ]);
});

module.exports = router;
