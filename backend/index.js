const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const sequelize = require("./config/database");
const db = require("./models"); // this grabs the whole models/index.js
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/users", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("Fraudflix backend is here to save the day 🚀!");
});

async function initializeData() {
  try {
    const genreCount = await db.Genre.count();
    const movieCount = await db.Movie.count();

    if (genreCount === 0) {
      console.log("Genres table is empty. Importing genres...");
      const { default: importGenres } = await import(
        "./services/genresImportService.mjs"
      );
      await importGenres();
    } else {
      console.log("Genres already exist. Skipping import.");
    }

    if (movieCount === 0) {
      console.log("Movies table is empty. Importing movies...");
      const { default: importMovies } = await import(
        "./services/moviesImportService.mjs"
      );
      await importMovies();
    } else {
      console.log("Movies already exist. Skipping import.");
    }
  } catch (err) {
    console.error("Failed to initialized data: ", err);
  }
}

// Sync DB and start server
db.sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("✅ Database synced");

    await initializeData();

    app.listen(PORT, () => {
      console.log(`🚀 Fraudflix server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error syncing database: ", err);
  });
