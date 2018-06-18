'use strict';

module.exports = (sequelize, DataTypes) => {
   const UserBoard = sequelize.define('UserBoard', {
      createdAt: sequelize.fn('NOW'),
      updatedAt: sequelize.fn('NOW'),
      UserIds: {
         type: DataTypes.ARRAY(DataTypes.INTEGER),
         validate: {
            notIn: [[sequelize.col('UserIds')]]
         },
      },
      BoardIds: {
         type: DataTypes.ARRAY(DataTypes.INTEGER),
         validate: {
            notIn: [[sequelize.col('BoardIds')]]
         },
      },
   });

   return UserBoard;
};