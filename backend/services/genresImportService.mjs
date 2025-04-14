import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load env vars
dotenv.config();

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sequelize modeL:
import db from "../models/index.js";
const Genre = db.Genre;

async function importGenres() {
  try {
    const filePath = path.join(__dirname, "../services/genre.json");
    const file = await readFile(filePath, "utf-8");
    const genreMap = JSON.parse(file);

    console.log("Importing genres");
    // Loop through and insert each genre
    for (const [id, name] of Object.entries(genreMap)) {
      await Genre.findOrCreate({
        where: { tmdbId: id },
        defaults: {
          name,
        },
      });
    }
    console.log("🎉 All genres imported!");
  } catch (err) {
    console.error("Failed to import genres: ", err);
  } finally {
    await db.sequelize.close();
  }
}

importGenres();
