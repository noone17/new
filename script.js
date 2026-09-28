/* ============================================================
   FOR FATIMA — script.js
   The Complete Poem
============================================================ */

'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const rand = (min, max) => Math.random() * (max - min) + min;
const lerp = (a, b, t) => a + (b - a) * t;

/* ============================================================
   TWINKLING STARS CANVAS
============================================================ */
(function initStars() {
  const canvas = $('#poem-stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf;
  let stars = [];

  function resize() {
    W = canvas.width  = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
    buildStars();
  }

  function buildStars() {
    stars = Array.from({ length: 180 }, () => ({
      x: rand(0, W),
      y: rand(0, H * 0.6),   // concentrate in upper 60% — sky area
      r: rand(0.3, 1.4),
      speed:  rand(0.5, 2.0),
      offset: rand(0, Math.PI * 2),
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      const alpha = 0.25 + 0.55 * Math.sin(t * s.speed * 0.001 + s.offset);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,241,232,${alpha.toFixed(3)})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
})();

/* ============================================================
   STAGGERED SCROLL REVEAL
   Each .reveal-poem element carries data-delay (0–15).
   When it enters the viewport, we wait (delay × 160ms) then
   add .in-view. This creates a natural top-to-bottom cascade
   as the user scrolls through the poem.
============================================================ */
const revealEls = $$('.reveal-poem');

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay || 0) * 160;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach(el => io.observe(el));

/* ============================================================
   FALLING FEATHER — starts when page loads
============================================================ */
const poemFeather = $('#poem-feather');
if (poemFeather) {
  // Small delay so it begins after the first stanza has appeared
  setTimeout(() => {
    poemFeather.style.animationPlayState = 'running';
  }, 800);
}

/* ============================================================
   CUSTOM CURSOR — subtle gold dot + lagging ring
============================================================ */
(function initCursor() {
  // Skip on touch devices
  if ('ontouchstart' in window) return;

  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: rgba(232,216,176,0.7);
    pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    mix-blend-mode: screen;
  `;

  const ring = document.createElement('div');
  ring.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 30px; height: 30px;
    border-radius: 50%;
    border: 1px solid rgba(232,216,176,0.22);
    pointer-events: none; z-index: 9998;
    transform: translate(-50%,-50%);
    mix-blend-mode: screen;
  `;

  document.body.appendChild(ring);
  document.body.appendChild(dot);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx = lerp(rx, mx, 0.11);
    ry = lerp(ry, my, 0.11);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
})();

/* ============================================================
   PAGE ENTRY FADE — black overlay dissolves on load
============================================================ */
(function pageEntry() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0;
    background: #000;
    z-index: 99999;
    pointer-events: none;
    transition: opacity 1.6s ease;
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 1800);
    });
  });
})();
