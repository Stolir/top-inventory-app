const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const developersRouter = require("./routes/developersRouter");
const gamesRouter = require("./routes/gamesRouter");
const genresRouter = require("./routes/genresRouter");

const PORT = process.env.LOCAL_HOST_PORT || 3000;

// set views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set express settings
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/developers", developersRouter);
app.use("/games", gamesRouter);
app.use("/genres", genresRouter);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app running on port ${PORT}`);
});
