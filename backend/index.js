const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const sequelize = require("./config/database");
const db = require("./models"); // this grabs the whole models/index.js
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Fraudflix backend is here to save the day 🚀!");
});

// Sync DB and start server
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Fraudflix server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error syncing database: ", err);
  });

// You can now access models like:
const { User, Movie, Genre, WatchHistory } = db;
