'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'First name cannot be empty.',
        },
      },
    },
    last: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name cannot be empty.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty.',
        },
        isEmail: {
          msg: 'Invalid email.'
        },
      },
    },
    passwordHash: DataTypes.STRING,
    photo: DataTypes.STRING,
    BoardIds: DataTypes.ARRAY(DataTypes.INTEGER),
  });

  return User;
};