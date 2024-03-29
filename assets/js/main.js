
const expand_changes_button = document.querySelector('.expand_changes');
const schedule = document.querySelector('.schedule');
const expand_img = document.getElementById('expand-img');
var is_expand_changes = false;

expand_changes_button.addEventListener('click', function() {
    const elementsToToggle = document.querySelectorAll('.schedule > *:not(:first-child)');

    if (is_expand_changes) {
        elementsToToggle.forEach(element => {
            element.style.display = 'none';
        });
        expand_img.style.transform = "rotate(0deg)";
    } else {
        elementsToToggle.forEach(element => {
            element.style.display = 'flex';
        });
        expand_img.style.transform = "rotate(180deg)";
    }

    is_expand_changes = !is_expand_changes;
});

document.addEventListener('DOMContentLoaded', function() {

    const sliderContainer = document.querySelector('.slider-container');
    const contentBlocks = sliderContainer.querySelectorAll('.slide-item');
    let dots = document.querySelectorAll('.dot');
    const scrollButtons = document.querySelectorAll('.parent-slider-scroll button');


    const dotsContainer = document.querySelector('.slider-dots'); // Assuming you have a container for dots
    for (let i = 0; i < contentBlocks.length; i++) {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (i === 0) {
            dot.classList.add('is-active'); // Add is-active to the first dot
        }
        // Create and append progress bar within the dot
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        dot.appendChild(progressBar);
        dotsContainer.appendChild(dot);
    }

    let activeSlideIndex = 0; // Initially show permanent content

    // Update the dots array to reflect the dynamically created dots
    dots = document.querySelectorAll('.dot');
    

    // Timer and progress bar variables
    const slideDuration = 10000; // Slide duration in milliseconds
    let timerInterval;
    let progressBar;
    let elapsedTime = 0;

    function showSlide(slideIndex) {
    contentBlocks.forEach(block => block.style.display = 'none');
    contentBlocks[slideIndex].style.display = 'block';

    // Reset progress bar for all dots EXCEPT the active one
    dots.forEach((dot, index) => {
        if (index !== slideIndex) { // Only remove is-active if not the active dot
            const progressBar = dot.querySelector('.progress-bar');
            progressBar.style.width = '0%'; // Reset width to 0%
            progressBar.style.transition = 'none'; // Remove transition temporarily
            dot.classList.remove('is-active'); // Ensure no other dot has is-active
        }
    });

    // Update progress bar styles for the active dot
    const activeDot = dots[slideIndex];
    activeDot.classList.add('is-active'); // Add is-active class to the active dot
    const activeProgressBar = activeDot.querySelector('.progress-bar');
    setTimeout(() => {
        activeProgressBar.style.transition = `width ${slideDuration}ms linear`;
        activeProgressBar.style.width = '100%';
    }, 10); // Adjust the delay as needed (in milliseconds)

        // Reset elapsed time and start timer
        elapsedTime = 0;

        // Update progress bar styles for the active dot (with a delay)
        // const activeDot = dots[slideIndex];
        // activeDot.classList.add('is-active'); // Add is-active class to the active dot
        // const activeProgressBar = activeDot.querySelector('.progress-bar');
        // setTimeout(() => {
        //     activeProgressBar.style.transition = `width ${slideDuration}ms linear`;
        //     activeProgressBar.style.width = '100%';
        // }, 10); // Adjust the delay as needed (in milliseconds)

        activeSlideIndex = slideIndex;
        updateScrollButtonVisibility();
    }

    function nextSlide() {
        const nextIndex = (activeSlideIndex + 1) % contentBlocks.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (activeSlideIndex - 1 + contentBlocks.length) % contentBlocks.length;
        showSlide(prevIndex);
    }

    function updateScrollButtonVisibility() {
        scrollButtons[0].disabled = activeSlideIndex === 0;
        scrollButtons[1].disabled = activeSlideIndex === contentBlocks.length ;
    }

    // function startTimer() {
    //     timerInterval = setInterval(nextSlide, slideDuration);
    // }

    function startTimer() {
        timerInterval = setInterval(() => {
            elapsedTime += 1000; // Increment elapsed time by 1 second
            // console.log("Slider Timer:", elapsedTime / 1000); // Display elapsed time in seconds

            if (elapsedTime >= slideDuration) {
                nextSlide(); // Transition to the next slide when timer expires
            }
        }, 1000); // Call the function every 1000 milliseconds (1 second)
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    scrollButtons[0].addEventListener('click', prevSlide); // Left button
    // scrollButtons[1].addEventListener('click', nextSlide); // Right button
    scrollButtons[1].addEventListener('click', () => {
        nextSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Initial display
    showSlide(activeSlideIndex);
    updateScrollButtonVisibility();

    // Start timer
    startTimer();

    // Stop timer on mouse hover over slider
    sliderContainer.addEventListener('mouseenter', stopTimer);
    sliderContainer.addEventListener('mouseleave', startTimer);
});
