const pool = require("../database/pool");

async function getTagsByGameId(gameId) {
  const query = `
    SELECT gt.*, t.name FROM game_tags gt 
    JOIN tags t ON gt.tag_id=t.id 
    WHERE gt.game_id = $1`;

  try {
    const { rows } = await pool.query(query, [gameId]);
    return rows;
  } catch (err) {
    console.error("Error getting tags by game ID: ", err);
    throw err;
  }
}

module.exports = {
  getTagsByGameId,
};
