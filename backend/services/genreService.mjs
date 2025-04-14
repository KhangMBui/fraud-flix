import fetch from "node-fetch";
import { writeFile } from "fs/promises";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const API_URL = "https://api.themoviedb.org/3/genre/movie/list?language=en";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchGenres() {
  try {
    const response = await axios.get(API_URL, options);
    const genreMap = {};
    response.data.genres.forEach((genre) => {
      genreMap[genre.id] = genre.name;
    });

    // Write to genre.json
    await writeFile("genre.json", JSON.stringify(genreMap, null, 2));
    console.log("genreMap written to genre.json");

    return genreMap;
  } catch (err) {
    console.error(`Failed to fetch genres: `, err.message);
    return {};
  }
}

fetchGenres();

// async function displayGenres() {
//   const genreMap = await fetchGenres(); // Now we're waiting for the result
//   console.log(genreMap); // This should now log the actual genreMap
// }

// displayGenres();
