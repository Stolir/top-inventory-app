// seed.js
const { Client } = require("pg");
const dbConfig = require("../config/dbconfig");
// Adjust these to your environment or use dotenv
const client = new Client(dbConfig);

async function seed() {
  try {
    await client.connect();
    await client.query("BEGIN");

    // ------------------------
    // Developers
    // ------------------------
    await client.query(`
      INSERT INTO developers (name) VALUES
      ('FromSoftware'),
      ('CD Projekt Red'),
      ('Nintendo')
      ON CONFLICT (name) DO NOTHING
    `);

    // ------------------------
    // Genres
    // ------------------------
    await client.query(`
      INSERT INTO genres (name) VALUES
      ('Action'),
      ('RPG'),
      ('Platformer')
      ON CONFLICT (name) DO NOTHING
    `);

    // ------------------------
    // Tags
    // ------------------------
    await client.query(`
      INSERT INTO tags (name) VALUES
      ('Singleplayer'),
      ('Open World'),
      ('Fantasy')
      ON CONFLICT (name) DO NOTHING
    `);

    // ------------------------
    // Games
    // ------------------------
    await client.query(`
      INSERT INTO games (name, rating, release_date) VALUES
      ('Elden Ring', 9.5, '2022-02-25'),
      ('The Witcher 3', 9.8, '2015-05-19'),
      ('Super Mario Odyssey', 9.7, '2017-10-27')
      ON CONFLICT (name) DO NOTHING
    `);

    // ------------------------
    // Link games to developers
    // ------------------------
    const gameDevelopers = [
      { game: "Elden Ring", developer: "FromSoftware" },
      { game: "The Witcher 3", developer: "CD Projekt Red" },
      { game: "Super Mario Odyssey", developer: "Nintendo" },
    ];

    for (const gd of gameDevelopers) {
      await client.query(
        `
        INSERT INTO game_developers (game_id, developer_id)
        SELECT g.id, d.id
        FROM games g, developers d
        WHERE g.name = $1 AND d.name = $2
        ON CONFLICT DO NOTHING
      `,
        [gd.game, gd.developer]
      );
    }

    // ------------------------
    // Link games to genres
    // ------------------------
    const gameGenres = [
      { game: "Elden Ring", genre: "Action" },
      { game: "The Witcher 3", genre: "RPG" },
      { game: "Super Mario Odyssey", genre: "Platformer" },
    ];

    for (const gg of gameGenres) {
      await client.query(
        `
        INSERT INTO game_genres (game_id, genre_id)
        SELECT g.id, ge.id
        FROM games g, genres ge
        WHERE g.name = $1 AND ge.name = $2
        ON CONFLICT DO NOTHING
      `,
        [gg.game, gg.genre]
      );
    }

    // ------------------------
    // Link games to tags
    // ------------------------
    const gameTags = [
      { game: "Elden Ring", tag: "Singleplayer" },
      { game: "The Witcher 3", tag: "Open World" },
      { game: "Super Mario Odyssey", tag: "Fantasy" },
    ];

    for (const gt of gameTags) {
      await client.query(
        `
        INSERT INTO game_tags (game_id, tag_id)
        SELECT g.id, t.id
        FROM games g, tags t
        WHERE g.name = $1 AND t.name = $2
        ON CONFLICT DO NOTHING
      `,
        [gt.game, gt.tag]
      );
    }

    await client.query("COMMIT");
    console.log("Seeding complete!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error seeding data:", err);
  } finally {
    await client.end();
  }
}

// Run the seeding
seed();
