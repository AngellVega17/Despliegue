// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});
function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  ring.style.transform = `translate(${rx}px, ${ry}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('button, a, .feature-card').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '52px'; ring.style.height = '52px'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; });
});


// ─── LOGO — SCROLL AL INICIO + RECARGA ──────────────────────────────────────
function goHome(e) {
  e.preventDefault();
  if (window.scrollY < 10) { location.reload(); return; }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const onScrollEnd = () => {
    if (window.scrollY < 10) {
      window.removeEventListener('scroll', onScrollEnd);
      setTimeout(() => location.reload(), 100);
    }
  };
  window.addEventListener('scroll', onScrollEnd);
  setTimeout(() => location.reload(), 800);
}
const logoNav    = document.getElementById('logo-link');
const logoFooter = document.getElementById('logo-link-footer');
if (logoNav)    logoNav.addEventListener('click', goHome);
if (logoFooter) logoFooter.addEventListener('click', goHome);


// ─── MOBILE MENU PANEL ───────────────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const backdrop   = document.getElementById('mobile-menu-backdrop');
const menuClose  = document.getElementById('mobile-menu-close');
const menuCta    = document.getElementById('mobile-menu-cta');

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () =>
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu()
);
menuClose.addEventListener('click', closeMenu);
backdrop.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link =>
  link.addEventListener('click', closeMenu)
);
if (menuCta) menuCta.addEventListener('click', closeMenu);


// ─── PHONE CAROUSEL ──────────────────────────────────────────────────────────
const slides     = document.querySelectorAll('.phone-slide');
const dots       = document.querySelectorAll('.carousel-dot');
const titleLabel = document.getElementById('slide-title-label');

const slideTitles = [
  '📍 Ubicación en tiempo real',
  '🔔 Notificación de incidentes',
  '📞 Llamadas de emergencia'
];

let currentSlide = 0;
let carouselTimer = null;

function goToSlide(index) {
  // Quitar activo del slide y dot actuales
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = index;

  // Activar nuevo slide y dot
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');

  // Actualizar label
  if (titleLabel) {
    titleLabel.style.opacity = '0';
    setTimeout(() => {
      titleLabel.textContent = slideTitles[currentSlide];
      titleLabel.style.opacity = '1';
    }, 150);
  }
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function startCarousel() {
  carouselTimer = setInterval(nextSlide, 3500);
}

function resetCarousel() {
  clearInterval(carouselTimer);
  startCarousel();
}

// Click en los dots
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.dataset.slide);
    goToSlide(idx);
    resetCarousel();
  });
});

// Swipe touch en el teléfono
const phoneEl = document.querySelector('.phone');
if (phoneEl) {
  let touchStartX = 0;
  phoneEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  phoneEl.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToSlide((currentSlide + 1) % slides.length);
      else          goToSlide((currentSlide - 1 + slides.length) % slides.length);
      resetCarousel();
    }
  }, { passive: true });
}

// Iniciar autoplay
startCarousel();


// ─── TOAST ───────────────────────────────────────────────────────────────────
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
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  observer.observe(el);
});
