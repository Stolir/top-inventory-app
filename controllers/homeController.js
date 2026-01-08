const {
  getAllGames,
  getFeaturedGames,
  getGameAwards,
  getGameById,
} = require("../models/gamesModel");
const { getNavLinks } = require("../models/navbarModel");

const links = getNavLinks();

async function getHomePage(req, res) {
  const featuredGames = await getFeaturedGames();
  const gameAwards = await getGameAwards();
  // console.log(games);
  res.render("homePage", { title: "Home", links, featuredGames, gameAwards });
}
module.exports = {
  getHomePage,
};
