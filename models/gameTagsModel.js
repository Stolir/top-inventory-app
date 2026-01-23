const pool = require("../database/pool");
const { normalizeIntArray } = require("../public/js/helper");

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

async function getGamesByTagId(tagId) {
  const query = `
  SELECT games.*, genres.name AS genre FROM games
  JOIN genres ON games.genre_id = genres.id
  WHERE games.id IN (SELECT game_id FROM game_tags WHERE tag_id = $1)
  `;

  try {
    const { rows } = await pool.query(query, [tagId]);
    return rows;
  } catch (err) {
    console.error("Error getting games by tag ID: ", err);
    throw err;
  }
}

async function updateGameTags(gameId, tags) {
  const normalizedTags = normalizeIntArray(tags);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`DELETE FROM game_tags WHERE game_id = $1`, [gameId]);

    const insertQuery = `
      INSERT INTO game_tags (game_id, tag_id)
      SELECT $1, unnest($2::int[])
    `;

    await client.query(insertQuery, [gameId, normalizedTags]);

    await client.query(`COMMIT`);
  } catch (err) {
    await client.query(`ROLLBACK`);
    console.error(`Error updating game tags for gameId ${gameId}: `, err);
    throw err;
  } finally {
    client.release();
  }
}

async function addGameTags(gameId, tags) {
  if (!tags || !tags.length) {
    return;
  }

  const normalizedTags = normalizeIntArray(tags);
  const query = `
  INSERT INTO game_tags (game_id, tag_id)
  SELECT $1, unnest($2::int[])
  `;

  try {
    await pool.query(query, [gameId, normalizedTags]);
  } catch (err) {
    console.error(`Error adding tags to game, game ID ${gameId}: `, err);
    throw err;
  }
}

module.exports = {
  getTagsByGameId,
  getGamesByTagId,
  updateGameTags,
  addGameTags,
};
