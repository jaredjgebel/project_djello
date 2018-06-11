'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    photo: DataTypes.STRING,
    boards: DataTypes.ARRAY(DataTypes.INTEGER)
  });
  User.associate = function (models) {
    User.hasMany(models.Board, { as: 'Boards', foreignKey: 'boardId' });
    // User.belongsToMany(models.Card, { as: 'UserCards', through: 'user_cards' });
  };

  return User;
};