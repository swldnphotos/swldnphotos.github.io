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
      // Resume automatic slide change (adjust the time as needed)
      intervalId = setInterval(function () {
        changeSlide(1);
      }, 7500);
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
    var activeImage = document.querySelector('.gallery-image.active');

    if (activeImage) {
      var imgWidth = activeImage.naturalWidth;
      var imgHeight = activeImage.naturalHeight;

      console.log(`Image dimensions - Width: ${imgWidth}, Height: ${imgHeight}`);

      var container = document.querySelector('.slideshow-container');
      if (imgWidth > imgHeight) {
        container.style.maxWidth = '50%';
        container.style.maxHeight = '40%';
        console.log('Adjusting container size - Width greater than Height');
      } else {
        container.style.maxWidth = '50%';
        container.style.maxHeight = '100vh';
        console.log('Adjusting container size - Height greater than Width');
      }
    }
  }

  function changeSlide(direction) {
    console.log(`Changing slide – ${currentIndex + direction}`);
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    showSlide(currentIndex);
    adjustContainerSize(); // Add this line to call adjustContainerSize after changing the slide
  }

  console.log("Initial slide set");
  // Set an initial slide
  showSlide(currentIndex);

  // Handle arrow clicks
  document.querySelector('.prev').addEventListener('click', function (e) {
    console.log("Arrow click - Previous");
    e.preventDefault(); // Prevent the default behavior of the anchor
    changeSlide(-1);
  });

  document.querySelector('.next').addEventListener('click', function (e) {
    console.log("Arrow click - Next");
    e.preventDefault(); // Prevent the default behavior of the anchor
    changeSlide(1);
  });

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
      //e.preventDefault(); 
      changeSlide(1);
    }
  }, 7500);

  window.changeSlide = changeSlide;

  console.log("Script fully loaded");
});
