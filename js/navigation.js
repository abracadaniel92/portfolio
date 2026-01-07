// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !mobileMenu) return;

  // Toggle menu when clicking the burger
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
  });

  // Close menu when clicking a link inside it
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // Close menu when clicking anywhere outside
  document.addEventListener("click", (e) => {
    if (mobileMenu.classList.contains("hidden")) return;

    const clickedInsideMenu = mobileMenu.contains(e.target);
    const clickedToggle = menuBtn.contains(e.target);

    if (!clickedInsideMenu && !clickedToggle) {
      mobileMenu.classList.add("hidden");
    }
  });
});

// Scroll indicator
document.addEventListener('DOMContentLoaded', () => {
  const scrollIndicator = document.getElementById('scrollIndicator');
  const aboutSection = document.getElementById('about');

  if (!scrollIndicator || !aboutSection) return;

  // Click → scroll to About with offset
  scrollIndicator.addEventListener('click', () => {
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    const targetPosition = aboutSection.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });

  // Hide as soon as the user scrolls slightly
  const hideAfterFirstScroll = () => {
    if (window.scrollY > 40) {
      scrollIndicator.classList.add('scroll-chevrons--hidden');
    } else {
      scrollIndicator.classList.remove('scroll-chevrons--hidden');
    }
  };

  window.addEventListener('scroll', hideAfterFirstScroll);
  hideAfterFirstScroll(); // run on load
});

// Smooth scroll with offset for fixed navbar
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 80;
  
  // Handle all anchor link clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip empty hash or just "#"
      if (!href || href === '#' || href === '#home') {
        if (href === '#home') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        e.preventDefault();
        
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
        
        // Update URL without triggering scroll
        history.pushState(null, null, href);
      }
    });
  });
});

