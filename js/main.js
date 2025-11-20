// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar style on scroll + back-to-top visibility
document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const sc = window.scrollY;

    if (backToTop) {
      if (sc > 400) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Intersection observer: reveal + active nav links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const revealEls = document.querySelectorAll('.reveal');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // reveal animation
      entry.target.classList.add('revealed');
      // active link
      const id = entry.target.getAttribute('id');
      if (!id) return;
      navLinks.forEach(a => {
        const href = a.getAttribute('href') || '';
        a.classList.toggle('text-brand-300', href === `#${id}`);
      });
    }
  });
}, { threshold: 0.15 });

sections.forEach(s => io.observe(s));
revealEls.forEach(el => io.observe(el));

