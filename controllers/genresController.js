const { getGamesByGenreId } = require("../models/gamesModel");
const { getAllGenres, getGenreById } = require("../models/genresModel");
const { getNavLinks } = require("../models/navbarModel");

const links = getNavLinks();

async function getAllGenresPage(req, res) {
  const genres = await getAllGenres();
  res.render("genresPage", { title: "Genres", links, genres });
}

async function getGenrePage(req, res) {
  const { genreId } = req.params;
  const genre = await getGenreById(genreId);
  const games = await getGamesByGenreId(genreId);
  res.render("allGamesPage", { title: `${genre[0].name} Games`, links, games });
}

module.exports = { getAllGenresPage, getGenrePage };
