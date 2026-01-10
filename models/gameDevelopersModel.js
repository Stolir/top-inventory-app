const pool = require("../database/pool");

async function getDeveloperByGameId(gameId) {
  const query = `
  SELECT gd.*, d.name FROM game_developers gd 
  JOIN developers d ON gd.developer_id = d.id
  WHERE gd.game_id = $1`;

  try {
    const { rows } = await pool.query(query, [gameId]);
    return rows;
  } catch (err) {
    console.error("Error getting developers by game ID: ", err);
    throw err;
  }
}

async function getGamesByDeveloperId(developerId) {
  const query = `
  SELECT games.*, genres.name AS genre FROM games
  JOIN genres ON games.genre_id = genres.id
  WHERE games.id IN (SELECT game_id FROM game_developers WHERE developer_id=$1)
  `;

  try {
    const { rows } = await pool.query(query, [developerId]);
    return rows;
  } catch (err) {
    console.error("Error getting games by developer ID: ", err);
    throw err;
  }
}

module.exports = { getDeveloperByGameId, getGamesByDeveloperId };
