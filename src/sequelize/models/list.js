'use strict';

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    cards: DataTypes.ARRAY(DataTypes.INTEGER)
  });
  List.associate = function (models) {
    List.belongsTo(models.Board);
    // List.hasMany(models.Card, { as: 'ListCards' });
  };
  return List;
};