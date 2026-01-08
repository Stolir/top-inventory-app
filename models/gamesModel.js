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

async function getFeaturedGames() {
  const query =
    "SELECT games.*, genres.name AS genre FROM games JOIN genres ON games.genre_id=genres.id WHERE games.id IN (SELECT * FROM featured_games) ORDER BY games.id ASC";

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error getting featured games: ", err);
    throw err;
  }
}

async function getGameAwards() {
  const query =
    "SELECT games.*, genres.name AS genre FROM games JOIN genres ON games.genre_id=genres.id WHERE games.id IN (SELECT game_id FROM award_winners) ORDER BY games.id ASC";

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error getting game award winners: ", err);
    throw err;
  }
}

async function getGameById(id) {
  const query =
    "SELECT games.*, genre.name FROM games JOIN genres ON games.genre_id=genres.id WHERE id = $1";
  try {
    const { rows } = await pool.query(query, [id]);
    return rows;
  } catch (err) {
    console.error(`Error getting game with id: ${id}`, err);
    throw err;
  }
}

module.exports = { getAllGames, getFeaturedGames, getGameAwards, getGameById };
