const { body, validationResult, matchedData } = require("express-validator");
const {
  getDeveloperByGameId,
  updateGameDevelopers,
  addGameDevelopers,
} = require("../models/gameDevelopersModel");
const {
  getGameById,
  getAllGames,
  deleteGameById,
  updateGame,
  addGame,
} = require("../models/gamesModel");
const {
  getTagsByGameId,
  updateGameTags,
  addGameTags,
} = require("../models/gameTagsModel");
const { getAllGenres } = require("../models/genresModel");
const { getNavLinks } = require("../models/navbarModel");
const { getAllTags } = require("../models/tagsModel");
const { getAllDevelopers } = require("../models/developersModel");

const links = getNavLinks();
const validateGameData = [
  body("gameName")
    .trim()
    .notEmpty()
    .withMessage("Game name is required")
    .bail()
    .matches(/^[a-zA-Z0-9\s\-:_]+$/)
    .withMessage(
      "Game name can only include letters, numbers, spaces, and - : _",
    )
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage("Game name must be between 1 and 255 characters."),
  body("rating")
    .optional({ values: "falsy" })
    .isFloat({ min: 0, max: 10 })
    .withMessage("Rating must be a number between 0 and 10"),
  body("release_date")
    .trim()
    .notEmpty()
    .withMessage("Release date is required")
    .bail()
    .isISO8601({ strict: true })
    .withMessage("Invalid date format")
    .toDate(),
  body("genre")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("Invalid Genre"),
  body("developers")
    .optional({ values: "falsy" })
    .isArray()
    .withMessage("Developers must be an array"),
  body("tags").optional().isArray().withMessage("Tags must be an array."),
  body("cover_img_url")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Invalid URL"),
];

async function getAllGamesPage(req, res) {
  const [games, allTags, allDevelopers, genres] = await Promise.all([
    getAllGames(),
    getAllTags(),
    getAllDevelopers(),
    getAllGenres(),
  ]);
  res.render("allGamesPage", {
    title: "All Games",
    games,
    links,
    allTags,
    allDevelopers,
    genres,
  });
}

async function getGamePage(req, res) {
  const { gameId } = req.params;
  const [game, tags, developers, genres, allTags, allDevelopers] =
    await Promise.all([
      getGameById(gameId),
      getTagsByGameId(gameId),
      getDeveloperByGameId(gameId),
      // need to pass all genres to editGameOverlay
      getAllGenres(),
      getAllTags(),
      getAllDevelopers(),
    ]);
  res.render("gamePage", {
    game,
    tags,
    developers,
    links,
    genres,
    allTags,
    allDevelopers,
  });
}

async function postGameDelete(req, res) {
  const { gameId } = req.params;

  await deleteGameById(gameId);
  res.redirect(303, "/");
}

const postGameUpdate = [
  validateGameData,
  async (req, res) => {
    const { gameId } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [game, tags, developers, genres, allTags, allDevelopers] =
        await Promise.all([
          getGameById(gameId),
          getTagsByGameId(gameId),
          getDeveloperByGameId(gameId),
          // need to pass all genres to editGameOverlay
          getAllGenres(),
          getAllTags(),
          getAllDevelopers(),
        ]);
      return res.status(400).render("gamePage", {
        game,
        tags,
        developers,
        links,
        genres,
        allTags,
        allDevelopers,
        errors: errors.array(),
      });
    }
    const {
      gameName,
      rating,
      release_date,
      genre,
      developers,
      tags,
      cover_img_url,
    } = matchedData(req);

    console.log(matchedData(req));
    await Promise.all([
      updateGame(gameId, matchedData(req)),
      updateGameTags(gameId, tags),
      updateGameDevelopers(gameId, developers),
    ]);
    res.redirect(`/games/${gameId}`);
  },
];

const postGameAdd = [
  validateGameData,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [games, allTags, allDevelopers, genres] = await Promise.all([
        getAllGames(),
        getAllTags(),
        getAllDevelopers(),
        getAllGenres(),
      ]);
      return res.status(400).render("allGamesPage", {
        title: "All Games",
        games,
        links,
        allTags,
        allDevelopers,
        genres,
        errors: errors.array(),
      });
    }
    const data = matchedData(req);
    const newGameId = await addGame(data);
    await Promise.all([
      addGameTags(newGameId, data.tags),
      data.developers && addGameDevelopers(newGameId, data.developers),
    ]);
    res.redirect("/games");
  },
];

module.exports = {
  getGamePage,
  getAllGamesPage,
  postGameDelete,
  postGameUpdate,
  postGameAdd,
};
