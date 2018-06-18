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
    BoardIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        notIn: [[sequelize.col('BoardIds')]]
      },
    },
    CardIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        notIn: [[sequelize.col('CardIds')]]
      },
    },
  });

  return User;
};