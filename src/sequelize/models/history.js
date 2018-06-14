'use strict';

module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    text: DataTypes.STRING
  });

  return History;
};