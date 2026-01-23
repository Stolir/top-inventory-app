const { Router } = require("express");
const {
  getAllGenresPage,
  getGenrePage,
  postGenreDelete,
} = require("../controllers/genresController");
const genresRouter = Router();

genresRouter.get("/", getAllGenresPage);
genresRouter.get("/:genreId", getGenrePage);
genresRouter.post("/:genreId/delete", postGenreDelete);

module.exports = genresRouter;
