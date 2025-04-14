const { Movie } = require("./../models");
const { Genre } = require("./../models");
const { Op } = require("sequelize");

exports.search = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const movies = await Movie.findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%`, // case-insensitive partial match
        },
      },
      limit: 20, // Limit to 20 results (change if needed)
    });
    res.json(movies);
  } catch (err) {
    console.error("Search error: ", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllMovies = async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const movies = await Movie.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    console.log("Movies fetched from database:", movies); // Log the movies
    res.json(movies);
  } catch (err) {
    console.error("Error fetching movies with genres: ", err);
    res.status(500).json({ message: "Server error" });
  }
};