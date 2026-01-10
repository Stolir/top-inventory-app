const {
  getAllDevelopers,
  getDeveloperById,
} = require("../models/developersModel");
const { getGamesByDeveloperId } = require("../models/gameDevelopersModel");
const { getNavLinks } = require("../models/navbarModel");

const links = getNavLinks();

async function getAllDevelopersPage(req, res) {
  const developers = await getAllDevelopers();
  res.render("developersPage", { title: "Developers", links, developers });
}

async function getDeveloperPage(req, res) {
  const { developerId } = req.params;
  const games = await getGamesByDeveloperId(developerId);
  const developer = await getDeveloperById(developerId);

  res.render("allGamesPage", { title: `Games by ${developer}`, games, links });
}

module.exports = { getAllDevelopersPage, getDeveloperPage };
