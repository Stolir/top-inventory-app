const { Router } = require("express");
const {
  getAllDevelopersPage,
  getDeveloperPage,
} = require("../controllers/developersController");
const developersRouter = Router();

developersRouter.get("/", getAllDevelopersPage);
developersRouter.get("/:developerId", getDeveloperPage);

module.exports = developersRouter;
