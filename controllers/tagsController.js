const { getGamesByTagId } = require("../models/gameTagsModel");
const { getNavLinks } = require("../models/navbarModel");
const { getAllTags, getTagById } = require("../models/tagsModel");

const links = getNavLinks();

async function getAllTagsPage(req, res) {
  const tags = await getAllTags();
  res.render("tagsPage", { title: "Tags", tags, links });
}

async function getTagPage(req, res) {
  const { tagId } = req.params;
  const games = await getGamesByTagId(tagId);
  const tag = await getTagById(tagId);

  res.render("allGamesPage", { title: `${tag} Games`, games, links });
}

module.exports = {
  getAllTagsPage,
  getTagPage,
};
