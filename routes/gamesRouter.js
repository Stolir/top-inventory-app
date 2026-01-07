const { Router } = require("express");
const { getGamesPage } = require("../controllers/gamesController");
const gamesRouter = Router();

gamesRouter.get("/", getGamesPage);

module.exports = gamesRouter;
