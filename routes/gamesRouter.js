const { Router } = require("express");
const {
  getGamePage,
  getAllGamesPage,
  postGameDelete,
  postGameUpdate,
  postGameAdd,
} = require("../controllers/gamesController");
const gamesRouter = Router();

gamesRouter.get("/", getAllGamesPage);
gamesRouter.get("/:gameId", getGamePage);
gamesRouter.post("/:gameId/delete", postGameDelete);
gamesRouter.post("/:gameId/update", postGameUpdate);
gamesRouter.post("/add", postGameAdd);

module.exports = gamesRouter;
