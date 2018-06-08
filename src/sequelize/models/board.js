'use strict';
const User = require('./user');
const List = require('./list');

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    lists: DataTypes.ARRAY(Sequelize.INTEGER)
  });

  Board.belongsToMany(User, { through: 'UserBoards' });
  Board.hasMany(List, { through: 'BoardLists' });

  return Board;
};