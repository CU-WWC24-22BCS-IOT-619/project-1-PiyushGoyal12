const express = require('express');
const router = express.Router();

// Mocked annotation data (you can replace with real DB interaction)
let annotations = [
  { id: 1, imageId: 1, text: 'Annotation for image 1' },
  { id: 2, imageId: 2, text: 'Annotation for image 2' },
];

// Get annotations for a specific image
router.get('/:imageId', (req, res) => {
  const { imageId } = req.params;
  const imageAnnotations = annotations.filter(anno => anno.imageId == imageId);
  res.json(imageAnnotations);
});

// Create a new annotation
router.post('/', (req, res) => {
  const { imageId, text } = req.body;
  const newAnnotation = { id: annotations.length + 1, imageId, text };
  annotations.push(newAnnotation);
  res.status(201).json(newAnnotation);
});

module.exports = router;
