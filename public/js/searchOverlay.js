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

// Search request
const resultsContainer = searchModal.querySelector(".search-section__results");
const gameResults = resultsContainer.querySelector(
  ".search-section__results-games"
);
const genreResults = resultsContainer.querySelector(
  ".search-section__results-genres"
);
const tagResults = resultsContainer.querySelector(
  ".search-section__results-tags"
);
const developerResults = resultsContainer.querySelector(
  ".search-section__results-developers"
);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// selects a container from pre-defined elements searchOverlay.ejs
function selectSection(sectionName) {
  let section;
  switch (sectionName) {
    case "games":
      section = gameResults;
      break;
    case "genres":
      section = genreResults;
      break;
    case "tags":
      section = tagResults;
      break;
    case "developers":
      section = developerResults;
      break;
    default:
      section = null;
  }
  return section;
}

function populateResultSection(sectionName, items) {
  const section = selectSection(sectionName);

  if (items.length < 1) {
    section.textContent = "";
    section.hidden = true;
    return;
  }

  section.hidden = false;
  const header = document.createElement("h1");
  header.textContent = capitalizeFirstLetter(sectionName);
  section.appendChild(header);

  for (const item of items) {
    const itemContainer = document.createElement("a");
    itemContainer.setAttribute("href", `/${sectionName}/${item.id}`);
    itemContainer.classList.add("search-result__item-container");
    if (item.cover_img_url) {
      console.log(item.cover_img_url);
      const itemImg = document.createElement("img");
      itemImg.src = item.cover_img_url;
      itemContainer.appendChild(itemImg);
    }
    const itemName = document.createElement("p");
    itemName.textContent = item.name;
    itemContainer.appendChild(itemName);

    section.appendChild(itemContainer);
  }

  return;
}

function displaySearchResults(results) {
  resultsContainer
    .querySelectorAll("section")
    .forEach((container) => (container.textContent = ""));
  for (const [key, items] of Object.entries(results)) {
    populateResultSection(key, items);
  }
}

async function retrieveSearchResults(query) {
  try {
    const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    displaySearchResults(data);
  } catch (err) {
    console.error("Error getting search results: ", err);
    throw err;
  }
}

function debounce(callback, delay = 300) {
  let timerId;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const debouncedSearch = debounce(retrieveSearchResults, 300);

searchBar.addEventListener("input", async (e) => {
  const query = e.target.value.trim();
  debouncedSearch(query);
});
