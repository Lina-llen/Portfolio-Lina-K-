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