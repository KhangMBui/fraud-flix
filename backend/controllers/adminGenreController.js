const { Genre, Movie } = require("../models");

/**
 * Retrieves all genres.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.getGrenres = async (req, res) => {
  try {
    // retrieve all genres by alphabetical order
    const genres = await Genre.findAll({
      sortBy: [['name', 'ASC']]
    });
    res.status(200).json(genres);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};