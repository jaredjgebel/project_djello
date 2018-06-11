'use strict';

module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    text: DataTypes.STRING
  });

  History.associate = function (models) {
    History.belongsTo(models.Card);
  };

  return History;
};