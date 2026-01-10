const pool = require("../database/pool");

async function getAllTags() {
  const query = `
  SELECT * FROM tags ORDER BY name;
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error getting all genres: ", err);
    throw err;
  }
}

module.exports = { getAllTags };
