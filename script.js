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