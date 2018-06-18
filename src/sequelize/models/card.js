'use strict';

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    HistoryIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        notIn: [[sequelize.col('HistoryIds')]]
      },
    },
  });

  return Card;
};