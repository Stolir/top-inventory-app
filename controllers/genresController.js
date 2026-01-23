const { body, validationResult, matchedData } = require("express-validator");
const { getGamesByGenreId } = require("../models/gamesModel");
const {
  getAllGenres,
  getGenreById,
  deleteGenreById,
  addGenre,
} = require("../models/genresModel");
const { getNavLinks } = require("../models/navbarModel");

const links = getNavLinks();

const validateGenre = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Genre name cannot be empty")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Genre name must be 2-50 characters")
    .bail()
    .matches(/^[a-zA-Z0-9\s'-]+$/)
    .withMessage("Genre name contains invalid characters")
    .customSanitizer((name) =>
      // Capitalize each word
      name.replace(/\b\w/g, (c) => c.toUpperCase()),
    ),
];

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

const postGenreAdd = [
  validateGenre,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const genres = await getAllGenres();
      return res.status(400).render("categoryPage", {
        title: "Genres",
        links,
        categoryData: genres,
        category: "genres",
        errors: errors.array(),
      });
    }
    await addGenre(matchedData(req));
    res.redirect(303, "/genres");
  },
];

module.exports = {
  getAllGenresPage,
  getGenrePage,
  postGenreDelete,
  postGenreAdd,
};
