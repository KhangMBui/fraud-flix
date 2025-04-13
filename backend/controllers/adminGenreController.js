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

/**
 * Retrieves a specified genre type by ID.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.getGenredByID = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id, {
      include: [{ model: Movie }]
    });
    if (!genre) {
      return res.status(404).json({ error: "Could Not Retrieve Requested Genre!" });
    }
    res.status(200).json(genre);
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
};

/**
 * Applies an update to a specified genre (should only be able to update description).
 * @param {*} req http request.
 * @param {*} res http response.
 * @returns 
 */
exports.updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { desc } = req.body;
    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: "Could Not Retrieve Requested Genre!" });
    }
    // update genre description field.
    if (desc !== undefined) {
      genre.desc = desc;
    }
    await genre.save();
    res.status(200).json({
      message: "Genre Updated!",
      genre
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};