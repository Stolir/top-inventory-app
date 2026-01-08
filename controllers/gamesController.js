const { getDeveloperByGameId } = require("../models/gameDevelopersModel");
const { getGameById } = require("../models/gamesModel");
const { getTagsByGameId } = require("../models/gameTagsModel");
const { getNavLinks } = require("../models/navbarModel");

const links = getNavLinks();

async function getAllGamesPage(req, res) {
  res.render("placeholder", { title: "Games", links });
}

async function getGamePage(req, res) {
  const { gameId } = req.params;
  console.log(`getting page with id ${gameId}`);
  const game = await getGameById(gameId);
  const tags = await getTagsByGameId(gameId);
  const developers = await getDeveloperByGameId(gameId);
  console.log(game, tags, developers);
  res.render("gamePage", { game, tags, developers, links });
}

module.exports = { getGamePage, getAllGamesPage };
