const book = document.querySelector('.book');
const openButton = document.querySelector('#open-button');
const musicToggle = document.querySelector('#music-toggle');
const starsContainer = document.querySelector('.stars-container');

let audioContext;
let musicPlaying = false;

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

function createFloatingHeart(x, y) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = Math.random() > 0.5 ? '♥' : '♡';
    heart.style.left = `${x + (Math.random() * 44 - 22)}px`;
    heart.style.top = `${y + (Math.random() * 24 - 12)}px`;
    document.body.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
}

function startAmbientMusic() {
    audioContext = audioContext || new AudioContext();
    const master = audioContext.createGain();
    master.gain.value = 0.035;
    master.connect(audioContext.destination);
    [261.63, 329.63, 392].forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gain.gain.value = index === 0 ? 0.34 : 0.2;
        oscillator.connect(gain).connect(master);
        oscillator.start();
    });
    musicPlaying = true;
    musicToggle.textContent = 'Ⅱ';
    musicToggle.setAttribute('aria-label', 'Pause music');
}

function toggleMusic() {
    if (!audioContext) return;
    if (musicPlaying) {
        audioContext.suspend();
        musicPlaying = false;
        musicToggle.textContent = '♫';
        musicToggle.setAttribute('aria-label', 'Play music');
    } else {
        audioContext.resume();
        musicPlaying = true;
        musicToggle.textContent = 'Ⅱ';
        musicToggle.setAttribute('aria-label', 'Pause music');
    }
}

openButton.addEventListener('click', (event) => {
    if (book.classList.contains('is-open')) return;
    book.classList.add('is-open');
    const poemPage = document.querySelector('.page-2');
    poemPage.setAttribute('aria-hidden', 'false');
    poemPage.scrollTop = 0;
    document.querySelectorAll('.poem p').forEach((line, index) => {
        line.style.animationDelay = `${0.3 + index * 0.14}s`;
    });
    startAmbientMusic();
    for (let index = 0; index < 12; index += 1) {
        window.setTimeout(() => createFloatingHeart(event.clientX, event.clientY), index * 55);
    }
});

musicToggle.addEventListener('click', toggleMusic);
document.addEventListener('click', (event) => {
    if (book.classList.contains('is-open') && !event.target.closest('button')) {
        createFloatingHeart(event.clientX, event.clientY);
    }
});

generateStars();
window.addEventListener('resize', generateStars);
