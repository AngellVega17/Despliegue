// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});

function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  ring.style.transform = `translate(${rx}px, ${ry}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

// Expand ring on interactive elements
document.querySelectorAll('button, a, .feature-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '52px';
    ring.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '36px';
    ring.style.height = '36px';
  });
});


// ─── HAMBURGER MENU ──────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ─── TOAST NOTIFICATION ──────────────────────────────────────────────────────
setTimeout(() => {
  const toast = document.getElementById('toast');
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 4200);
}, 3200);


// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = i * 80;
      entry.target.style.transition = `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease`;
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  observer.observe(el);
});
