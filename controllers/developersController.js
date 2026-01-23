const { validationResult, matchedData, body } = require("express-validator");
const {
  getAllDevelopers,
  getDeveloperById,
  deleteDeveloperById,
  addDeveloper,
} = require("../models/developersModel");
const { getGamesByDeveloperId } = require("../models/gameDevelopersModel");
const { getNavLinks } = require("../models/navbarModel");

const validateDeveloper = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Developer name cannot be empty")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Developer name must be 2-50 characters")
    .bail()
    .matches(/^[a-zA-Z0-9\s'-]+$/)
    .withMessage("Developer name contains invalid characters")
    .customSanitizer((name) =>
      // Capitalize each word
      name.replace(/\b\w/g, (c) => c.toUpperCase()),
    ),
];

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

async function postDeveloperDelete(req, res) {
  const { developerId } = req.params;
  await deleteDeveloperById(developerId);
  res.redirect(303, "/developers");
}

const postDeveloperAdd = [
  validateDeveloper,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const developers = await getAllDevelopers();
      return res.status(400).render("categoryPage", {
        title: "Developers",
        links,
        categoryData: developers,
        category: "developers",
        errors: errors.array(),
      });
    }
    await addDeveloper(matchedData(req));
    res.redirect(303, "/developers");
  },
];

module.exports = {
  getAllDevelopersPage,
  getDeveloperPage,
  postDeveloperDelete,
  postDeveloperAdd,
};
