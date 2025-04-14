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
// const Movie = db.Movie;
const { Movie, Genre } = db; // Destructure the models

async function importMovies() {
  try {
    const filePath = path.join(__dirname, "../services/movies.json");
    const file = await readFile(filePath, "utf-8");
    const movies = JSON.parse(file);

    console.log("Importing movies");
    for (const m of movies) {
      const movie = await Movie.create({
        title: m.title,
        description: m.overview,
        thumbnail: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        releaseDate: m.release_date ? new Date(m.release_date) : null,
        length: null, // Placeholder as there's no data in movies.json
        director: null, // Placeholder as there's no data in movies.json
      });

      console.log(`Looking up genres for movie: ${m.title}`);
      console.log(`Movie genre_ids: ${m.genre_ids}`);

      // Find genres based on genre_ids (match by tmdbId, or whatever unique identifier you have)
      // Map TMDB genre_ids to Genre UUIDs
      const genres = await Genre.findAll({
        where: { tmdbId: m.genre_ids },
      });

      // Set genres in the join table
      await movie.setGenres(genres);

      console.log(`✅ Imported: ${m.title}`);
    }
    console.log("🎉 All movies imported!");
  } catch (err) {
    console.error("Failed to import movies: ", err);
  }
}

export default importMovies;
