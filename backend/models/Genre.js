module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "Genre",
    {
      // Genre's id
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      // Genre's name
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      // Genre's description
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      tableName: "Genres", // Enforce exact table name
      timestamps: false,
    }
  );
  return Genre;
};
