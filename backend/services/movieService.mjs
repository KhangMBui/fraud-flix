import fetch from "node-fetch";
import { writeFile } from "fs/promises";
import dotenv from "dotenv";
import { fetchGenres } from "./genreService.mjs";

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc";
const TOTAL_PAGES = 50; // Adjust as needed

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

async function fetchMovies() {
  let allMovies = [];

  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const res = await fetch(`${API_URL}&page=${page}`, options);
    const data = await res.json();

    if (data.results) {
      allMovies.push(...data.results);
      console.log(`Fetched page ${page} with ${data.results.length} movies`);
    } else {
      console.warn(`No results on page ${page}`);
    }
  }

  return allMovies;
}

async function enrichMoviesWithGenres(movies, genreMap) {
  return movies.map((movie) => ({
    ...movie,
    genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
  }));
}

async function saveMovies() {
  const movies = await fetchMovies();
  const genreMap = await fetchGenres(); // genreMap is already an object

  const enrichedMovies = await enrichMoviesWithGenres(movies, genreMap);

  await writeFile("movies.json", JSON.stringify(enrichedMovies, null, 2));
  console.log("Movies saved to movies2.json with genre names.");
}

saveMovies().catch((err) => console.error("Error saving movies:", err));
