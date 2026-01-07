const { getNavLinks } = require("../models/navbarModel");

function getDevelopersPage(req, res) {
  const links = getNavLinks();
  res.render("placeholder", { title: "Developers", links });
}

module.exports = { getDevelopersPage };
