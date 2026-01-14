const { Router } = require("express");
const { getSearchResults } = require("../controllers/searchController");

const searchRouter = Router();

searchRouter.get("/", getSearchResults);

module.exports = searchRouter;
