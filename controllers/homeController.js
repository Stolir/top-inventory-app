const { getAllGames } = require("../models/gamesModel");
const { getNavLinks } = require("../models/navbarModel");

async function getHomePage(req, res) {
  const links = getNavLinks();
  const games = await getAllGames();
  // console.log(games);
  res.render("homePage", { title: "Home", links, games });
}

module.exports = {
  getHomePage,
};
