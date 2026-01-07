const { getNavLinks } = require("../models/navbarModel");

function getGenresPage(req, res) {
  const links = getNavLinks();
  res.render("placeholder", { title: "Genres", links });
}

module.exports = { getGenresPage };
