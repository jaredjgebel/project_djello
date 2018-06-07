'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    assignees: DataTypes.ARRAY,
    complete: DataTypes.BOOLEAN,
    history: DataTypes.ARRAY(Sequelize.INTEGER)
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return card;
};