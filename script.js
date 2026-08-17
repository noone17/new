// Generate random stars
function generateStars() {
    const starsContainer = document.querySelector('.stars-container');
    const starCount = window.innerWidth > 768 ? 200 : 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Initialize stars on load
window.addEventListener('load', () => {
    generateStars();
});

// Trigger animations on scroll into view
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('fade-in')) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Poem verses appear on scroll
const verseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('fade-in-verse')) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
});

document.querySelectorAll('.verse').forEach(verse => {
    verseObserver.observe(verse);
});

// Floating heart animation on poem click
document.addEventListener('click', (e) => {
    if (e.target.closest('.page-2')) {
        createFloatingHeart(e.clientX, e.clientY);
    }
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '2em';
    heart.style.zIndex = '999';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
}

// Add float-up animation
const animStyle = document.createElement('style');
animStyle.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.5);
        }
    }
`;
document.head.appendChild(animStyle);

// Parallax moon effect on scroll
window.addEventListener('scroll', () => {
    const moon = document.querySelector('.moon');
    const scrollY = window.scrollY;
    moon.style.transform = `translateY(${scrollY * 0.3}px)`;
});

// Regenerate stars on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const starsContainer = document.querySelector('.stars-container');
        starsContainer.innerHTML = '';
        generateStars();
    }, 250);
});
