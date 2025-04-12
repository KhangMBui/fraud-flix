module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      // Show's id
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      // Show's title
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // Show's description
      description: {
        type: DataTypes.TEXT,
      },

      // Show's releast date
      releaseDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      length: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      director: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
          max: 10
        }
      },

      // ID of genre table, referring to Action, Comedy, Drama, Horror, etc.
      genreId: {
        type: DataTypes.UUID,
        references: {
          model: "Genres", // table name
          key: "id",
        },
      },

      // Series, Movies, Documentary, Stand-up, etc.
      contentType: {
        type: DataTypes.ENUM("movie", "series", "documentary", "standup"),
        allowNull: false,
        defaultValue: "movie",
      },

      // URL to show's video
      videoUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Movies", // Enforce exact table name
      timestamps: true, // Add createdAt, updatedAt => Useful for tracking when a movie was added or last edited.
    }
  );
  return Movie;
};
