// Function to handle navbar behavior on scroll
window.addEventListener('scroll', function () {
    // Selecting the navbar element
    var navbar = document.querySelector('.navbar');
    // Getting the current scroll position
    var scrollPosition = window.scrollY;
    // Adding or removing the 'scrolled' class based on scroll position
    if (scrollPosition >= window.innerHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Function to initialize the image slider
const initSlider = () => {
    // Selecting necessary elements
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    // Calculating maximum scroll distance
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Event listener for mouse down on scrollbar thumb
    scrollbarThumb.addEventListener("mousedown", (e) => {
        // Getting initial mouse position and thumb position
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        // Calculating maximum thumb position
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        // Handling mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Keeping thumb position within bounds and updating scroll position
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            // Updating thumb position and scroll position
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Event listener for mouse up to stop scrolling
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Adding event listeners for mouse move and mouse up
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Event listener for slide buttons
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Determining scroll direction based on button clicked
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            // Scrolling smoothly by specified amount
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Function to handle visibility of slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Function to update scrollbar thumb position based on scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Event listener for scroll event on image list
    imageList.addEventListener("scroll", () => {
        // Updating scrollbar thumb position and slide button visibility
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

// Event listeners for window resize and load to initialize slider
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
