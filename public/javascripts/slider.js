document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".cardContainer");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const cards = Array.from(document.querySelectorAll(".card"));

  const cardsPerPage = 9;
  let currentIndex = 0;

  function setupCards() {
    // Clone cards for infinite effect
    for (let i = 0; i < cardsPerPage; i++) {
      const clone = cards[i].cloneNode(true);
      cardContainer.appendChild(clone);
    }

    updateCardOrder();
  }

  function updateCardOrder() {
    const allCards = Array.from(cardContainer.children);
    allCards.forEach((card, index) => {
      const orderIndex =
        (index - currentIndex + allCards.length) % allCards.length;
      card.style.order = orderIndex;
    });
  }

  function moveCards(direction) {
    currentIndex = (currentIndex + direction + cards.length) % cards.length;
    updateCardOrder();
  }

  prevBtn.addEventListener("click", () => moveCards(-9));
  nextBtn.addEventListener("click", () => moveCards(9));

  // Initial setup
  setupCards();

  // No need for resize handler in this implementation
});
