const sequelize = require('sequelize');
const models = require('../sequelize/models')
const User = models.User;
const Board = models.Board;

sequelize.Transaction().then(transaction => {
   return User.create({
      first: 'ddd',
      last: 'aaa',
      email: 'ddd@aaa.com',
   }, {
         transaction
      })
      .then(user => {
         return Board.create({
            title: 'sdf',
            description: 'asdf',
         })
      })
      .then(board => {
         transaction.commit();
      })
      .catch(() => {
         transaction.rollback();
      });
})

