module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('admin', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Admin;
};
