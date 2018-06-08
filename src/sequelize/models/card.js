'use strict';
const List = ('./list');
const History = ('./history');

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    assignees: DataTypes.ARRAY,
    complete: DataTypes.BOOLEAN,
    history: DataTypes.ARRAY(Sequelize.INTEGER)
  });

  Card.belongsTo(List);
  Card.hasMany(History, { as: 'CardHistory' });

  return Card;
};