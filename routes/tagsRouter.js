const { Router } = require("express");
const {
  getAllTagsPage,
  getTagPage,
  postTagDelete,
  postTagAdd,
} = require("../controllers/tagsController");
const tagsRouter = Router();

tagsRouter.get("/", getAllTagsPage);
tagsRouter.get("/:tagId", getTagPage);
tagsRouter.post("/:tagId/delete", postTagDelete);
tagsRouter.post("/add", postTagAdd);

module.exports = tagsRouter;
