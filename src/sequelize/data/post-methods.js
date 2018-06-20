const models = require('../models');
const Board = models.Board;
const Card = models.Card;
const History = models.History;
const List = models.List;
const {
   addBoardToUser,
   addListToBoard,
   addCardToList,
   addAssigneeToCard,
   addHistoryToCard,
} = require('./utility-methods');

const createBoard = async (userId, title = '', description = '') => {
   try {
      const board = await Board.create({
         title,
         description,
      });

      const user = await addBoardToUser(userId, board.dataValues.id)

      return Promise.resolve([board.dataValues, user]);

   } catch (err) {
      console.error(err);
      return Promise.reject(err);
   }
};


const createList = async (boardId, title = '', description = '') => {
   try {
      const list = await List.create({
         title,
         description
      });

      const board = await addListToBoard(boardId, list.dataValues.id);

      return Promise.resolve([list.dataValues, board]);

   } catch (err) {
      console.error(err);
      return Promise.reject(err);
      throw new Error(err);
   }
};

const createCard = async (
   listId,
   title = '',
   description = '',
   complete = false,
   AssigneeIds = [],
   HistoryIds = []
) => {
   try {
      const card = await Card.create({
         title,
         description,
         complete,
         AssigneeIds,
         HistoryIds,
      });

      const list = await addCardToList(listId, card.dataValues.id);

      return Promise.resolve([card.dataValues, list]);

   } catch (err) {
      console.error(err);
      return Promise.reject(err);
   }
};

const createHistory = async (cardId, text = '') => {
   try {
      const history = await History.create({
         text,
      });

      const card = await addHistoryToCard(cardId, history.dataValues.id);

      return Promise.resolve([history.dataValues, card]);

   } catch (err) {
      console.error(err);
      return Promise.reject(err);
   }
};

module.exports = {
   createBoard,
   createList,
   createCard,
   createHistory,
}

// createBoard(30, 'Functions To Write', '')
//    .then((array) => {
//       console.log(array);
//    })
//    .catch((err) => {
//       console.error(err);
//    })

// createList(30, 'Functions To Write', '')
//    .then((array) => {
//       console.log(array);
//    })
//    .catch((err) => {
//       console.error(err);
//    })

// createCard(30, 'Functions To Write', 'sdf', false)
//    .then((array) => {
//       console.log(array);
//    })
//    .catch((err) => {
//       console.error(err);
//    })

// createHistory(30, 'Functions To Write')
//    .then((array) => {
//       console.log(array);
//    })
//    .catch((err) => {
//       console.error(err);
//    })