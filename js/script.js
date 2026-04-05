// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle icon between list and x
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('ph-list');
        icon.classList.add('ph-x');
    } else {
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    }
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Generate Stars Background dynamically
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) return;

    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');

        // Random sizing, position, and opacity
        const size = Math.random() * 2 + 1 + 'px';
        const posX = Math.floor(Math.random() * 100) + 'vw';
        const posY = Math.floor(Math.random() * 100) + 'vh';
        const opacity = Math.random();

        star.style.position = 'absolute';
        star.style.width = size;
        star.style.height = size;
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.left = posX;
        star.style.top = posY;
        star.style.opacity = opacity;

        // Add twinkling animation to some stars
        if (Math.random() > 0.7) {
            const duration = Math.random() * 3 + 2; // 2s to 5s
            star.style.animation = `twinkle ${duration}s infinite ease-in-out`;
        }

        starsContainer.appendChild(star);
    }
}

// Add stylesheet for star twinkle animation dynamically
const styleNode = document.createElement('style');
styleNode.innerHTML = `
@keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px #fff; }
}
`;
document.head.appendChild(styleNode);

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    // Trigger initial reveal for elements in view on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);
});
