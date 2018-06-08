'use strict';
const Board = require('./board');
const Card = require('./card');

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    cards: DataTypes.ARRAY(Sequelize.INTEGER)
  });

  List.belongsTo(Board);
  List.hasMany(Card, { as: 'ListCards' });
  return List;
};