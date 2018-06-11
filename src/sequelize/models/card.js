'use strict';

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    assignees: DataTypes.ARRAY(DataTypes.INTEGER),
    complete: DataTypes.BOOLEAN,
    history: DataTypes.ARRAY(DataTypes.INTEGER)
  });

  Card.associate = function (models) {
    Card.belongsTo(models.List, { as: 'list' });
    // Card.hasMany(models.History, { as: 'CardHistory' });
  }

  return Card;
};