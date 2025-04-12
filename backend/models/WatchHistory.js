module.exports = (sequelize, DataTypes) => {
  const WatchHistory = sequelize.define(
    "WatchHistory",
    {
      // WatchHistory's id
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      // ID of user who watched the show
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users", // table name
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE", // ensures that if a user or movie is deleted, the corresponding watch history gets deleted too
      },

      // ID of the movie watched
      movieId: {
        type: DataTypes.UUID,
        references: {
          model: "Movies", // table name
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE", // ensures that if a user or movie is deleted, the corresponding watch history gets deleted too
      },

      // Time the show was watched
      watchedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      // amount of movie/episode user has watched
      lengthWatched: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      // marks a movie/episode as having been watched all the way through by the user
      isFinished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: "WatchHistory", // Enforce exact table name
      timestamps: false,
    }
  );
  return WatchHistory;
};
