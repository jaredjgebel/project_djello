'use strict';
const bcrypt = require('bcrypt');

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
    password: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return this.password;
      },
      set: function (value) {
        this.password = value;
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      set: function (value) {
        this.passwordHash = bcrypt.hashSync(value, 8);
      }
    },
    photo: DataTypes.STRING,
    BoardIds: DataTypes.ARRAY(DataTypes.INTEGER),
  });

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  return User;
};