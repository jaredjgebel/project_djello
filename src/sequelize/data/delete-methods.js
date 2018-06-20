const models = require('../models');
const Board = models.Board;
const List = models.List;
const Card = models.Card;

const deleteBoard = async (boardId) => {
   try {
      await Board.destroy({
         where: {
            id: boardId,
         },
         limit: 1,
      });

      return Promise.resolve('Board successfully deleted.');
   } catch (err) {
      console.error(err);
      return Promise.reject('Board could not be deleted.');
   }
};

const deleteList = async (listId) => {
   try {
      await List.destroy({
         where: {
            id: listId,
         },
         limit: 1,
      });

      return Promise.resolve('List successfully deleted.');
   } catch (err) {
      console.error(err);
      return Promise.reject('List could not be deleted.');
   }
};

const deleteCard = async (cardId) => {
   try {
      await Card.destroy({
         where: {
            id: cardId,
         },
         limit: 1,
      });

      return Promise.resolve('Card successfully deleted.');
   } catch (err) {
      console.error(err);
      return Promise.reject('Card could not be deleted.');
   }
};

module.exports = {
   deleteBoard,
   deleteList,
   deleteCard,
}

// deleteBoard(22)
//    .then(success => {
//       console.log(success);
//    })
//    .catch(err => {
//       console.error(err);
//    });

// deleteList(34)
//    .then(success => {
//       console.log(success);
//    })
//    .catch(err => {
//       console.error(err);
//    });

// deleteCard(31)
//    .then(success => {
//       console.log(success);
//    })
//    .catch(err => {
//       console.error(err);
//    });