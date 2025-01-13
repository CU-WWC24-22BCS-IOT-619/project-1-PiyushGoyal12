const imageUploadInput = document.getElementById('imageUpload');
const imageListDiv = document.getElementById('imageList');
const annotationTextInput = document.getElementById('annotationText');
const annotationAreaDiv = document.getElementById('annotationArea');

let selectedImageId = null;

// Upload image
async function uploadImage() {
  const file = imageUploadInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('http://localhost:5000/api/images/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    displayImage(data.imageUrl);
  } catch (err) {
    console.error('Error uploading image:', err);
  }
}

// Display uploaded image
function displayImage(imageUrl) {
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.onclick = () => loadAnnotations(imageUrl);
  imageListDiv.appendChild(imageElement);
}

// Load annotations for an image
async function loadAnnotations(imageUrl) {
  const imageId = imageUrl.split('/').pop().split('.')[0]; // Example extraction from imageUrl
  selectedImageId = imageId;

  try {
    const response = await fetch(`http://localhost:5000/api/annotations/${imageId}`);
    const annotations = await response.json();
    displayAnnotations(annotations);
  } catch (err) {
    console.error('Error fetching annotations:', err);
  }
}

// Display annotations
function displayAnnotations(annotations) {
  annotationAreaDiv.innerHTML = '';
  annotations.forEach(anno => {
    const annotationElement = document.createElement('p');
    annotationElement.textContent = anno.text;
    annotationAreaDiv.appendChild(annotationElement);
  });
}

// Save annotation
async function saveAnnotation() {
  if (!selectedImageId || !annotationTextInput.value) return;

  const newAnnotation = {
    imageId: selectedImageId,
    text: annotationTextInput.value,
  };

  try {
    await fetch('http://localhost:5000/api/annotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnnotation),
    });
    loadAnnotations(selectedImageId); // Reload annotations
    annotationTextInput.value = ''; // Clear input
  } catch (err) {
    console.error('Error saving annotation:', err);
  }
}
