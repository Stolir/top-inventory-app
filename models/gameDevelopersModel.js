const pool = require("../database/pool");
const { normalizeIntArray } = require("../public/js/helper");

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

async function updateGameDevelopers(gameId, developers) {
  const normalizedDevs = normalizeIntArray(developers);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`DELETE FROM game_developers WHERE game_id = $1`, [
      gameId,
    ]);

    const insertQuery = `
      INSERT INTO game_developers (game_id, developer_id)
      SELECT $1, unnest($2::int[])
    `;

    await client.query(insertQuery, [gameId, normalizedDevs]);

    await client.query(`COMMIT`);
  } catch (err) {
    await client.query(`ROLLBACK`);
    console.error(`Error updating game developers for gameId ${gameId}: `, err);
    throw err;
  } finally {
    client.release();
  }
}

async function addGameDevelopers(gameId, developers) {
  if (!developers || !developers.length) {
    return;
  }

  const normalizedDevs = normalizeIntArray(developers);
  const query = `
  INSERT INTO game_developers (game_id, developer_id)
  SELECT $1, unnest($2::int[])
  `;

  try {
    await pool.query(query, [gameId, normalizedDevs]);
  } catch (err) {
    console.error(`Error adding developers to game, game ID ${gameId}: `, err);
    throw err;
  }
}

module.exports = {
  getDeveloperByGameId,
  getGamesByDeveloperId,
  addGameDevelopers,
  updateGameDevelopers,
  addGameDevelopers,
};
