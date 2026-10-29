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

  const interactiveSelector = 'a, button, input, textarea, summary, .carousel-card, .gallery-card-item, .mockup-display, .logo-card, .browser-content, .close-charte-btn';
  
  function attachHoverListeners() {
    const interactives = document.querySelectorAll(interactiveSelector);
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => glass.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => glass.classList.remove('cursor-active'));
    });
  }
  attachHoverListeners();

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

  // Orbes lilas froid et lavande polaire
  const orbs = [
    { x: width * 0.2, y: height * 0.3, radius: 320, vx: 0.3, vy: 0.2, color: 'rgba(167, 139, 250, 0.28)' },
    { x: width * 0.8, y: height * 0.6, radius: 360, vx: -0.25, vy: 0.3, color: 'rgba(196, 181, 253, 0.22)' },
    { x: width * 0.5, y: height * 0.85, radius: 300, vx: 0.28, vy: -0.25, color: 'rgba(124, 58, 237, 0.2)' },
    { x: width * 0.7, y: height * 0.2, radius: 260, vx: -0.3, vy: -0.18, color: 'rgba(221, 214, 254, 0.16)' },
  ];

  let mouseOffsetX = 0;
  let mouseOffsetY = 0;
  let targetOffsetX = 0;
  let targetOffsetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetOffsetX = (e.clientX - width / 2) * 0.035;
    targetOffsetY = (e.clientY - height / 2) * 0.035;
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
  let endX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  updateCarousel();
}

/* --------------------------------------------------------------------------
   4. FONCTION POUR FERMER LA CHARTE GRAPHIQUE HORIZEN
   -------------------------------------------------------------------------- */
window.closeCharte = function() {
  const details = document.getElementById('charte-details');
  if (!details) return;
  details.removeAttribute('open');
  details.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* --------------------------------------------------------------------------
   5. VISIONNEUSE PLEIN ÉCRAN UNIFIÉE (LIGHTBOX)
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('plasma-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  window.openInLightbox = function(imageSrc) {
    lightboxImg.src = imageSrc;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  };

  if (closeBtn) closeBtn.addEventListener('click', window.closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrap')) {
      window.closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      window.closeLightbox();
    }
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
}
