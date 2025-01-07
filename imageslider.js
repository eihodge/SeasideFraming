var slideInterval;
var currentIndex = 0;
var totalSlides = document.querySelectorAll('.slide').length;

function showSlide(index) {
    var slides = document.querySelectorAll('.slide');
    var captionElement = document.getElementById('caption');

    // Remove 'active' class from all slides
    slides.forEach(function(slide) {
        slide.classList.remove('active');
    });

    // Add 'active' class to the current slide
    slides[index].classList.add('active');

    // Update the caption
    captionElement.innerText = captions[index];
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
    resetInterval(6000); // Reset the interval here
    updateSliderContainerHeight(); // Ensure height is updated on slide change
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
    resetInterval(6000); // Reset the interval here
    updateSliderContainerHeight(); // Ensure height is updated on slide change
}

function resetInterval(time) {
    clearInterval(slideInterval);
    slideInterval = setInterval(function () {
        nextSlide();
        updateSliderContainerHeight();
    }, time); // Set the interval to 6000 milliseconds (6 seconds)
}

function updateSliderContainerHeight() {
    var activeSlideImg = document.querySelector('.slide.active img');
    if (activeSlideImg) {
        var sliderContainer = document.querySelector('.slider-container');
        sliderContainer.style.height = activeSlideImg.clientHeight + 'px';
    }
}

// Call the function initially and whenever the slide changes
document.addEventListener('DOMContentLoaded', function() {
    // Force a reflow by adding and removing a class
    document.body.classList.add('force-reflow');
    setTimeout(function() {
        document.body.classList.remove('force-reflow');
    }, 100); // Adjust the delay as needed

    updateSliderContainerHeight();
    resetInterval(6000); // Set the initial interval to 6000 milliseconds (6 seconds)
});

window.addEventListener('resize', updateSliderContainerHeight); // Update height on window resize

document.getElementById('next').addEventListener('click', function() {
    nextSlide();
    resetInterval(6000); // Reset the interval to 6000 milliseconds (6 seconds)
});

document.getElementById('prev').addEventListener('click', function() {
    prevSlide();
    resetInterval(6000); // Reset the interval to 6000 milliseconds (6 seconds)
});

// Initialize the first slide
showSlide(currentIndex);
updateSliderContainerHeight();


