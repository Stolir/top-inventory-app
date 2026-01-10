const { Router } = require("express");
const { getAllTagsPage } = require("../controllers/tagsController");
const tagsRouter = Router();

tagsRouter.get("/", getAllTagsPage);

module.exports = tagsRouter;
