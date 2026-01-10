const { Router } = require("express");
const {
  getAllGenresPage,
  getGenrePage,
} = require("../controllers/genresController");
const genresRouter = Router();

genresRouter.get("/", getAllGenresPage);
genresRouter.get("/:genreId", getGenrePage);

module.exports = genresRouter;
