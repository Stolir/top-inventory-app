const { Router } = require("express");
const {
  getAllDevelopersPage,
  getDeveloperPage,
  postDeveloperDelete,
} = require("../controllers/developersController");
const developersRouter = Router();

developersRouter.get("/", getAllDevelopersPage);
developersRouter.get("/:developerId", getDeveloperPage);
developersRouter.post("/:developerId/delete", postDeveloperDelete);

module.exports = developersRouter;
