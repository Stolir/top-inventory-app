const pool = require("../database/pool");

async function getAllGenres() {
  const query = `
  SELECT * FROM genres ORDER BY name; 
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error getting all genres: ", err);
    throw err;
  }
}

async function getGenreById(genreId) {
  const query = `
  SELECT * FROM genres WHERE id = $1
  `;

  try {
    const { rows } = await pool.query(query, [genreId]);
    return rows;
  } catch (err) {
    console.error("Error getting genre by ID: ", err);
    throw err;
  }
}

async function getGenresBySearchQuery(search) {
  const query = `
  SELECT id, name FROM genres WHERE name ILIKE $1
  `;

  try {
    const { rows } = await pool.query(query, [`%${search}%`]);
    return rows;
  } catch (err) {
    console.error("Error getting genres by search query: ", err);
    throw err;
  }
}

async function deleteGenreById(genreId) {
  const query = `
  DELETE FROM genres WHERE id = $1
  `;

  try {
    await pool.query(query, [genreId]);
  } catch (err) {
    console.error("Error deleting genre: ", err);
    throw err;
  }
}

module.exports = {
  getAllGenres,
  getGenreById,
  getGenresBySearchQuery,
  deleteGenreById,
};
