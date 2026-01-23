const pool = require("../database/pool");

async function getAllDevelopers() {
  const query = `
  SELECT * FROM developers ORDER BY name; 
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error getting all genres: ", err);
    throw err;
  }
}

async function getDeveloperById(developerId) {
  const query = `
  SELECT name FROM developers WHERE id = $1
  `;

  try {
    const { rows } = await pool.query(query, [developerId]);
    return rows[0].name;
  } catch (err) {
    console.error("Error getting developer by ID: ", err);
    throw err;
  }
}

async function getDevelopersBySearchQuery(search) {
  const query = `
  SELECT id, name FROM developers WHERE name ILIKE $1
  `;

  try {
    const { rows } = await pool.query(query, [`%${search}%`]);
    return rows;
  } catch (err) {
    console.error("Error getting developers by search query: ", err);
    throw err;
  }
}

async function deleteDeveloperById(developerId) {
  const query = `
  DELETE FROM developers WHERE id = $1
  `;

  try {
    await pool.query(query, [developerId]);
  } catch (err) {
    console.error("Error deleting developer: ", err);
    throw err;
  }
}

module.exports = {
  getAllDevelopers,
  getDeveloperById,
  getDevelopersBySearchQuery,
  deleteDeveloperById,
};
