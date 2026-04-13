// Hero page-load animation — fires on DOMContentLoaded so text appears
// immediately without waiting for images/fonts to fully download
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.hero-item');
  items.forEach((el, index) => {
    el.style.transitionDelay = (0.12 * index) + 's';
  });
  document.body.classList.add('page-loaded');
});

// Counter animations
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number[data-count-target]');
  if (!counters.length) return;

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.countTarget);
    if (isNaN(target)) return;

    const duration = 2500; // ms
    const startTime = performance.now();

    const step = (now) => {
      const rawProgress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic function for a smoother slowdown
      const easeProgress = 1 - Math.pow(1 - rawProgress, 3);
      const value = Math.floor(easeProgress * target);
      el.textContent = value.toString();

      if (rawProgress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toString(); // snap to final
      }
    };

    requestAnimationFrame(step);
  };

  let hasRun = false;
  const aboutSection = document.getElementById('about');

  if (!aboutSection) {
    // fallback: just run immediately
    counters.forEach(animateCount);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        counters.forEach(animateCount);
        observer.disconnect();
      }
    });
  }, { threshold: 0.6 }); // Requires more of the section to be visible before starting

  observer.observe(aboutSection);
});

