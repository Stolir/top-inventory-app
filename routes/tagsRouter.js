const { Router } = require("express");
const {
  getAllTagsPage,
  getTagPage,
  postTagDelete,
} = require("../controllers/tagsController");
const tagsRouter = Router();

tagsRouter.get("/", getAllTagsPage);
tagsRouter.get("/:tagId", getTagPage);
tagsRouter.post("/:tagId/delete", postTagDelete);

module.exports = tagsRouter;
