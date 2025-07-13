document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const header = document.querySelector('header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const newsletterForm = document.getElementById('newsletter-form');
    const overlay = document.getElementById('customMessageBoxOverlay');
    const contactTrigger = document.getElementById('contactTrigger');
    const contactForm = document.getElementById('contactForm');
    const closeBtn = document.getElementById('messageBoxCloseButton');

    // Show/hide overlay
    const showOverlay = () => overlay.classList.add('show');
    const hideOverlay = () => overlay.classList.remove('show');

    // Scroll handling
    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
        scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check

    // Scroll to top button
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile menu toggle
    menuToggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
    });

    // Fade-in animation
    const faders = document.querySelectorAll('.fade-in-up');
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    faders.forEach(el => appearOnScroll.observe(el));

    // Contact button
    contactTrigger?.addEventListener('click', (e) => {
        e.preventDefault();
        showOverlay();
    });

    // Close button for message box
    closeBtn?.addEventListener('click', hideOverlay);

    // Contact form submit
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (name && email && message) {
            showToast(`Thank you, ${name}! Your message has been sent.`);
            contactForm.reset();
            hideOverlay();
        } else {
            showToast('Please fill in all fields.');
        }
    });

    // Newsletter form
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Thanks for subscribing! 🚀');
        newsletterForm.querySelector('input[type="email"]').value = '';
    });

    // Add to Cart handler
    window.addToCart = function () {
        showToast('Product added to cart! (Feature under development)');
    };
});

// Toast function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
