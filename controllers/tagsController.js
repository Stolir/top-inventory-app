const { body, validationResult, matchedData } = require("express-validator");
const { getGamesByTagId } = require("../models/gameTagsModel");
const { getNavLinks } = require("../models/navbarModel");
const {
  getAllTags,
  getTagById,
  deleteTagById,
  addTag,
} = require("../models/tagsModel");

const validateTag = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tag name cannot be empty")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Tag name must be 2-50 characters")
    .bail()
    .matches(/^[a-zA-Z0-9\s'-]+$/)
    .withMessage("Tag name contains invalid characters")
    .customSanitizer((name) =>
      // Capitalize each word
      name.replace(/\b\w/g, (c) => c.toUpperCase()),
    ),
];

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
const postTagAdd = [
  validateTag,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const tags = await getAllTags();
      return res.status(400).render("categoryPage", {
        title: "Tags",
        links,
        categoryData: tags,
        category: "tags",
        errors: errors.array(),
      });
    }
    await addTag(matchedData(req));
    res.redirect(303, "/tags");
  },
];
module.exports = {
  getAllTagsPage,
  getTagPage,
  postTagDelete,
  postTagAdd,
};
