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

/**
 * Updates a user's status to or from the administrator role.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.updateUserType = async (req, res) => {
  try {
    const { userID } = req.params;
    const { isAdmin } = req.body;
    // prevents a user with a standard role from promoting themselves to admin
    if (userID === req.user.id) {
      return res.status(403).json({ error: "Action Requires Admin Priveleges!" });
    }
    // find a user via id
    const user = await User.findByPk(userID);
    // throw an error if the user id does not exist
    if (!user) {
      return res.status(404).json({ error: "Could Not Find Requested User!" });
    }
    // based on the status of the user the function is being called on, change their status to either admin or standard
    user.isAdmin = !!isAdmin;
    await user.save();
    res.status(200).json({
      message: `User ${isAdmin ? 'rank updated to Administrator role' : 'rank updated to standard role'}`,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * Deletes a user's account by id.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;
    // find a user via id
    const user = await User.findByPk(userID);
    if (!user) {
      return res.status(404).json({ error: "Could Not Find Requested User!" });
    }
    await user.destroy();
    res.status(200).json({ message: "User Deleted!" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};