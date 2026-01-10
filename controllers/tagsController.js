const { getNavLinks } = require("../models/navbarModel");
const { getAllTags } = require("../models/tagsModel");

const links = getNavLinks();

async function getAllTagsPage(req, res) {
  const tags = await getAllTags();
  console.log(tags);
  res.render("tagsPage", { title: "Tags", tags, links });
}

module.exports = {
  getAllTagsPage,
};
