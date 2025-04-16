module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    // assigned user id
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // user's provided email
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    // user's set password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // user's set username
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    // check if user has administrative privileges
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  return User;
};
