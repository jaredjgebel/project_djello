const Sequelize = require('sequelize');
const models = require('./models');
const User = models.User;
const Board = models.Board;
const Card = models.Card;
const History = models.History;
const List = models.List;
const Op = Sequelize.Op;
const {
   addBoardToUser,
   addListToBoard
} = require('./utility-methods');

const createBoard = async (userId, title = '', description = '') => {
   try {
      const board = await Board.create({
         title,
         description
      });

      // add board to user
      const user = await User.update({
         BoardIds: Sequelize.fn('array_append', Sequelize.col('BoardIds'), board.id),
      },
         {
            returning: true,
            where: {
               id: userId,
            },
         });

      return Promise.resolve(board);

   } catch (err) {
      console.error(err);
      return Promise.reject(err);
   }
};


const createList = async (boardId, title, description) => {
   try {
      const list = await List.create({
         title,
         description
      });

      const board = await addListToBoard(boardId, list.id);

      return list, board;

   } catch (err) {
      console.error(err);
      throw new Error(err);
   }
};

const createCard = async (listId) => {
   const card = Card.create()
};

module.exports = {
   createBoard,
   createList,
   createCard,
}