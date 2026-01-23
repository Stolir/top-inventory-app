const {
  getAllDevelopers,
  getDeveloperById,
} = require("../models/developersModel");
const { getGamesByDeveloperId } = require("../models/gameDevelopersModel");
const { getNavLinks } = require("../models/navbarModel");

const links = getNavLinks();

async function getAllDevelopersPage(req, res) {
  const developers = await getAllDevelopers();
  res.render("categoryPage", {
    title: "Developers",
    links,
    category: "developers",
    categoryData: developers,
  });
}

async function getDeveloperPage(req, res) {
  const { developerId } = req.params;
  const games = await getGamesByDeveloperId(developerId);
  const developer = await getDeveloperById(developerId);

  res.render("filteredGamesPage", {
    title: `Games by ${developer}`,
    games,
    links,
  });
}

module.exports = { getAllDevelopersPage, getDeveloperPage };
