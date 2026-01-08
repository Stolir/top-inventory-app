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
        rating NUMERIC(3,1),
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

      CREATE TABLE IF NOT EXISTS award_winners (
      game_id INT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
      award_name VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      PRIMARY KEY (game_id, award_name, year)
      );

      CREATE TABLE IF NOT EXISTS featured_games (
      game_id INT NOT NULL REFERENCES games(id)
      );
    `);

    /* ---------------------- */
    /* INSERT DATA */
    /* ---------------------- */
    // Genres
    const genres = ["RPG", "Platformer", "Adventure", "Arcade", "Shooter"];
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
      "Cygames",
      "Arc System Works",
      "Embark Studios",
      "Supergiant Games",
      "Battlefield Studios",
      "id Software",
      "Hello Games",
      "Larian Studios",
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
      "Party",
      "Historical",
      "Sports",
      "Action",
      "Science Fiction",
      "Hack and Slash",
      "Horror",
      "Rouge-Like",
      "War",
      "Sandbox",
      "Indie",
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
        genre: "RPG",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.png",
      },
      {
        name: "Hollow Knight: Silksong",
        rating: 9.0,
        release_date: "2025-02-21",
        genre: "Platformer",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/coaend.png",
      },
      {
        name: "Clair Obscur: Expedition 33",
        rating: 10,
        release_date: "2024-11-12",
        genre: "RPG",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co9gam.png",
      },
      {
        name: "OMORI",
        rating: 8.7,
        release_date: "2020-12-25",
        genre: "RPG",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xlp.png",
      },
      {
        name: "The Last of Us",
        rating: 9,
        release_date: "2013-06-14",
        genre: "Adventure",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.png",
      },
      {
        name: "Umamusume: Pretty Derby - Party Dash",
        rating: 7,
        release_date: "2024-08-30",
        genre: "Arcade",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co9504.png",
      },
      {
        name: "ARC Raiders",
        rating: 9,
        release_date: "2025-10-30",
        genre: "Shooter",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co9rk1.png",
      },
      {
        name: "Hades II",
        rating: 9.3,
        release_date: "2025-09-25",
        genre: "RPG",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/coaknx.png",
      },
      {
        name: "Battlefield 6",
        rating: 8,
        release_date: "2025-10-10",
        genre: "Shooter",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/coa5zt.png",
      },
      {
        name: "Doom: The Dark Ages",
        rating: 8.4,
        release_date: "2025-05-15",
        genre: "Shooter",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co9b3o.png",
      },
      {
        name: "No Man's Sky",
        rating: 7.9,
        release_date: "2016-08-09",
        genre: "RPG",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/coacrk.png",
      },
      {
        name: "Baldur's Gate III",
        rating: 9.6,
        release_date: "2023-08-03",
        genre: "RPG",
        cover_img_url:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.png",
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
      ["Clair Obscur: Expedition 33", "Exordium Games"],
      ["OMORI", "OMOCAT"],
      ["The Last of Us", "Naughty Dog"],
      ["Umamusume: Pretty Derby - Party Dash", "Cygames"],
      ["Umamusume: Pretty Derby - Party Dash", "Arc System Works"],
      ["ARC Raiders", "Embark Studios"],
      ["Hades II", "Supergiant Games"],
      ["Battlefield 6", "Battlefield Studios"],
      ["Doom: The Dark Ages", "id Software"],
      ["No Man's Sky", "Hello Games"],
      ["Baldur's Gate III", "Larian Studios"],
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
      ["Elden Ring", "Action"],
      ["Hollow Knight: Silksong", "Metroidvania"],
      ["OMORI", "Emotional"],
      ["OMORI", "Indie"],
      ["The Last of Us", "Survival"],
      ["The Last of Us", "Horror"],
      ["The Last of Us", "Action"],
      ["Expedition 33", "Action"],
      ["Expedition 33", "Fantasy"],
      ["Expedition 33", "Indie"],
      ["Umamusume: Pretty Derby - Party Dash", "Party"],
      ["ARC Raiders", "Action"],
      ["ARC Raiders", "Science Fiction"],
      ["Hades II", "Action"],
      ["Hades II", "Indie"],
      ["Hades II", "Hack and Slash"],
      ["Hades II", "Rouge-Like"],
      ["Battlefield 6", "Action"],
      ["Battlefield 6", "War"],
      ["Doom: The Dark Ages", "Action"],
      ["Doom: The Dark Ages", "Fantasy"],
      ["Doom: The Dark Ages", "Science Fiction"],
      ["No Man's Sky", "Open World"],
      ["No Man's Sky", "Sandbox"],
      ["No Man's Sky", "Science Fiction"],
      ["No Man's Sky", "Action"],
      ["No Man's Sky", "Indie"],
      ["Baldur's Gate III", "Action"],
      ["Baldur's Gate III", "Fantasy"],
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

    const gameAwards = [
      {
        name: "Clair Obscur: Expedition 33",
        award: "Game Of The Year",
        year: "2025",
      },
      {
        name: "Umamusume: Pretty Derby - Party Dash",
        award: "Best Mobile Game",
        year: "2025",
      },
      { name: "Battlefield 6", award: "Best Audio Design", year: "2025" },
      {
        name: "Doom: The Dark Ages",
        award: "Innovation in Accessibility",
        year: "2025",
      },
      {
        name: "No Man's Sky",
        award: "Best Ongoing",
        year: "2025",
      },
      {
        name: "Baldur's Gate III",
        award: "Best Community Support",
        year: "2025",
      },
    ];

    for (const g of gameAwards) {
      const { rows } = await client.query(
        `SELECT id FROM games WHERE name = $1`,
        [g.name]
      );
      const game_id = rows[0]?.id || null;
      await client.query(
        `INSERT INTO award_winners(game_id, award_name, year)
         VALUES($1, $2, $3) ON CONFLICT DO NOTHING
        `,
        [game_id, g.award, g.year]
      );
    }

    const featuredGames = [
      "Clair Obscur: Expedition 33",
      "Hollow Knight: Silksong",
      "Elden Ring",
      "OMORI",
      "The Last of Us",
      "Hades II",
      "ARC Raiders",
    ];

    for (const g of featuredGames) {
      const { rows } = await client.query(
        `SELECT id FROM games WHERE name = $1`,
        [g]
      );
      const game_id = rows[0]?.id || null;
      await client.query(
        `
        INSERT INTO featured_games(game_id)
        VALUES ($1)
        `,
        [game_id]
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
