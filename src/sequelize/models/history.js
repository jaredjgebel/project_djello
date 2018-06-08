'use strict';
const Card = require('./card');

module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    text: DataTypes.STRING
  });

  History.belongsTo(Card);

  return History;
};