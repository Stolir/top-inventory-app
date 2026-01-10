const navbar = document.querySelector("header nav");
const searchBtn = navbar.querySelector(".search button");
const searchBar = navbar.querySelector(".search input");

searchBtn.addEventListener("click", () => {
  searchBar.classList.toggle("active");
  if (searchBar.classList.contains("active")) {
    searchBar.focus();
  }
});
