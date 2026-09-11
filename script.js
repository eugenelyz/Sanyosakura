/* ============================================================
   TSURU — Platform Lifts
   script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initGalleryFilter();
  initHeroEntrance();
  initContactForm();
});

/* ---------- Mobile nav ---------- */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after choosing a link (mobile)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Gallery: toggle between All / Photos / Videos ---------- */
function initGalleryFilter() {
  const buttons = document.querySelectorAll('.toggle-btn');
  const items = document.querySelectorAll('.gallery-item');
  const emptyState = document.getElementById('galleryEmpty');
  if (!buttons.length || !items.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      buttons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      button.classList.add('is-active');
      button.setAttribute('aria-selected', 'true');

      let visibleCount = 0;

      items.forEach((item) => {
        const matches = filter === 'all' || item.dataset.type === filter;
        item.hidden = !matches;
        if (matches) visibleCount += 1;

        // Pause any video that just left view
        if (!matches) {
          const video = item.querySelector('video');
          if (video && !video.paused) video.pause();
        }
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });
}

/* ---------- Hero: one small entrance moment on load ---------- */
function initHeroEntrance() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero-inner');
  if (!hero || prefersReduced) return;

  hero.style.opacity = '0';
  hero.style.transform = 'translateY(12px)';
  hero.style.transition = 'opacity 700ms ease, transform 700ms ease';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
    });
  });
}

/* ---------- Contact form (front-end only placeholder) ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // This demo does not send data anywhere. Wire this up to your
    // own backend, form service (e.g. Formspree), or email API.
    status.textContent = 'Thank you — your enquiry has been noted. We will reply by email shortly.';
    form.reset();
  });
}

document.querySelectorAll('.gallery-item video').forEach(video => {
  video.addEventListener('play', async () => {
    try {
      if (video.requestFullscreen) {
        await video.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } catch (error) {
      console.error('Could not enter fullscreen:', error);
    }
  });
});

