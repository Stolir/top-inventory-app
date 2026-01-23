const { getGamesByGenreId } = require("../models/gamesModel");
const {
  getAllGenres,
  getGenreById,
  deleteGenreById,
} = require("../models/genresModel");
const { getNavLinks } = require("../models/navbarModel");

const links = getNavLinks();

async function getAllGenresPage(req, res) {
  const genres = await getAllGenres();
  res.render("categoryPage", {
    title: "Genres",
    links,
    categoryData: genres,
    category: "genres",
  });
}

async function getGenrePage(req, res) {
  const { genreId } = req.params;
  const genre = await getGenreById(genreId);
  const games = await getGamesByGenreId(genreId);
  res.render("filteredGamesPage", {
    title: `${genre[0].name} Games`,
    links,
    games,
  });
}

async function postGenreDelete(req, res) {
  const { genreId } = req.params;
  await deleteGenreById(genreId);
  res.redirect(303, "/genres");
}

module.exports = { getAllGenresPage, getGenrePage, postGenreDelete };
