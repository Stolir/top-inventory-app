const { getDevelopersBySearchQuery } = require("../models/developersModel");
const { getGamesBySearchQuery } = require("../models/gamesModel");
const { getGenresBySearchQuery } = require("../models/genresModel");
const { getTagsBySearchQuery } = require("../models/tagsModel");

async function getSearchResults(req, res) {
  const searchQuery = req.query.q;
  const [games, genres, tags, developers] = await Promise.all([
    getGamesBySearchQuery(searchQuery),
    getGenresBySearchQuery(searchQuery),
    getTagsBySearchQuery(searchQuery),
    getDevelopersBySearchQuery(searchQuery),
  ]);

  res.json({ games, genres, tags, developers });
}

module.exports = { getSearchResults };
