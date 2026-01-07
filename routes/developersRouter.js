const { Router } = require("express");
const { getDevelopersPage } = require("../controllers/developersController");
const developersRouter = Router();

developersRouter.get("/", getDevelopersPage);

module.exports = developersRouter;
