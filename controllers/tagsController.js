const { getGamesByTagId } = require("../models/gameTagsModel");
const { getNavLinks } = require("../models/navbarModel");
const {
  getAllTags,
  getTagById,
  deleteTagById,
} = require("../models/tagsModel");

const links = getNavLinks();

async function getAllTagsPage(req, res) {
  const tags = await getAllTags();
  res.render("categoryPage", {
    title: "Tags",
    categoryData: tags,
    category: "tags",
    links,
  });
}

async function getTagPage(req, res) {
  const { tagId } = req.params;
  const games = await getGamesByTagId(tagId);
  const tag = await getTagById(tagId);

  res.render("filteredGamesPage", { title: `${tag} Games`, games, links });
}

async function postTagDelete(req, res) {
  const { tagId } = req.params;
  await deleteTagById(tagId);
  res.redirect(303, "/tags");
}

module.exports = {
  getAllTagsPage,
  getTagPage,
  postTagDelete,
};
