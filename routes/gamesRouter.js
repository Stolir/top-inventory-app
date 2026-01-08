const { Router } = require("express");
const {
  getGamePage,
  getAllGamesPage,
} = require("../controllers/gamesController");
const gamesRouter = Router();

gamesRouter.get("/", getAllGamesPage);
gamesRouter.get("/:gameId", getGamePage);

module.exports = gamesRouter;
