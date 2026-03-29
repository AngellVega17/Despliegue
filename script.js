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
  // Si ya estamos arriba, recarga directo
  if (window.scrollY < 10) {
    location.reload();
    return;
  }
  // Si estamos abajo, primero sube y luego recarga
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const onScrollEnd = () => {
    if (window.scrollY < 10) {
      window.removeEventListener('scroll', onScrollEnd);
      setTimeout(() => location.reload(), 100);
    }
  };
  window.addEventListener('scroll', onScrollEnd);
  // Fallback por si el scroll no dispara eventos
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
backdrop.addEventListener('click', closeMenu); // clic fuera cierra el panel

mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link =>
  link.addEventListener('click', closeMenu)
);
if (menuCta) menuCta.addEventListener('click', closeMenu);


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