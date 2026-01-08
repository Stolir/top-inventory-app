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

module.exports = { getDeveloperByGameId };
