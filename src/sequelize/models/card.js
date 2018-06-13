'use strict';

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
  });

  Card.associate = function (models) {
    Card.belongsTo(models.List);
    Card.belongsToMany(models.User, { through: 'UserCards' });
    Card.hasMany(models.History);
  }

  return Card;
};