 document.addEventListener("DOMContentLoaded", function () {
  // Get the gallery image element
  var galleryImage = document.querySelector('.gallery-image');

  // Set the animation duration to 20s for a quarter of the speed
  galleryImage.style.animationDuration = '10s';

  // Clone the gallery image and append it to the gallery container
  var cloneImage = galleryImage.cloneNode(true);
  document.querySelector('.gallery-container').appendChild(cloneImage);

  // Function to reset the animation on transition end
  function resetAnimation() {
    galleryImage.style.animation = 'none';
    galleryImage.offsetHeight; /* Trigger reflow */
    galleryImage.style.animation = null;
  }

  // Add an event listener for the end of the animation
  galleryImage.addEventListener('animationiteration', resetAnimation);
});
