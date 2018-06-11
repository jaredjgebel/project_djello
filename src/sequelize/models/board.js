'use strict';
// const models = require('../models');
// console.log(models);

// const User = models.User;
// const List = models.List;

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    lists: DataTypes.ARRAY(DataTypes.INTEGER)
  });

  Board.associate = function (models) {
    Board.belongsToMany(models.User, { through: 'UserBoards' });
    // Board.hasMany(models.List, { through: 'BoardLists' });
  };

  return Board;
};