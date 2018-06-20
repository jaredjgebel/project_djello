const models = require('../models');
const Board = models.Board;
const List = models.List;
const Card = models.Card;

const editBoard = async (boardId, title = '', description = '') => {
   try {
      const boardResponse = await Board.update({
         title,
         description,
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
      return Promise.reject('Board could not be edited.');
   }
};

const editList = async (listId, title = '', description = '') => {
   try {
      const listResponse = await List.update({
         title,
         description,
      },
         {
            returning: true,
            where: {
               id: listId,
            },
         });

      const list = listResponse[1][0].dataValues;

      return Promise.resolve(list);

   } catch (err) {
      console.error(err);
      return Promise.reject('List could not be edited.');
   }
};

const editCard = async (cardId, title = '', description = '', complete = false) => {
   try {
      const cardResponse = await Card.update({
         title,
         description,
         complete,
      },
         {
            returning: true,
            where: {
               id: cardId,
            },
         });

      const card = cardResponse[1][0].dataValues;

      return Promise.resolve(card);

   } catch (err) {
      console.error(err);
      return Promise.reject('Card could not be edited.');
   }
};

module.exports = {
   editBoard,
   editList,
   editCard,
}

// editBoard(31, 'Functions To Write', 'many functions')
//    .then(board => {
//       console.log(board);
//    })
//    .catch(err => {
//       console.error(err);
//    });

// editList(31, 'hakuna', 'matata')
//    .then(list => {
//       console.log(list);
//    })
//    .catch(err => {
//       console.error(err);
//    });

// editCard(31, 'hakuna', 'matata', false)
//    .then(card => {
//       console.log(card);
//    })
//    .catch(err => {
//       console.error(err);
//    });

