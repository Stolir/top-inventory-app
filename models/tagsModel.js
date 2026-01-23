const pool = require("../database/pool");

async function getAllTags() {
  const query = `
  SELECT * FROM tags ORDER BY name;
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error getting all tags: ", err);
    throw err;
  }
}

async function getTagById(tagId) {
  const query = `
  SELECT name FROM tags WHERE id = $1;
  `;

  try {
    const { rows } = await pool.query(query, [tagId]);
    return rows[0].name;
  } catch (err) {
    console.error("Error getting tag by ID: ", err);
    throw err;
  }
}

async function getTagsBySearchQuery(search) {
  const query = `
  SELECT id, name FROM tags WHERE name ILIKE $1
  `;

  try {
    const { rows } = await pool.query(query, [`%${search}%`]);
    return rows;
  } catch (err) {
    console.error("Error getting tags by search query: ", err);
    throw err;
  }
}

async function deleteTagById(tagId) {
  const query = `
  DELETE FROM tags WHERE id = $1
  `;

  try {
    await pool.query(query, [tagId]);
  } catch (err) {
    console.error("Error deleting tag: ", err);
    throw err;
  }
}

async function addTag(tag) {
  const query = `
  INSERT INTO tags (name) VALUES ($1)
  `;

  try {
    await pool.query(query, [tag.name]);
  } catch (err) {
    console.error("Error adding tag: ", err);
    throw err;
  }
}

module.exports = {
  getAllTags,
  getTagById,
  getTagsBySearchQuery,
  deleteTagById,
  addTag,
};
