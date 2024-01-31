document.addEventListener("DOMContentLoaded", function () {
  console.log("Script loaded");

  var currentIndex = 0;
  var slides = document.querySelectorAll('.gallery-image');
  var isPaused = true;
  var intervalId = null; // Declare intervalId globally

  function togglePause() {
    isPaused = !isPaused;

    if (isPaused) {
      clearInterval(intervalId); // Stop the automatic slide change
      document.querySelector('.pause').textContent = '▶'; // Change to play button
    } else {
      // Reset and resume automatic slide change (adjust the time as needed)
      clearInterval(intervalId); // Reset the interval
      startAutoAdvance();
      document.querySelector('.pause').textContent = '❚❚'; // Change to pause button
      adjustContainerSize(); // Add this line to adjust container size when resuming
    }

    console.log("Toggle Pause - Slideshow is " + (isPaused ? "paused" : "resumed"));
  }

  function showSlide(index) {
    console.log(`Showing slide – ${index}`);
    slides.forEach(function (slide) {
      slide.classList.remove('active');
    });

    slides[index].classList.add('active');
  }

  function adjustContainerSize() {
    var screenWidth = window.innerWidth;
    var container = document.querySelector('.slideshow-container');
    var activeImage = document.querySelector('.gallery-image.active');

    if (screenWidth <= 600) {
      // If the screen width is less than or equal to 600 pixels (phone screen)
      container.style.maxWidth = '90%';
    } else {
      // If the screen width is greater than 600 pixels (larger screen)

      if (activeImage) {
        var imgWidth = activeImage.naturalWidth;
        var imgHeight = activeImage.naturalHeight;

        console.log(`Image dimensions - Width: ${imgWidth}, Height: ${imgHeight}`);

        if (imgWidth > imgHeight) {
          // Landscape image
          container.style.maxWidth = '50%';
          container.style.maxHeight = '100vh';
          console.log('Adjusting container size - Landscape image');
        } else {
          // Portrait image
          container.style.maxWidth = '40%';
          container.style.maxHeight = '50%';
          console.log('Adjusting container size - Portrait image');
        }
      }
    }
  }

  function removeInlineStyles() {
    // Remove inline styles from the slideshow container
    var slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.style.removeProperty('max-width');
    slideshowContainer.style.removeProperty('max-height');
  }

  function changeSlide(direction) {
    if (direction !== 0) { // Ignore if direction is 0
      console.log(`Changing slide – ${currentIndex + direction}`);
      clearInterval(intervalId); // Clear the interval before starting a new one
      currentIndex = (currentIndex + direction + slides.length) % slides.length;
      showSlide(currentIndex);
      adjustContainerSize(); // Call adjustContainerSize after changing the slide
      startAutoAdvance(); // Restart the automatic slide change
    }
  }

  function startAutoAdvance() {
    if (!isPaused) {
      intervalId = setInterval(function () {
        console.log("Auto-advancing to the next slide");
        changeSlide(1);
      }, 7500);
    }
  }

  // Handle arrow clicks
  document.querySelector('.prev').addEventListener('mousedown', function (e) {
    console.log("Arrow click - Previous");
    e.preventDefault(); // Prevent the default behavior of the mouse click
  });

  document.querySelector('.next').addEventListener('mousedown', function (e) {
    console.log("Arrow click - Next");
    e.preventDefault(); // Prevent the default behavior of the mouse click
  });

  console.log("Initial slide set");
  // Set an initial slide
  showSlide(currentIndex);

  // Add event listener for the pause button if it exists
  var pauseButton = document.querySelector('.pause');
  if (pauseButton) {
    pauseButton.addEventListener('click', function (e) {
      console.log("Pause button clicked");
      togglePause();
    });
  }

  // Automatically advance to the next slide every 5 seconds (adjust as needed)
  intervalId = setInterval(function () {
    console.log("Auto-advancing to the next slide");
    if (!isPaused) {
      changeSlide(1);
    }
  }, 7500);

  window.changeSlide = changeSlide;

  console.log("Script fully loaded");
});
