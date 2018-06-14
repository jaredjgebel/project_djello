'use strict';

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    HistoryIds: DataTypes.ARRAY(DataTypes.INTEGER),
  });

  return Card;
};