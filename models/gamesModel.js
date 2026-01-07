const pool = require("../database/pool");

async function getAllGames() {
  const query =
    "SELECT games.*, genres.name AS genre FROM games JOIN genres ON games.genre_id=genres.id ORDER BY games.id ASC";

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error getting games: ", err);
    throw err;
  }
}

module.exports = { getAllGames };
