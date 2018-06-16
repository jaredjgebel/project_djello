'use strict';

module.exports = (sequelize, DataTypes) => {
   const UserCard = sequelize.define('UserCard', {
      createdAt: sequelize.fn('NOW'),
      updatedAt: sequelize.fn('NOW'),
      UserIds: DataTypes.ARRAY(DataTypes.INTEGER),
      CardIds: DataTypes.ARRAY(DataTypes.INTEGER),
   });

   return UserCard;
};