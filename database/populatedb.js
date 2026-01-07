// seed.js
const { Client } = require("pg");
const dbConfig = require("../config/dbconfig");

const client = new Client(dbConfig);

async function run() {
  try {
    await client.connect();
    await client.query("BEGIN");

    /* ---------------------- */
    /* CREATE TABLES IF NOT EXISTS */
    /* ---------------------- */
    await client.query(`
      CREATE TABLE IF NOT EXISTS genres (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS developers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        rating NUMERIC(2,1),
        release_date DATE NOT NULL,
        genre_id INTEGER REFERENCES genres(id),
        cover_img_url TEXT
      );

      CREATE TABLE IF NOT EXISTS game_developers (
        game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
        developer_id INTEGER NOT NULL REFERENCES developers(id) ON DELETE CASCADE,
        PRIMARY KEY (game_id, developer_id)
      );

      CREATE TABLE IF NOT EXISTS game_tags (
        game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
        tag_id  INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (game_id, tag_id)
      );
    `);

    /* ---------------------- */
    /* INSERT DATA */
    /* ---------------------- */
    // Genres
    const genres = ["Action RPG", "Platformer", "Indie RPG", "Adventure"];
    for (const genre of genres) {
      await client.query(
        `INSERT INTO genres(name) VALUES($1) ON CONFLICT (name) DO NOTHING`,
        [genre]
      );
    }

    // Developers
    const developers = [
      "FromSoftware",
      "Team Cherry",
      "Exordium Games",
      "OMOCAT",
      "Naughty Dog",
    ];
    for (const dev of developers) {
      await client.query(
        `INSERT INTO developers(name) VALUES($1) ON CONFLICT (name) DO NOTHING`,
        [dev]
      );
    }

    // Tags
    const tags = [
      "Open World",
      "Fantasy",
      "Metroidvania",
      "Emotional",
      "Survival",
    ];
    for (const tag of tags) {
      await client.query(
        `INSERT INTO tags(name) VALUES($1) ON CONFLICT (name) DO NOTHING`,
        [tag]
      );
    }

    // Games
    const games = [
      {
        name: "Elden Ring",
        rating: 9.5,
        release_date: "2022-02-25",
        genre: "Action RPG",
        cover_img_url: "",
      },
      {
        name: "Hollow Knight: Silksong",
        rating: null,
        release_date: "2025-02-21",
        genre: "Platformer",
        cover_img_url: "",
      },
      {
        name: "Expedition 33",
        rating: 8.0,
        release_date: "2024-11-12",
        genre: "Indie RPG",
        cover_img_url: "",
      },
      {
        name: "OMORI",
        rating: 8.7,
        release_date: "2020-12-25",
        genre: "Indie RPG",
        cover_img_url: "",
      },
      {
        name: "The Last of Us",
        rating: 9.8,
        release_date: "2013-06-14",
        genre: "Adventure",
        cover_img_url: "",
      },
    ];

    for (const g of games) {
      const { rows } = await client.query(
        `SELECT id FROM genres WHERE name = $1`,
        [g.genre]
      );
      const genre_id = rows[0]?.id || null;
      await client.query(
        `INSERT INTO games(name, rating, release_date, genre_id, cover_img_url)
         VALUES($1,$2,$3,$4,$5)
         ON CONFLICT (name) DO NOTHING`,
        [g.name, g.rating, g.release_date, genre_id, g.cover_img_url]
      );
    }

    // Game-Developer relations
    const gameDevPairs = [
      ["Elden Ring", "FromSoftware"],
      ["Hollow Knight: Silksong", "Team Cherry"],
      ["Expedition 33", "Exordium Games"],
      ["OMORI", "OMOCAT"],
      ["The Last of Us", "Naughty Dog"],
    ];
    for (const [gameName, devName] of gameDevPairs) {
      await client.query(
        `INSERT INTO game_developers(game_id, developer_id)
         SELECT g.id, d.id FROM games g, developers d
         WHERE g.name = $1 AND d.name = $2
         ON CONFLICT DO NOTHING`,
        [gameName, devName]
      );
    }

    // Game-Tag relations
    const gameTagPairs = [
      ["Elden Ring", "Open World"],
      ["Elden Ring", "Fantasy"],
      ["Hollow Knight: Silksong", "Metroidvania"],
      ["OMORI", "Emotional"],
      ["The Last of Us", "Survival"],
    ];
    for (const [gameName, tagName] of gameTagPairs) {
      await client.query(
        `INSERT INTO game_tags(game_id, tag_id)
         SELECT g.id, t.id FROM games g, tags t
         WHERE g.name = $1 AND t.name = $2
         ON CONFLICT DO NOTHING`,
        [gameName, tagName]
      );
    }

    await client.query("COMMIT");
    console.log("✅ Seeding completed!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seeding failed:", err);
  } finally {
    await client.end();
  }
}

run();
