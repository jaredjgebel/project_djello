'use strict';

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  });

  List.associate = function (models) {
    List.hasMany(models.Card);
  };

  return List;
};