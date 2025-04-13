const { User, Movie, Genre, WatchHistory } = require("../models");
const { Sequelize } = require("sequelize");

/**
 * Retrieves user interaction statistics for the admin.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const allUsers = await User.count();
    const allMovies = await Movie.count();
    const allGenres = await Genre.count();
    const moviesWatched = await WatchHistory.count();
    res.status(200).json({
      allUsers,
      allMovies,
      allGenres,
      moviesWatched
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * Retrieves all user accounts.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'password', 'username', 'isAdmin']
    });
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};