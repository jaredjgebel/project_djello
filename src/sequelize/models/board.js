'use strict';

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  });

  Board.associate = function (models) {
    Board.belongsToMany(models.User, { through: 'UserBoards' });
    Board.hasMany(models.List);
  };

  return Board;
};