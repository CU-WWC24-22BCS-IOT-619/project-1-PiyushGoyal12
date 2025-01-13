// js/app.js
document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.querySelector("#uploadForm");
  const fileInput = document.querySelector("#fileInput");
  const imageContainer = document.querySelector(".image-container");

  uploadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    fetch("/images/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const imgElement = document.createElement("img");
        imgElement.src = data.imageUrl;
        imageContainer.appendChild(imgElement);
      })
      .catch((error) => console.error("Error uploading image:", error));
  });
});
