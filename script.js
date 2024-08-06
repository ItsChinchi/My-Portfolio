document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 1000, // Duration of animation in milliseconds
    });
            //toggle button
            const menuBtn = document.querySelector('.menu-btn');
            const navLinks = document.querySelector('.nav-links');
        
            menuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                menuBtn.classList.toggle('clicked');
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
            if (isElementInViewport(item)) {
                item.style.opacity = 1;
                item.style.transform = "translateY(0)";
            } else {
                item.style.opacity = 0;
                item.style.transform = "translateY(20px)"; // Adjust as needed
            }
        });
    }

    window.addEventListener("scroll", checkElements);
    window.addEventListener("resize", checkElements);
    checkElements(); // Initial check

    // Navbar fade effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = 200; // Maximum scroll value where navbar is fully faded out
        const opacity = Math.max(1 - scrollTop / maxScroll, 0);
        navbar.style.opacity = opacity;
        navbar.style.transition = 'opacity 0.5s'; // Smooth transition
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Email sending functionality using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: name,
                from_email: email,
                message: message,
            }).then(() => {
                alert('Your message has been sent successfully!');
                contactForm.reset();
            }).catch((error) => {
                alert('An error occurred while sending your message. Please try again later.');
                console.error('EmailJS Error:', error);
            });
        });
    }

    // Portfolio scrolling
    function scrollLeft() {
        document.querySelector('.portfolio-container').scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    }

    function scrollRight() {
        document.querySelector('.portfolio-container').scrollBy({
            left: 300,
            behavior: 'smooth'
        });
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

    function scrollGallery(direction) {
        const gallery = document.querySelector('.gallery');
        const scrollAmount = 300; // Adjust size to fit your design
        gallery.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    // Toggle navigation menu
    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Show or hide the scroll up arrow based on scroll position
    window.addEventListener('scroll', () => {
        const scrollUp = document.getElementById('scrollUp');
        if (window.scrollY > 200) {
            scrollUp.classList.add('show');
        } else {
            scrollUp.classList.remove('show');
        }
    });

    // Scroll to the top of the page when the arrow is clicked
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Attach scrollToTop to the scroll up button
    const scrollUpButton = document.getElementById('scrollUp');
    if (scrollUpButton) {
        scrollUpButton.addEventListener('click', scrollToTop);
    }
});