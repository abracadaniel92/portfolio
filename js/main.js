// Hero particle canvas
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const COUNT = 55;
  const MAX_DIST = 130;
  const RGB = '100,255,218'; // teal

  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function mkParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.4
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, mkParticle);
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${RGB},${((1 - d / MAX_DIST) * 0.11).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${RGB},0.22)`;
      ctx.fill();
    });

    animId = requestAnimationFrame(frame);
  }

  init();
  frame();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animId);
      init();
      frame();
    }, 150);
  });
})();

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

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

// Automatically mark major sections for reveal animations
const heroShell = document.querySelector('.hero-shell');
if (heroShell) {
  heroShell.classList.add('reveal');
}
document.querySelectorAll('.section-shell').forEach(el => el.classList.add('reveal'));

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

// Show/hide side socials and email based on about section visibility
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.getElementById('about');
  const sideSocials = document.querySelector('.side-socials');
  const sideEmail = document.querySelector('.side-email');

  if (!aboutSection || !sideSocials || !sideEmail) return;

  // Use IntersectionObserver to show them when about section is visible
  let socialsActivated = false;

  const showSocials = () => {
    sideSocials.classList.add('visible');
    sideEmail.classList.add('visible');
  };

  const hideSocials = () => {
    sideSocials.classList.remove('visible');
    sideEmail.classList.remove('visible');
  };

  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!socialsActivated && entry.isIntersecting) {
        // About section reached: show side elements and keep them visible afterwards
        showSocials();
        socialsActivated = true;
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '-100px 0px 0px 0px' });

  aboutObserver.observe(aboutSection);

  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Hero is visible again → hide socials even if activated
        hideSocials();
      } else if (socialsActivated) {
        // Hero out of view and we already activated socials → show them
        showSocials();
      }
    });
  }, { threshold: 0.35 });

  heroObserver.observe(heroSection);
});

