// Accordion functionality
document.querySelectorAll(".accordion-btn").forEach((button) => {
  const icon = button.querySelector(".accordion-icon");
  const targetSelector = button.dataset.accordionTarget;
  const target = targetSelector ? document.querySelector(targetSelector) : null;
  if (!target) return; // safety

  button.addEventListener("click", (event) => {
    event.preventDefault();

    const isOpen = !target.classList.contains("hidden");

    // Close all accordions (projects & case studies)
    document.querySelectorAll(".accordion-btn").forEach((b) => {
      const sel = b.dataset.accordionTarget;
      if (!sel) return;
      const panel = document.querySelector(sel);
      const ic = b.querySelector(".accordion-icon");
      if (panel) {
        panel.classList.add("hidden");
        panel.style.maxHeight = null; // clear any inline styles
      }
      b.classList.remove("active");
      if (ic) ic.textContent = "+";
    });

    // If the clicked one was closed, open it
    if (!isOpen) {
      target.classList.remove("hidden");
      target.style.maxHeight = ""; // let CSS / grid handle height
      button.classList.add("active");
      if (icon) icon.textContent = "−";

      // scroll so the company card is nicely in view
      const yOffset = -120;
      const rect = button.getBoundingClientRect();
      const y = rect.top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});

// Project links that open accordions
document.addEventListener('DOMContentLoaded', () => {
  const projectLinks = document.querySelectorAll('[data-open-accordion]');

  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetSectionSelector = link.getAttribute('href');           // e.g. "#projects-arcadia"
      const accordionSelector = link.dataset.openAccordion;             // e.g. "#Arcadia"

      const sectionEl = document.querySelector(targetSectionSelector);
      const accordionBtn = document.querySelector(
        `.accordion-btn[data-accordion-target="${accordionSelector}"]`
      );

      // Smooth scroll to the projects row
      if (sectionEl) {
        const yOffset = -120; // tweak if needed
        const y = sectionEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }

      // Open the matching accordion after a short delay
      if (accordionBtn) {
        setTimeout(() => {
          accordionBtn.click(); // uses your existing accordion logic
        }, 20);
      }
    });
  });

  // "View experience" buttons in projects section
  const expViewButtons = document.querySelectorAll('a[data-company][href="#experience"]');
  
  expViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const company = button.dataset.company; // e.g. "arcadia", "tsd", "ananas", "vox"
      const experienceSection = document.getElementById('experience');
      
      if (!experienceSection || !company) return;
      
      // Scroll to experience section
      const yOffset = -120;
      const y = experienceSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Activate the correct company tab after scroll
      setTimeout(() => {
        // Use the tab click to ensure all styling is applied
        const tab = document.querySelector(`.exp-tab[data-company="${company}"]`);
        if (tab) {
          tab.click();
        } else if (typeof activateCompany === 'function') {
          // Fallback to function if tab not found
          activateCompany(company);
        }
      }, 300);
    });
  });
});

