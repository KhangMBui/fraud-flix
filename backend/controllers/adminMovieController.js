const { Movie, Genre } = require("../models");
const { Op } = require("sequelize");

/**
 * Retrieves all movies/shows.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.getMovies = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10000,
      title,
      genreID,
      sortBy = 'releaseDate',
      sortDesc = 'DESC'
    } = req.query;
    // formatting options
    const format = (page - 1) * limit;
    const filterBy = {};
    // filter by movie title
    if (title) {
      filterBy.title = { [Op.iLike]: `%${title}%` };
    }
    // filter by movie genre
    if (genreID) {
      filterBy.genreID = genreID; 
    }
    const { count, rows: movies } = await Movie.findAndCountAll({
      where: filterBy,
      include: [{ model: Genre }],
      sorting: [[sortBy, sortDesc]],
      limit: parseInt(limit),
      format: parseInt(format)
    });
    res.status(200).json({
      count: count,
      pages: Math.ceil(count / limit),
      page: parseInt(page),
      movies
    });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

/**
 * Finds and retrieves media content by ID.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.getMovieByID = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id, {
      include: [{ model: Genre }]
    });
    if (!movie) {
      return res.status(404).json({ error: "Could Not Find Requested Content!" });
    }
    res.status(200).json(movie);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * Applies updated changes to selected content.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      thumbnail,
      releaseDate,
      length,
      director,
      rating,
      genreID,
      type,
      url
    } = req.body;
    // retrieve movie by id
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: "Could Not Find Requested Content!" });
    }

    // field updates for selected content
    if (title !== undefined) movie.title = title;
    if (description !== undefined) movie.description = description;
    if (thumbnail !== undefined) movie.thumbnail = thumbnail;
    if (releaseDate !== undefined) movie.releaseDate = releaseDate;
    if (length !== undefined) movie.length = length;
    if (director !== undefined) movie.director = director;
    if (rating !== undefined) movie.rating = rating;
    if (genreID !== undefined) movie.genreID = genreID;
    if (type !== undefined) movie.type = type;
    if (url !== undefined) movie.url = url;

    await movie.save();
    // get the now updated movie/show
    const updateMovie = await Movie.findByPk(id, {
      include: [{ model: Genre }]
    });
    res.status(200).json({
      message: "Content Updated!",
      movie: updateMovie
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnail,
      releaseDate,
    } = req.body;

    // Validate title
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Movie name is required." });
    }

    // Validate description length or content
    if (description && description.length > 255) {
      return res.status(400).json({ error: "Description is too long." });
    }

    // Check for duplicate movie name
    const existingMovie = await Movie.findOne({
      where: { title: title.trim() },
    });

    if (existingMovie) {
      return res.status(409).json({ error: "Movie already exists." });
    }

    // Create new movie with name and description
    const newMovie = await Movie.create({
      title: title.trim(),
      description: description?.trim() || "",
      releaseDate: releaseDate || null,
    });

    res.status(201).json({
      message: "Movie successfully created.",
      movie: newMovie,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * Deletes selected content.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: "Could Not Find Requested Content!" });
    }
    await movie.destroy();
    res.status(200).json({ message: "Content Deleted!" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};