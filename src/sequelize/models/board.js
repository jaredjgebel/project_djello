'use strict';

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    ListIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        notIn: [[sequelize.col('ListIds')]]
      },
    },
  });

  return Board;
};