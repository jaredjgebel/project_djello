'use strict';
const Board = require('./board');
const Card = require('./list');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    photo: DataTypes.STRING,
    boards: DataTypes.ARRAY(Sequelize.INTEGER)
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          User.hasMany(Board, { as: 'Boards', foreignKey: 'boardId' });
          User.belongsToMany(Card, { as: 'UserCards', through: 'user_cards' });
        }
      }
    });


  return User;
};