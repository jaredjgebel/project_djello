'use strict';

module.exports = (sequelize, DataTypes) => {
   const UserBoard = sequelize.define('UserBoard', {
      createdAt: sequelize.fn('NOW'),
      updatedAt: sequelize.fn('NOW'),
      UserIds: DataTypes.ARRAY(DataTypes.INTEGER),
      BoardIds: DataTypes.ARRAY(DataTypes.INTEGER),
   });

   return UserBoard;
};