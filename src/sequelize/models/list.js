'use strict';

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    CardIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        notIn: [[sequelize.col('CardIds')]]
      },
    },
  });

  return List;
};