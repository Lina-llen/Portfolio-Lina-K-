/**
 * ==========================================================================
 * PORTFOLIO LINA KHIAL — MOTEUR D'INTERACTIONS
 * Ambiance : Violet froid / Lilas polaire / Lavande givrée
 * 100% Vanilla JavaScript natif
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initPlasmaBackground();
  initCarousel3D();
  initLightbox();
  initRevealOnScroll();
  initBackToTop();
  initCardTilt();
  initHeroParticles();
});

/* --------------------------------------------------------------------------
   1. CURSEUR EN VERRE FLUIDE (DESKTOP SEULEMENT)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const glass = document.querySelector('.cursor-glass');

  const isTouchDevice = !window.matchMedia('(pointer: fine)').matches;
  if (isTouchDevice || !dot || !glass) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glassX = mouseX;
  let glassY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    glassX += (mouseX - glassX) * 0.18;
    glassY += (mouseY - glassY) * 0.18;

    glass.style.left = `${glassX}px`;
    glass.style.top = `${glassY}px`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  const interactiveSelector = 'a, button, input, textarea, summary, .carousel-card, .gallery-card-item, .mockup-display, .logo-card, .browser-content, .close-charte-btn, .carousel-nav-btn, .carousel-dot, .lightbox-close-btn, .lightbox-nav';

  function attachHoverListeners() {
    const interactives = document.querySelectorAll(interactiveSelector);
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => glass.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => glass.classList.remove('cursor-active'));
    });
  }
  attachHoverListeners();

  // Re-attach listeners when carousel updates
  const observer = new MutationObserver(() => {
    attachHoverListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    glass.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    glass.style.opacity = '1';
  });
}

/* --------------------------------------------------------------------------
   2. ARRIÈRE-PLAN CANVAS PLASMA LILAS FROID
   -------------------------------------------------------------------------- */
function initPlasmaBackground() {
  const canvas = document.getElementById('plasma-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Orbes lilas froid et lavande polaire — plus intenses
  const orbs = [
    { x: width * 0.2,  y: height * 0.3,  radius: 380, vx: 0.28, vy: 0.18, color: 'rgba(167, 139, 250, 0.35)' },
    { x: width * 0.8,  y: height * 0.6,  radius: 420, vx: -0.22, vy: 0.26, color: 'rgba(196, 181, 253, 0.28)' },
    { x: width * 0.5,  y: height * 0.85, radius: 340, vx: 0.24, vy: -0.22, color: 'rgba(124, 58, 237, 0.26)' },
    { x: width * 0.72, y: height * 0.18, radius: 290, vx: -0.28, vy: -0.16, color: 'rgba(221, 214, 254, 0.2)' },
    { x: width * 0.1,  y: height * 0.75, radius: 250, vx: 0.18, vy: -0.3,  color: 'rgba(167, 139, 250, 0.18)' },
  ];

  let mouseOffsetX = 0;
  let mouseOffsetY = 0;
  let targetOffsetX = 0;
  let targetOffsetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetOffsetX = (e.clientX - width / 2) * 0.055;
    targetOffsetY = (e.clientY - height / 2) * 0.055;
  });

  function animatePlasma() {
    ctx.clearRect(0, 0, width, height);

    mouseOffsetX += (targetOffsetX - mouseOffsetX) * 0.05;
    mouseOffsetY += (targetOffsetY - mouseOffsetY) * 0.05;

    ctx.globalCompositeOperation = 'screen';

    orbs.forEach((orb) => {
      orb.x += orb.vx;
      orb.y += orb.vy;

      if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
      if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

      const posX = orb.x + mouseOffsetX;
      const posY = orb.y + mouseOffsetY;

      const gradient = ctx.createRadialGradient(posX, posY, 0, posX, posY, orb.radius);
      gradient.addColorStop(0, orb.color);
      gradient.addColorStop(1, 'rgba(7, 4, 15, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(posX, posY, orb.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animatePlasma);
  }

  animatePlasma();
}

/* --------------------------------------------------------------------------
   3. CARROUSEL 3D
   -------------------------------------------------------------------------- */
function initCarousel3D() {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-card');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!track || cards.length === 0) return;

  const total = cards.length;
  let currentIndex = 0;

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Projet ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateCarousel() {
    const dots = document.querySelectorAll('.carousel-dot');

    cards.forEach((card, i) => {
      card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden-left', 'is-hidden-right');

      const prevIndex = (currentIndex - 1 + total) % total;
      const nextIndex = (currentIndex + 1) % total;

      if (i === currentIndex) {
        card.classList.add('is-active');
      } else if (i === prevIndex) {
        card.classList.add('is-prev');
      } else if (i === nextIndex) {
        card.classList.add('is-next');
      } else {
        const diff = (i - currentIndex + total) % total;
        if (diff > total / 2) {
          card.classList.add('is-hidden-left');
        } else {
          card.classList.add('is-hidden-right');
        }
      }
    });

    if (dots.length > 0) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCarousel();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (i !== currentIndex) {
        e.preventDefault();
        currentIndex = i;
        updateCarousel();
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;
      // Ne déclencher le slide que si le geste est principalement horizontal
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });

  updateCarousel();
}

/* --------------------------------------------------------------------------
   4. FONCTION POUR FERMER LA CHARTE GRAPHIQUE HORIZEN
   -------------------------------------------------------------------------- */
window.closeCharte = function () {
  const details = document.getElementById('charte-details');
  if (!details) return;
  details.removeAttribute('open');
  details.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* --------------------------------------------------------------------------
   5. VISIONNEUSE PLEIN ÉCRAN UNIFIÉE (LIGHTBOX) - AVEC NAVIGATION
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('plasma-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!lightbox || !lightboxImg) return;

  // Collect all lightbox-triggering images
  let lightboxImages = [];
  let currentLightboxIndex = 0;

  function collectLightboxImages() {
    lightboxImages = [];

    // Carousel cards
    document.querySelectorAll('.carousel-card .card-media img').forEach((img) => {
      lightboxImages.push(img.src);
    });

    // Mockup displays
    document.querySelectorAll('.mockup-display img').forEach((img) => {
      lightboxImages.push(img.src);
    });

    // Browser content
    document.querySelectorAll('.browser-content img').forEach((img) => {
      lightboxImages.push(img.src);
    });

    // Gallery items
    document.querySelectorAll('.gallery-card-item img').forEach((img) => {
      lightboxImages.push(img.src);
    });

    // Charte images
    document.querySelectorAll('.full-width-img').forEach((img) => {
      lightboxImages.push(img.src);
    });

    // Project hero logos
    document.querySelectorAll('.project-hero-logo').forEach((img) => {
      lightboxImages.push(img.src);
    });

    // Logo cards
    document.querySelectorAll('.logo-card img').forEach((img) => {
      lightboxImages.push(img.src);
    });
  }

  window.openInLightbox = function (imageSrc) {
    collectLightboxImages();
    currentLightboxIndex = lightboxImages.indexOf(imageSrc);
    if (currentLightboxIndex === -1) currentLightboxIndex = 0;
    lightboxImg.src = imageSrc;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    updateLightboxNav();
  };

  window.closeLightbox = function () {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  };

  function navigateLightbox(direction) {
    if (lightboxImages.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
    lightboxImg.src = lightboxImages[currentLightboxIndex];
    updateLightboxNav();
  }

  function updateLightboxNav() {
    if (prevBtn) prevBtn.style.opacity = lightboxImages.length > 1 ? '0.6' : '0';
    if (nextBtn) nextBtn.style.opacity = lightboxImages.length > 1 ? '0.6' : '0';
  }

  if (closeBtn) closeBtn.addEventListener('click', window.closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrap')) {
      window.closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') window.closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  const mockupDisplays = document.querySelectorAll('.mockup-display, .browser-content');
  mockupDisplays.forEach((el) => {
    el.addEventListener('click', () => {
      const fullImg = el.getAttribute('data-full-img') || el.querySelector('img')?.src;
      if (fullImg) window.openInLightbox(fullImg);
    });
  });

  const galleryItems = document.querySelectorAll('.gallery-card-item img');
  galleryItems.forEach((img) => {
    img.addEventListener('click', () => {
      window.openInLightbox(img.src);
    });
  });

  // Carousel card images
  const carouselImages = document.querySelectorAll('.carousel-card .card-media img');
  carouselImages.forEach((img) => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.openInLightbox(img.src);
    });
  });

  // Charte images
  const charteImages = document.querySelectorAll('.full-width-img');
  charteImages.forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      window.openInLightbox(img.src);
    });
  });
}

/* --------------------------------------------------------------------------
   6. ANIMATIONS D'ENTRÉE AU SCROLL (REVEAL)
   -------------------------------------------------------------------------- */
function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-slide-left, .reveal-slide-right');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7. TILT 3D SUBTIL SUR LA CARTE ACTIVE
   -------------------------------------------------------------------------- */
function initCardTilt() {
  const track = document.querySelector('.carousel-track');
  if (!track || window.matchMedia('(pointer: coarse)').matches) return;

  track.addEventListener('mousemove', (e) => {
    const activeCard = document.querySelector('.carousel-card.is-active');
    if (!activeCard) return;
    const rect = activeCard.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const tiltX = dy * -6;
    const tiltY = dx * 6;
    activeCard.style.transform = `translate3d(0, 0, 120px) scale(1.08) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  track.addEventListener('mouseleave', () => {
    const activeCard = document.querySelector('.carousel-card.is-active');
    if (!activeCard) return;
    activeCard.style.transform = '';
  });
}

/* --------------------------------------------------------------------------
   8. BOUTON RETOUR EN HAUT
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top-btn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   9. PARTICULES HERO - ANIMATION FLOTTANTE
   -------------------------------------------------------------------------- */
function initHeroParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const particleCount = 18;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';

    // Position aléatoire
    const startX = Math.random() * 100;
    const startY = 100 + Math.random() * 20; // Commence en bas
    const delay = Math.random() * 8;
    const duration = 6 + Math.random() * 6;
    const size = 2 + Math.random() * 4;
    const opacity = 0.3 + Math.random() * 0.5;

    particle.style.cssText = `
      left: ${startX}%;
      top: ${startY}%;
      width: ${size}px;
      height: ${size}px;
      opacity: 0;
      animation: particle-float ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
    `;

    container.appendChild(particle);
  }
}