const { Movie, Genre } = require("../models");
const { Op } = require("sequelize");

/**
 * Retrieves all movies.
 * @param {*} req http request.
 * @param {*} res http response.
 */
exports.getMovies = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
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