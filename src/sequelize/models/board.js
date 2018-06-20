'use strict';

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    ListIds: DataTypes.ARRAY(DataTypes.INTEGER),
  });

  return Board;
};