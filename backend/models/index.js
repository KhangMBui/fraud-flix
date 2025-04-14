const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const User = require("./User")(sequelize, DataTypes);
const Movie = require("./Movie")(sequelize, DataTypes);
const Genre = require("./Genre")(sequelize, DataTypes);
const WatchHistory = require("./WatchHistory")(sequelize, DataTypes);

// Define associations between entities
User.hasMany(WatchHistory, { foreignKey: "userId" });
WatchHistory.belongsTo(User, { foreignKey: "userId" });

Movie.hasMany(WatchHistory, { foreignKey: "movieId" });
WatchHistory.belongsTo(Movie, { foreignKey: "movieId" });

// Genre.hasMany(Movie, { foreignKey: "genreId" });
// Movie.belongsToMany(Genre, { foreignKey: "genreId" });

Movie.belongsToMany(Genre, {
  through: "MovieGenres",
  foreignKey: "movieId",
  otherKey: "genreId",
});

Genre.belongsToMany(Movie, {
  through: "MovieGenres",
  foreignKey: "genreId",
  otherKey: "movieId",
});

module.exports = { sequelize, User, Movie, Genre, WatchHistory };
