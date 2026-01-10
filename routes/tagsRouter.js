const { Router } = require("express");
const { getAllTagsPage, getTagPage } = require("../controllers/tagsController");
const tagsRouter = Router();

tagsRouter.get("/", getAllTagsPage);
tagsRouter.get("/:tagId", getTagPage);

module.exports = tagsRouter;
