const { getNavLinks } = require("../models/navbarModel");

function getGamesPage(req, res) {
  const links = getNavLinks();
  res.render("placeholder", { title: "Games", links });
}

module.exports = { getGamesPage };
