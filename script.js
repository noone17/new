const starsContainer = document.querySelector('.stars-container');

function generateStars() {
    starsContainer.replaceChildren();
    const starCount = window.innerWidth > 700 ? 150 : 85;
    for (let index = 0; index < starCount; index += 1) {
        const star = document.createElement('span');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        starsContainer.appendChild(star);
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    generateStars();
    
    // Animate poem lines on load
    document.querySelectorAll('.poem p').forEach((line, index) => {
        line.style.animationDelay = `${0.3 + index * 0.14}s`;
    });
});

musicToggle.addEventListener('click', toggleMusic);
document.addEventListener('click', (event) => {
    if (book.classList.contains('is-open') && !event.target.closest('button')) {
        createFloatingHeart(event.clientX, event.clientY);
    }
});

generateStars();
window.addEventListener('resize', generateStars);
