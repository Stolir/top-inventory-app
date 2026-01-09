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

module.exports = { getAllDevelopers };
