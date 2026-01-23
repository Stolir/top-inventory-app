const { Router } = require("express");
const {
  getAllDevelopersPage,
  getDeveloperPage,
  postDeveloperDelete,
  postDeveloperAdd,
} = require("../controllers/developersController");
const developersRouter = Router();

developersRouter.get("/", getAllDevelopersPage);
developersRouter.get("/:developerId", getDeveloperPage);
developersRouter.post("/:developerId/delete", postDeveloperDelete);
developersRouter.post("/add", postDeveloperAdd);

module.exports = developersRouter;
