'use strict';

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    CardIds: DataTypes.ARRAY(DataTypes.INTEGER),
  });

  return List;
};