'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    photo: DataTypes.STRING,
  });

  return User;
};