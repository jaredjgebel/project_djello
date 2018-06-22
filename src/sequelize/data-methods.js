const path = require('path');
const Sequelize = require('sequelize');
const models = require('./models');
const User = models.User;
const Board = models.Board;
const Card = models.Card;
const History = models.History;
const List = models.List;
const Op = Sequelize.Op;

// METHODS FOR GET ROUTES
const getUser = async (userId) => {
   try {
      const user = await User.findById(userId);
      return user;
   } catch (err) {
      throw new Error(err);
   }
}

// retrieves all boards for user
const getUserBoards = async (userId) => {
   try {
      const userBoards = [];
      const user = await User.findById(userId);

      for (let board of user.dataValues.BoardIds) {
         const boardInfo = await Board.findById(board);
         userBoards.push(board.dataValues);
      }

      return userBoards;

   } catch (err) {
      throw new Error(err);
   }
}

const getLists = async (boardId) => {
   try {
      const lists = [];
      const board = await Board.findById(boardId);

      for (let id of board.ListIds) {
         const list = await List.findById(id);
         lists.push(list.dataValues);
      }

      return lists;
   } catch (err) {
      throw new Error(err);
   }
}

const getCards = async (listId) => {
   try {
      const cards = [];
      const list = await List.findById(listId);

      for (let id of list.CardIds) {
         const card = await Card.findById(id);
         cards.push(card.dataValues);
      }

      return cards;
   } catch (err) {
      console.log(err);
   }
}

// return users assigned to a given card
const getCardAssignees = async (cardId) => {
   try {
      const assignees = [];
      const cardResponse = await UserCard.findAll({
         where: {
            CardIds: {
               [Op.contains]: [cardId],
            }
         }
      });

      for (card of cardResponse) {
         assignees.push(card.dataValues);
      }

      return Promise.resolve(assignees);

   } catch (err) {
      throw new Error(err);
   }
}

const getHistories = async (cardId) => {
   try {
      const histories = [];
      const card = await Card.findById(cardId);

      for (let id of card.HistoryIds) {
         const history = await History.findById(id);
         histories.push(history.dataValues);
      }

      return histories;
   } catch (err) {
      throw new Error(err);
   }
};

// =============================================
// METHODS FOR POST ROUTES
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

const addBoardToUser = async (userId, boardId) => {
   try {
      const user = await User.update({
         BoardIds: Sequelize.fn('array_append', Sequelize.col('BoardIds'), boardId),
      },
         {
            returning: true,
            where: {
               id: userId,
            },
         });

      return Promise.resolve(user);

   } catch (err) {
      console.error(err.errors);
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

const addListToBoard = async (boardId, listId) => {
   try {
      const boardResponse = await Board.update({
         ListIds: Sequelize.fn('array_append', Sequelize.col('ListIds'), listId)
      },
         {
            returning: true,
            where: {
               id: boardId,
            },
         });

      const board = boardResponse[1][0].dataValues;

      return Promise.resolve(board);
   } catch (err) {
      console.error(err);
      return Promise.reject('List could not be added to board.');
   }
};

const createCard = async (listId) => {
   const card = Card.create()
};

module.exports = {
   getUser,
   getUserBoards,
   getLists,
   getCards,
   getHistories,
   getCardAssignees,
   createBoard,
   addListToBoard,
}

// createBoard('To-Do', 'Description')
//    .then(board => {
//       console.log(board);
//    })
//    .catch(err => {
//       console.log(err);
//    });

// addListToBoard(22, 27)
//    .then(board => {
//       console.log(board);
//    })

// addBoardToUser(1, 1)
//    .then(user => {
//       console.log(user);
//    })

// createList(23, 'hi', 'there')
//    .then(board => {
//       console.log(board);
//    });