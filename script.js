document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000, // Duration of animation in milliseconds
    });

    // Contact items scroll behavior
    const contactItems = document.querySelectorAll(".contact-item");

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkElements() {
        contactItems.forEach((item) => {
            item.style.opacity = isElementInViewport(item) ? 1 : 0;
            item.style.transform = isElementInViewport(item) ? "translateY(0)" : "translateY(20px)";
        });
    }

    window.addEventListener("scroll", function() {
        checkElements();

        // Show/Hide scroll-up button
        const scrollUpButton = document.getElementById('scrollUp');
        if (scrollUpButton) {
            if (window.scrollY > 300) { // Adjust the scroll position to when the button should appear
                scrollUpButton.classList.add('show');
            } else {
                scrollUpButton.classList.remove('show');
            }
        }
    });

    window.addEventListener("resize", checkElements);
    checkElements(); // Initial check

    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Attach scrollToTop to the scroll-up button
    const scrollUpButton = document.getElementById('scrollUp');
    if (scrollUpButton) {
        scrollUpButton.addEventListener('click', scrollToTop);
    }

    // Portfolio scrolling
    function scrollGallery(direction) {
        const gallery = document.querySelector('.gallery');
        if (gallery) {
            gallery.scrollBy({
                left: direction * 300, // Adjust size to fit your design
                behavior: 'smooth'
            });
        }
    }

    // Arrow function for hero section
    function scrollToNextSection() {
        window.scrollBy({
            top: window.innerHeight, // Scroll by the height of one viewport
            behavior: 'smooth' // Smooth scrolling
        });
    }

    // Attach scrollToNextSection to the scroll arrow button
    const scrollArrowButton = document.querySelector('.scroll-arrow');
    if (scrollArrowButton) {
        scrollArrowButton.addEventListener('click', scrollToNextSection);
    }

    // Hamburger Menu and Navigation
    const hamburgerMenu = document.querySelector("#hamburger-menu");
    const overlay = document.querySelector("#overlay");
    const navItems = Array.from(document.querySelectorAll("#nav-1, #nav-2, #nav-3, #nav-4, #nav-5"));

    function navAnimation(val1, val2) {
        navItems.forEach((nav, i) => {
            nav.classList.replace(`slide-${val1}-${i + 1}`, `slide-${val2}-${i + 1}`);
        });
    }

    function toggleNav() {
        // Toggle: Hamburger Open/Close
        hamburgerMenu.classList.toggle("active");

        // Toggle: Menu Active
        overlay.classList.toggle("overlay-active");

        if (overlay.classList.contains("overlay-active")) {
            // Animate In - Overlay
            overlay.classList.replace("overlay-slide-left", "overlay-slide-right");

            // Animate In - Nav Items
            navAnimation("out", "in");
        } else {
            // Animate Out - Overlay
            overlay.classList.replace("overlay-slide-right", "overlay-slide-left");

            // Animate Out - Nav Items
            navAnimation("in", "out");
        }
    }

    // Event Listeners
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", toggleNav);
    }
    navItems.forEach((nav) => {
        nav.addEventListener("click", toggleNav);
    });
});
