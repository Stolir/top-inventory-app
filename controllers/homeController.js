const { getNavLinks } = require("../models/navbarModel");

function getHomePage(req, res) {
  const links = getNavLinks();
  res.render("index", { title: "Home Page", links });
}

module.exports = {
  getHomePage,
};
