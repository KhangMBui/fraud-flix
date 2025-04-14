import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import db from "../models/index.js";
// Load env vars
dotenv.config();

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sequelize modeL:

const Genre = db.Genre;

async function importGenres() {
  try {
    const filePath = path.join(__dirname, "../services/genre.json");
    const file = await readFile(filePath, "utf-8");
    const genreMap = JSON.parse(file);

    console.log("Importing genres");
    // Loop through and insert each genre
    for (const [id, name] of Object.entries(genreMap)) {
      // Create or update genre with tmdbId
      await Genre.create({
        name: name,
        tmdbId: id, // tmdbId is the key in genre map
      });

      console.log(`✅ Imported genre: ${name}`);
    }
    console.log("🎉 All genres imported!");
  } catch (err) {
    console.error("Failed to import genres: ", err);
  }
}

export default importGenres;
