const { Router } = require("express");
const {
  getAllGenresPage,
  getGenrePage,
  postGenreDelete,
  postGenreAdd,
} = require("../controllers/genresController");
const genresRouter = Router();

genresRouter.get("/", getAllGenresPage);
genresRouter.get("/:genreId", getGenrePage);
genresRouter.post("/:genreId/delete", postGenreDelete);
genresRouter.post("/add", postGenreAdd);

module.exports = genresRouter;
