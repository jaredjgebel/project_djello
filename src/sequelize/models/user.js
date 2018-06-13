'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    photo: DataTypes.STRING,
  });

  User.associate = function (models) {
    User.belongsToMany(models.Board, { through: 'UserBoards' });
    User.belongsToMany(models.Card, { through: 'UserCards' });
  };

  return User;
};