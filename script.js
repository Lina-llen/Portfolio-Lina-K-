const dot = document.querySelector('.cursor-dot');
const glass = document.querySelector('.cursor-glass');

let glassX = 0, glassY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Le point suit instantanément
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
});

function animate() {
    // Inertie du cercle en verre (0.15 = douceur du mouvement)
    glassX += (mouseX - glassX) * 0.15;
    glassY += (mouseY - glassY) * 0.15;
    
    glass.style.left = glassX + 'px';
    glass.style.top = glassY + 'px';
    
    requestAnimationFrame(animate);
}
animate();

// Interactions au survol
const interactives = document.querySelectorAll('a, button, .mockup-container, summary, .close-charte-text, .nav-link');

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => glass.classList.add('cursor-active-glass'));
    el.addEventListener('mouseleave', () => glass.classList.remove('cursor-active-glass'));
});

const container = document.getElementById("particles");

for (let i = 0; i < 80; i++) {
  const p = document.createElement("div");
  p.classList.add("particle");

  const size = Math.random() * 4 + 3;
  p.style.width = size + "px";
  p.style.height = size + "px";

  p.style.left = Math.random() * 100 + "vw";
  p.style.top = 100 + Math.random() * 20 + "vh";

  p.style.animationDuration = 5 + Math.random() * 10 + "s";
  p.style.animationDelay = Math.random() * -20 + "s";

  container.appendChild(p);
}

const cards = document.querySelectorAll(".card");
let current = 2;
const total = cards.length;

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove("left", "center", "right");

    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;

    if (i === current) {
      card.classList.add("center");
    } 
    else if (i === prev) {
      card.classList.add("left");
    } 
    else if (i === next) {
      card.classList.add("right");
    }
  });
}

document.getElementById("next").addEventListener("click", () => {
  current = (current + 1) % total;
  updateCarousel();
});

document.getElementById("prev").addEventListener("click", () => {
  current = (current - 1 + total) % total;
  updateCarousel();
});

updateCarousel();


   function closeCharte() {
        const details = document.getElementById('charte-details');
        // On retire l'attribut 'open' pour fermer le volet
        details.removeAttribute('open');
        
        // On replace l'utilisateur au niveau du titre de la charte
        details.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function openViewer() {
        const viewer = document.getElementById('fullscreen-viewer');
        viewer.style.display = 'flex';
        // Petit délai pour permettre l'animation CSS
        setTimeout(() => {
            viewer.classList.add('active');
        }, 10);
        // Désactiver le scroll de la page de fond
        document.body.style.overflow = 'hidden';
    }

    function closeViewer() {
        const viewer = document.getElementById('fullscreen-viewer');
        viewer.classList.remove('active');
        setTimeout(() => {
            viewer.style.display = 'none';
        }, 400);
        // Réactiver le scroll
        document.body.style.overflow = 'auto';
    }
    
    // Fermer aussi avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeViewer();
    });
    function openViewer() {
        const viewer = document.getElementById('fullscreen-viewer');
        viewer.style.display = 'block';
        
        // Petit délai pour déclencher l'animation CSS
        setTimeout(() => {
            viewer.classList.add('active');
        }, 10);
        
        // Bloquer le scroll du portfolio en arrière-plan
        document.body.style.overflow = 'hidden';
    }

    function closeViewer() {
        const viewer = document.getElementById('fullscreen-viewer');
        viewer.classList.remove('active');
        
        setTimeout(() => {
            viewer.style.display = 'none';
        }, 400);
        
        // Libérer le scroll du portfolio
        document.body.style.overflow = 'auto';
    }
    
    // Fermeture avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeViewer();
    });