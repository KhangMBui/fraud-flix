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
const Movie = db.Movie;

async function importMovies() {
  try {
    const filePath = path.join(__dirname, "../services/movies.json");
    const file = await readFile(filePath, "utf-8");
    const movies = JSON.parse(file);

    console.log("Importing movies");
    for (const m of movies) {
      await Movie.create({
        title: m.title,
        description: m.overview,
        thumbnail: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        releaseDate: m.release_date ? new Date(m.release_date) : null,
        length: null,
        director: null,
      });
      console.log(`✅ Imported: ${m.title}`);
    }
    console.log("🎉 All movies imported!");
  } catch (err) {
    console.error("Failed to import movies: ", err);
  }
}

export default importMovies;
