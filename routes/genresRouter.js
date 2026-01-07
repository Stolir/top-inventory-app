const { Router } = require("express");
const { getGenresPage } = require("../controllers/genresController");
const genresRouter = Router();

genresRouter.get("/", getGenresPage);

module.exports = genresRouter;
