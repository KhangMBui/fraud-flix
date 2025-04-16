const { Genre, Movie } = require("../models");

/**
 * Retrieves all genres.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.getGenres = async (req, res) => {
  try {
    // retrieve all genres by alphabetical order
    const genres = await Genre.findAll({
      sortBy: [["name", "ASC"]],
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
exports.getGenreByID = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id, {
      include: [{ model: Movie }],
    });
    if (!genre) {
      return res
        .status(404)
        .json({ error: "Could Not Retrieve Requested Genre!" });
    }
    res.status(200).json(genre);
  } catch (e) {
    res.status(500).json({ error: e.message });
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
    const { name, description, tmdbId } = req.body;
    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res
        .status(404)
        .json({ error: "Could Not Retrieve Requested Genre!" });
    }
    if (description !== undefined) {
      genre.description = description;
    }

    if (name !== undefined) {
      genre.name = name;
    }

    if (tmdbId != undefined) {
      genre.tmdbId = tmdbId;
    }

    await genre.save();
    res.status(200).json({
      message: "Genre Updated!",
      genre,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * Adds a new genre.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.addGenre = async (req, res) => {
  try {
    const { name, description, tmdbId } = req.body;

    // Validate name
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Genre name is required." });
    }

    // Validate description length or content
    if (description && description.length > 255) {
      return res.status(400).json({ error: "Description is too long." });
    }

    // Check for duplicate genre name
    const existingGenre = await Genre.findOne({
      where: { name: name.trim() },
    });

    if (existingGenre) {
      return res.status(409).json({ error: "Genre already exists." });
    }

    // Create new genre with name and description
    const newGenre = await Genre.create({
      name: name.trim(),
      description: description?.trim() || "",
      tmdbId: tmdbId || null,
    });

    res.status(201).json({
      message: "Genre successfully created.",
      genre: newGenre,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * Deletes a genre by ID.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the genre
    const genre = await Genre.findByPk(id, {
      include: [{ model: Movie }],
    });

    if (!genre) {
      return res.status(404).json({ error: "Genre not found." });
    }

    // Prevent deletion if genre is associated with movies
    if (genre.Movies && genre.Movies.length > 0) {
      return res.status(400).json({
        error: "Cannot delete genre that is associated with movies.",
      });
    }

    await genre.destroy();
    res.status(200).json({ message: "Genre successfully deleted." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
