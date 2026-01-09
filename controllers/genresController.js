const { getAllGenres } = require("../models/genresModel");
const { getNavLinks } = require("../models/navbarModel");

const links = getNavLinks();

async function getGenresPage(req, res) {
  const genres = await getAllGenres();
  res.render("genresPage", { title: "Genres", links, genres });
}

module.exports = { getGenresPage };
