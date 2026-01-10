const navbar = document.querySelector("header nav");
const searchBtn = navbar.querySelector(".search button");

const searchBackdrop = document.querySelector(".search-section-container");
const searchModal = document.querySelector(".search-section");
const searchBar = searchModal.querySelector("input");
const closeSearchBtn = searchModal.querySelector(".search-section__close");
const page = document.getElementById("page-content");

searchBtn.addEventListener("click", () => {
  openSearch();
});

function openSearch() {
  searchBackdrop.hidden = false;
  page.inert = true;
  searchBar.focus();
  page.classList.toggle("blur");
}

function closeSearch() {
  searchBackdrop.hidden = true;
  page.inert = false;
  page.classList.toggle("blur");
}

searchBackdrop.addEventListener("click", (e) => {
  if (!searchModal.contains(e.target)) {
    closeSearch();
  }
});

closeSearchBtn.addEventListener("click", () => {
  closeSearch();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && searchBackdrop.hidden === false) {
    closeSearch();
  }
});
