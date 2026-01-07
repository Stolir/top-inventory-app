const carouselContainers = document.querySelectorAll(".carousel-container");

function updateArrows(carousel, arrowLeft, arrowRight) {
  if (carousel.scrollLeft <= 0) {
    arrowLeft.style.display = "none";
  } else {
    arrowLeft.style.display = "block";
  }

  if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
    arrowRight.style.display = "none";
  } else {
    arrowRight.style.display = "block";
  }
}

carouselContainers.forEach((carouselContainer) => {
  const carousel = carouselContainer.querySelector(".carousel");

  // arrow scrolling
  const arrowLeft = carouselContainer.querySelector(".arrow.left");
  const arrowRight = carouselContainer.querySelector(".arrow.right");
  const scrollAmount = carousel.clientWidth * 0.5;
  if (arrowLeft) {
    arrowLeft.addEventListener("click", () => {
      console.log("scrolling");
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  if (arrowRight) {
    arrowRight.addEventListener("click", () => {
      console.log("scrolling");
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }

  // drag scrolling
  let isDown = false;
  let startX, scrollLeft;

  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.classList.add("dragging");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });

  carousel.addEventListener("scrollend", () => {
    updateArrows(carousel, arrowLeft, arrowRight);
  });

  carousel.addEventListener("dragstart", (e) => e.preventDefault());
  updateArrows(carousel, arrowLeft, arrowRight);
});
