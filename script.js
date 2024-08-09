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

   
    // Hamburger Menu and Navigation
    const hamburgerMenu = document.querySelector("#hamburger-menu");
    const overlay = document.querySelector("#overlay");
    const navItems = Array.from(document.querySelectorAll("#nav-1, #nav-2, #nav-3, #nav-4, #nav-5, #nav-6" ));

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

    // Smooth scroll to "About Me" section
    const learnMoreButton = document.querySelector(".learn-more-button");
    if (learnMoreButton) {
        learnMoreButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor click behavior
            const targetSection = document.querySelector("#about");
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop, // Scroll to the position of the About Me section
                    behavior: 'smooth' // Smooth scrolling
                });
            }
        });
    }

    //swap between skills
    const skillsContainer = document.querySelector('.skills-container');

    let isDown = false;
    let startX;
    let scrollLeft;
    
    skillsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        skillsContainer.classList.add('active');
        startX = e.pageX - skillsContainer.offsetLeft;
        scrollLeft = skillsContainer.scrollLeft;
    });
    
    skillsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        skillsContainer.classList.remove('active');
    });
    
    skillsContainer.addEventListener('mouseup', () => {
        isDown = false;
        skillsContainer.classList.remove('active');
    });
    
    skillsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - skillsContainer.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed
        skillsContainer.scrollLeft = scrollLeft - walk;
    });

    skillsContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        skillsContainer.scrollLeft += e.deltaY;
        
    });

});