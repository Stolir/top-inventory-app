const { getDeveloperByGameId } = require("../models/gameDevelopersModel");
const { getGameById, getAllGames } = require("../models/gamesModel");
const { getTagsByGameId } = require("../models/gameTagsModel");
const { getNavLinks } = require("../models/navbarModel");

const links = getNavLinks();

async function getAllGamesPage(req, res) {
  const games = await getAllGames();
  res.render("allGamesPage", { title: "All Games", games, links });
}

async function getGamePage(req, res) {
  const { gameId } = req.params;

  const game = await getGameById(gameId);
  const tags = await getTagsByGameId(gameId);
  const developers = await getDeveloperByGameId(gameId);
  console.log(developers);
  res.render("gamePage", { game, tags, developers, links });
}

module.exports = { getGamePage, getAllGamesPage };
