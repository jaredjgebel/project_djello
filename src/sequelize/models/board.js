'use strict';
const List = require('./list');

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    lists: DataTypes.ARRAY(Sequelize.INTEGER)
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });


  return Board;
};