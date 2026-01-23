const pool = require("../database/pool");

async function getAllGames() {
  const query =
    "SELECT games.*, genres.name AS genre FROM games FULL JOIN genres ON games.genre_id=genres.id ORDER BY games.id ASC";

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
    "SELECT games.*, genres.name AS genre FROM games FULL JOIN genres ON games.genre_id=genres.id WHERE games.id = $1";
  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (err) {
    console.error(`Error getting game with id: ${id}`, err);
    throw err;
  }
}

async function getGamesByGenreId(genreId) {
  const query = `
  SELECT games.*, genres.name AS genre FROM games
  JOIN genres ON games.genre_id=genres.id
  WHERE genre_id = $1
  `;

  try {
    const { rows } = await pool.query(query, [genreId]);
    return rows;
  } catch (err) {
    console.error("Error getting games by genre ID: ", err);
    throw err;
  }
}

async function getGamesBySearchQuery(search) {
  const query = `
  SELECT id, name, release_date, cover_img_url FROM games WHERE name ILIKE $1
  `;

  try {
    const { rows } = await pool.query(query, [`%${search}%`]);
    return rows;
  } catch (err) {
    console.error("Error getting games by search query: ", err);
    throw err;
  }
}

async function deleteGameById(gameId) {
  const query = `
  DELETE FROM games WHERE id = $1 
  `;

  try {
    await pool.query(query, [gameId]);
  } catch (err) {
    console.error("Error deleting game by ID: ", err);
    throw err;
  }
}

async function updateGame(gameId, data) {
  const query = `
  UPDATE games SET 
    name = COALESCE($2, name),
    rating = COALESCE($3, rating),
    release_date = COALESCE($4, release_date),
    genre_id = COALESCE($5, genre_id),
    cover_img_url = COALESCE($6, cover_img_url)
  WHERE id = $1
  RETURNING *
  `;

  try {
    const result = await pool.query(query, [
      gameId,
      data.gameName,
      data.rating,
      data.release_date,
      data.genre,
      data.cover_img_url,
    ]);

    if (result.rowCount === 0) {
      throw new Error(`Game ID ${gameId} not found`);
    }
  } catch (err) {
    console.error(`Cannot update game, game ID ${gameId}`, err);
    throw err;
  }
}

async function addGame(data) {
  const query = `
  INSERT INTO games (name, rating, release_date, genre_id, cover_img_url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id
  `;

  try {
    const { rows } = await pool.query(query, [
      data.gameName,
      data.rating ?? null,
      data.release_date,
      data.genre ?? null,
      data.cover_img_url ||
        "https://i.ibb.co/TMSqdPPn/no-cover-show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65-Photoroom-1.png",
    ]);
    return rows[0].id;
  } catch (err) {
    console.error(`Error adding game ${data.name}:`, err);
    throw err;
  }
}

module.exports = {
  getAllGames,
  getFeaturedGames,
  getGameAwards,
  getGameById,
  getGamesByGenreId,
  getGamesBySearchQuery,
  deleteGameById,
  updateGame,
  addGame,
};
