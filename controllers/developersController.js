const { getAllDevelopers } = require("../models/developersModel");
const { getNavLinks } = require("../models/navbarModel");

const links = getNavLinks();

async function getDevelopersPage(req, res) {
  const developers = await getAllDevelopers();
  res.render("developersPage", { title: "Developers", links, developers });
}

module.exports = { getDevelopersPage };
